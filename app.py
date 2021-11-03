from flask import Flask, render_template, jsonify, request
import requests
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta


app = Flask(__name__)

#멀티 페이지 url
@app.route('/')
def main():
    exhibition = list(db.exhibition.find({}, {'_id':False}))
    return render_template("index.html", exhibition=exhibition)

@app.route('/exhibition/<keyword>')
def detail(keyword):
    contents = list(db.exhibition.find({}))
    return render_template("exhibition_view.html", contents=contents, word=keyword)

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/register')
def register():
    return render_template("register.html")


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)