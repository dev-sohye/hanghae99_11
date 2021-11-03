from flask import Flask, render_template, jsonify, request, session, redirect, url_for

app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.exhibition

import jwt, datetime, hashlib

SECRET_KEY = 'okay'


#멀티 페이지 url
@app.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"user_id": payload['id']})
        return render_template('index.html', myid=user_info["user_id"])
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인을 다시 해주세요."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

@app.route('/exhibition')
def exhibition():
    return render_template("exhibition_view.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/register')
def register():
    return render_template("register.html")

# 회원가입 API
@app.route('/api/register', methods=['POST'])
def api_register():
    id_receive = request.form['user_id']
    pw_receive = request.form['user_pw']
    gender_receive = request.form['user_gender']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    db.user.insert_one({'user_id': id_receive, 'user_pw': pw_hash, 'user_gender' : gender_receive})

    return jsonify({'result': 'success'})

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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60*60)
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

        return jsonify({'result': 'success', 'id': userinfo['user_id'], 'gender': userinfo['user_gender']})
    except jwt.ExpiredSignatureError:
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)