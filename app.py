from flask import Flask, render_template, jsonify, request, session, redirect, url_for

app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.exhibition

import jwt, datetime, hashlib

SECRET_KEY = 'okay'


#멀티 페이지 url
@app.route('/')
def main():
    return render_template("index.html")

@app.route('/exhibition')
def exhibition():
    return render_template("exhibition_view.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/register')
def register():
    return render_template("register.html")

# 회원가입
@app.route('/api/register', methods=['POST'])
def api_register():
    id_receive = request.form['user_id']
    pw_receive = request.form['user_pw']
    gender_receive = request.form['user_gender']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    db.user.insert_one({'user_id': id_receive, 'user_pw': pw_hash, 'user_gender' : gender_receive})

    return jsonify({'result': 'success'})

# 로그인
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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({'result': 'success', 'token': token})
    elif result_id is None:
        return jsonify({'result': 'fail', 'msg': '아이디가 존재하지 않습니다!'})
    else:
        return jsonify({'result': 'fail', 'msg': '비밀번호를 확인해주세요!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)