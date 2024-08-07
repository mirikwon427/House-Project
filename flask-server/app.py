from flask import Flask, request, jsonify
import os
from twilio.rest import Client
from past_house_price import past_price
from predict_house_price import predict_price
from best_SGG import best_SGG

########
import pandas as pd
import os


account_sid = os.environ.get('account_sid','')
auth_token = os.environ.get('auth_token','')
verify_sid = os.environ.get('verify_sid','')

DATA_DIR = './data/API/'

file_list = os.listdir(DATA_DIR)
file_list.sort()

df = pd.read_csv('./data/API/' + file_list[-1])

client = Client(account_sid, auth_token)

app = Flask(__name__)

@app.route('/')
def home():
   return 'This is Home!'

@app.route('/api/futurePrice', methods = ['POST'])
def predicted_price():
   try:
    data = request.json

    dates_list, past_price_list =  past_price(data, df)
    past_list = dict()
    for i in range(len(dates_list)):
       past_list[dates_list[i]] = past_price_list[i]
    future_price =  predict_price(data, df, past_price_list)

    return jsonify({"success": True, "price": future_price, "pastList": past_list})
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

        return jsonify({"status" : verification.status})

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
        verification_check = client.verify.v2.services(verify_sid) \
            .verification_checks \
            .create(to=to_number, code=otp_code)
        return jsonify({"status": verification_check.status})

    except Exception as e:
        return jsonify({"error": str(e)})


# hot place API
@app.route('/api/hotPlace', methods=['POST'])
def find_hotplace():
    try:
        best_location = best_SGG()
        
        return jsonify({"location": best_location})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)