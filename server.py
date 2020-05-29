from flask import Flask, render_template, request, url_for, redirect, jsonify
import json
app = Flask(__name__)

userdata = 0


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/new')
def new():
    print("Here we are")
    return render_template('result.html')
    # return jsonify(userdata)


@app.route('/getdata', methods=['GET'])
def getdata():
    print("here getedata")
    return jsonify(userdata)


@app.route('/result', methods=['GET', 'POST'])
def your_func():
    print(request.form)
    # print(type(request.form['data']))
    # print(json.loads(request.form))
    global userdata
    userdata = request.form
    # print(request.method)
    # print(request.form)
    # if (request.method == 'POST'):
    #     print("here I am")
    # return render_template('result.html')
    return redirect(url_for('new'))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5500)
