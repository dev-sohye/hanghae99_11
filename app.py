from flask import Flask, render_template


app = Flask(__name__)

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


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)