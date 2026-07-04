from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

# In your app.py
if __name__ == '__main__':
    app.run(debug=True, port=5000) 
    
app = Flask(__name__)
CORS(app) # This allows your frontend to talk to this backend

# Replace with your actual key or use an environment variable
genai.configure(api_key="YOUR_GOOGLE_API_KEY") 
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    user_prompt = data.get('prompt')
    
    response = model.generate_content(user_prompt)
    return jsonify({'result': response.text})

if __name__ == '__main__':
    app.run(port=5000)