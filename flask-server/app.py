from flask import Flask, request, jsonify
import joblib
import pickle

app = Flask(__name__)

@app.route('/')
def home():
   return 'This is Home!'

@app.route('/api/predict', methods = ['GET'])
def predicted_price():
   data = request.json
   loaded_model = joblib.load(open('./baseline_model2.pkl', 'rt', encoding='cp949'))

   # future_price = loaded_model.predict(data)
   test_return = {'test': 'test'}
   return jsonify(test_return)
   return jsonify(future_price)

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)