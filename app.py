# from flask import Flask,jsonify,request, render_template, url_for


# app = Flask(__name__) 

# @app.route('/')
# def index():
#     return render_template('index.html')


# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, render_template, request, jsonify
import os
import cv2
import easyocr
import numpy as np

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/upload', methods=['POST'])
def upload():
    if 'images' not in request.files:
        return jsonify({'error': 'No files received'}), 400

    files = request.files.getlist('images')
    reader = easyocr.Reader(['en'], gpu=False)
    results = []

    for file in files:
        if file.filename == '':
            continue
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        img = cv2.imread(filepath)
        text_data = reader.readtext(img)
        text_only = [text for (_, text, _) in text_data]
       

        results.append({
            'filename': file.filename,
            'text': text_only
        })
    print(results)
    return jsonify({'results': results})


if __name__ == '__main__':
    app.run(debug=True)
