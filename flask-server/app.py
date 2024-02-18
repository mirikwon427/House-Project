from flask import Flask, request, jsonify
import joblib
import pickle
import pandas as pd

app = Flask(__name__)

@app.route('/')
def home():
   return 'This is Home!'

@app.route('/api/predict', methods = ['GET'])
def predicted_price():
   data = request.json
   new_data = pd.DataFrame(data)
   loaded_model = joblib.load('./baseline_model2.pkl')

   future_price = loaded_model.predict(new_data)
   return jsonify(future_price)

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)