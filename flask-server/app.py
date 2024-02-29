from flask import Flask, request, jsonify
import os
from twilio.rest import Client
from past_house_price import past_price
from predict_house_price import predict_price
from best_SGG import best_SGG


account_sid = ""
auth_token = ""
verify_sid = ""

client = Client(account_sid, auth_token)

app = Flask(__name__)

@app.route('/')
def home():
   return 'This is Home!'

@app.route('/api/predict', methods = ['GET'])
def predicted_price():
   try:
    data = request.json
    dates_list, past_price_list =  past_price(data)
    future_price =  predict_price(data)

    return jsonify({"success": True, "price": future_price, "date": dates_list, "pastprice": past_price_list})
   except Exception as e:
    return jsonify({"success": False, "error": e})
      

# 핸드폰 인증 요청 API
@app.route('/api/sendOTP', methods=['POST'])
def send_otp():
    try:
        data = request.get_json()
        to_number = data.get('phone')

        verification = client.verify.v2.services(verify_sid) \
            .verifications \
            .create(to=to_number, channel="sms")

        return jsonify({"status": verification.status})

    except Exception as e:
        return jsonify({"error": str(e)})

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

        return jsonify({"status": verification_check.status})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)