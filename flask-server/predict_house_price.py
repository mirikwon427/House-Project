import pandas as pd
from sklearn.preprocessing import LabelEncoder

from pycaret.regression import load_model, predict_model

import warnings

warnings.filterwarnings(action='ignore')

from datetime import date
import os

def predict_price(data):
    data = {key.upper(): value for key, value in data.items()}
    today = date.today()
    today_formatted = today.strftime("%Y%m%d")
    DATA_DIR = './data/API/'

    file_list = os.listdir(DATA_DIR)
    file_list.sort()

    df = pd.read_csv(DATA_DIR + file_list[-1])

    # 모델 로드
    model = load_model('./models/house_price_model_update')

    # 새로운 데이터 만들기
    new_data = dict()

    # 자치구 라벨인코딩
    SGG_dict = dict()

    SGG_grouped = pd.DataFrame(df.groupby(['SGG_NM'])['OBJ_AMT'].mean())
    SGG_grouped = SGG_grouped.reset_index()
    SGG_grouped = SGG_grouped.sort_values(by='OBJ_AMT')
    SGG_grouped = SGG_grouped.reset_index()
    SGG_grouped = SGG_grouped.drop(['index'], axis=1)
    SGG_grouped = SGG_grouped.reset_index()

    SGG_list = list(SGG_grouped['SGG_NM'])
    index_list = list(SGG_grouped['index'])
    for SGG, index in zip(SGG_list, index_list):
        SGG_dict[SGG] = index

    new_data['SGG_NM'] = SGG_dict[data['SGGNM']]

    # 법정동 라벨인코딩
    SGG = list(df['SGG_NM'].unique())
    BJDONG_dict = dict()
    for name in SGG:
        BJDONG_grouped = pd.DataFrame(df[df['SGG_NM'] == name].groupby(['BJDONG_NM'])['OBJ_AMT'].mean())
        BJDONG_grouped = BJDONG_grouped.reset_index()
        BJDONG_grouped = BJDONG_grouped.sort_values(by='OBJ_AMT')
        BJDONG_grouped = BJDONG_grouped.reset_index()
        BJDONG_grouped = BJDONG_grouped.drop(['index'], axis=1)
        BJDONG_grouped = BJDONG_grouped.reset_index()

        BJDONG_list = list(BJDONG_grouped['BJDONG_NM'])
        index_list = list(BJDONG_grouped['index'])

        for BJDONG, index in zip(BJDONG_list, index_list):
            BJDONG_dict[BJDONG] = index

    new_data['BJDONG_NM'] = BJDONG_dict[data['BJDONGNM']]

    # BLDG_NM 라벨 인코딩
    encoder = LabelEncoder()

    encoded_labels = encoder.fit_transform(df['BLDG_NM'])
    label_encoding_dict = {label: encoded_label for label, encoded_label in zip(df['BLDG_NM'], encoded_labels)}

    new_data['BLDG_NM'] = label_encoding_dict[data['BLDGNM']]

    # BLDG_AREA 처리
    if pd.isna(data['SUPPLYAREA']):
        temp = pd.DataFrame(df.groupby(['SGG_NM', 'BJDONG_NM'])['BLDG_AREA'].agg('mean'))
        temp = temp.reset_index()
        new_data['BLDG_AREA'] = round(
            temp[(temp['SGG_NM'] == data['SGGNM']) & (temp['BJDONG_NM'] == data['BJDONGNM'])]['BLDG_AREA'], 2)
    else:
        new_data['BLDG_AREA'] = float(str(data['SUPPLYAREA']).split('㎡')[0])

    # 현재를 기준으로 3년 후의 시간 데이터 넣기
    new_data['year'] = date.today().year + 3
    new_data['month'] = date.today().month
    new_data['day'] = date.today().day

    # 아파트 유무 넣기
    if data["HOUSETYPE"] == '아파트':
        new_data['APT'] = 1
    else:
        new_data['APT'] = 0

    # 집 값이 비싼 지역
    if data['SGGNM'] in ['송파구', '용산구', '강남구', '서초구']:
        new_data['expensive_SGG'] = 1
    else:
        new_data['expensive_SGG'] = 0

    # 현재 집 값 넣기
    new_data['past_OBJ_AMT'] = data['OBJAMT']

    # 지역의 평균 집 값 넣기
    new_data['OBJ_AMT_mean'] = int(
        df[(df['SGG_NM'] == data['SGGNM']) & (df['BJDONG_NM'] == data['BJDONGNM']) & (df['BLDG_NM'] == data['BLDGNM'])][
            'OBJ_AMT'].mean())

    new = pd.DataFrame([new_data])

    preds = predict_model(model, data=new)
    pred = int(preds['prediction_label'][0])
    return pred
