from flask import Flask, render_template, jsonify, request, session, redirect, url_for
import requests
app = Flask(__name__)

from pymongo import MongoClient
# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient('localhost', 27017)
db = client.dbsparta

import jwt, datetime, hashlib

SECRET_KEY = 'okay'

#멀티 페이지 url
@app.route('/')
def home():
    exhibition = list(db.exhibition.find({}, {'_id': False}))[0:40]
    close_exhi = list(db.exhibition.find_one({'period': '2021.11.01~\r\n\t\t\t\t\t\t\t2021.11.07'}, {'_id': False}))


    return render_template("index.html", exhibition=exhibition, close_exhi=close_exhi)

    ############## 로그인 여부 확인 ##############

    # token_receive = request.cookies.get('mytoken')
    # try:
    #     payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    #     user_info = db.user.find_one({"user_id": payload['id']})
    #     return render_template('index.html', user_id=user_info["user_id"])
    # except jwt.ExpiredSignatureError:
    #     return render_template("login.html", msg="다시 로그인 해주세요!")
    #     # return redirect(url_for("login", msg="다시 로그인"))
    # except jwt.exceptions.DecodeError:
    #     return render_template("login.html", msg="로그인 정보 없음!")
    #     # return redirect(url_for("login", msg="로그인 정보 없음"))


@app.route('/exhibition/<keyword>')
def detail(keyword):
    contents = list(db.exhibition.find({}, {'_id':False}))
    reviews = list(db.review.find({}, {'_id':False}).sort('review_grade', -1))
    return render_template("exhibition_view.html", contents=contents, word=keyword, reviews=reviews)

@app.route('/login')
def login():
    return render_template("login.html")

# -------수정 중-------리뷰쓰기 통해서 로그인 시 돌아가는 경로
@app.route('/login_to_review')
def login_to_review():
    contents = list(db.exhibition.find({}, {'_id': False}))
    return render_template("login_to_review.html", contents=contents)

@app.route('/register')
def register():
    return render_template("register.html")



# 회원가입 API
@app.route('/api/register', methods=['POST'])
def api_register():
    id_receive = request.form['user_id']
    pw_receive = request.form['user_pw']
    gender_receive = request.form['user_gender']
    pwchk_receive = request.form['pw_check']

    if pwchk_receive == 'yes' and id_receive != '':
        pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

        db.user.insert_one({'user_id': id_receive, 'user_pw': pw_hash, 'user_gender': gender_receive})

        return jsonify({'result': 'success'})
    elif id_receive == '':
        return jsonify({'msg': '아이디를 입력해주세요!'})
    elif pwchk_receive != 'yes':
        return jsonify({'msg':'비밀번호를 확인해주세요!'})
    elif gender_receive == 'no':
        return jsonify({'msg': '성별을 선택해주세요!'})


# 로그인 API
@app.route('/api/login', methods=['POST'])
def api_login():
    id_receive = request.form['user_id']
    pw_receive = request.form['user_pw']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    result = db.user.find_one({'user_id': id_receive, 'user_pw': pw_hash})
    result_id = db.user.find_one({'user_id': id_receive})

    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60*30)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    elif result_id is None:
        return jsonify({'result': 'fail', 'msg': '아이디가 존재하지 않습니다!'})
    else:
        return jsonify({'result': 'fail', 'msg': '비밀번호를 확인해주세요!'})

# 유저 정보 확인 API
@app.route('/api/user', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        userinfo = db.user.find_one({'user_id': payload['id']}, {'_id': 0})

        return jsonify({'result': 'success', 'user_id': userinfo['user_id'], 'user_gender': userinfo['user_gender']})
    except jwt.ExpiredSignatureError:
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})

# 아이디 중복 확인
@app.route('/sign_up/check_dup', methods=['POST'])
def check_dup():
    username_receive = request.form['username_give']
    exists = bool(db.users.find_one({"user_id": username_receive}))
    return jsonify({'result': 'success', 'exists': exists})

## 리뷰 작성하기
@app.route('/api/review', methods=['POST'])
def write_review():
    exhibition_receive = request.form['review_exhibition_give']
    date_receive = request.form['review_date_give']
    grade_receive = int(request.form['review_grade_give'])
    comment_receive = request.form['review_comment_give']
    like_receive = 0
    doc = {
        'review_exhibition': exhibition_receive,
        'review_grade': grade_receive,
        'review_comment': comment_receive,
        'review_like': like_receive,
        'review_date': date_receive
    }

    db.review.insert_one(doc)

    return jsonify({'msg': '등록이 완료되었습니다.'})

@app.route('/api/review', methods=['GET'])
def show_grades():
    grades_receive = list(db.review.find({}, {'_id': False}))
    print(grades_receive)
    return jsonify({'grades_receive': grades_receive})

# 리뷰 좋아요 누르기
@app.route('/api/like', methods=['POST'])
def make_like():

    review_title_receive = request.form['review_title_give']

    target_like = db.review.find_one({'review_title': review_title_receive})
    current_like = target_like['review_like']

    new_like = current_like + 1

    db.review.update_one({'review_title': review_title_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': current_like})


# 리뷰 삭제하기
@app.route('/delete/<idx>', methods=['GET'])
def delete_reviews(idx):
    review_comment_receive = request.form['review_comment_give']
    print(review_comment_receive)
    db.review.delete_one({'review_comment': review_comment_receive})
    return jsonify('msg')


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
