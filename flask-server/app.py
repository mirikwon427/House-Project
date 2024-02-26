from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os
# from twilio.rest import Client
#
#
#
# account_sid = ""
# auth_token = ""
# verify_sid = ""
# verified_number = "+821040374804"
#
# client = Client(account_sid, auth_token)

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

# 핸드폰 인증 요청 API
@app.route('/api/sendOTP', methods=['POST'])
def send_otp():
    try:
        data = request.get_json()
        to_number = data.get('phone')

        verification = client.verify.v2.services(verify_sid) \
            .verifications \
            .create(to=to_number, channel="sms")

        return jsonify({"status": verification.status}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 핸드폰 인증 확인 API
@app.route('/api/checkOTP', methods=['POST'])
def check_otp():
    try:
        data = request.get_json()
        to_number = data.get('phone')
        otp_code = data.get('otpCode')

        verification_check = client.verify.v2.services(verify_sid) \
            .verification_checks \
            .create(to=to_number, code=otp_code)

        return jsonify({"status": verification_check.status}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)