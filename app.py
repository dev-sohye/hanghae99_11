from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.test


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('review.html')


## 리뷰 작성하기
@app.route('/api/review', methods=['POST'])
def write_review():
    grade_receive = request.form['review_grade_give']
    title_receive = request.form['review_title_give']
    comment_receive = request.form['review_comment_give']
    like_receive = 0

    doc = {
        'review_grade': grade_receive,
        'review_title': title_receive,
        'review_comment': comment_receive,
        'review_like': like_receive
    }

    db.review.insert_one(doc)

    return jsonify({'msg': '등록이 완료되었습니다.'})


## 리뷰 불러오기
@app.route('/api/review', methods=['GET'])
def read_reviews():
    reviews = list(db.review.find({}, {'_id': False}))
    return jsonify({'all_reviews': reviews})


# 리뷰 좋아요 누르기
@app.route('/api/like', methods=['POST'])
def make_like():

    review_title_receive = request.form['review_title_give']

    target_like = db.review.find_one({'review_title': review_title_receive})
    current_like = target_like['review_like']

    new_like = current_like + 1

    db.review.update_one({'review_title': review_title_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': current_like})


# # 리뷰 삭제하기
# @app.route('/api/delete', methods=['POST'])
# def delete_reviews():
#     review_title_receive = request.form['review_title_give']
#
#     db.review.delete_one({'review_title': review_title_receive})
#     return jsonify({'msg': '삭제되었습니다.'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
