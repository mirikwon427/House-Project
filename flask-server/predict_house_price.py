import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

from pycaret.regression import load_model,predict_model

import warnings
warnings.filterwarnings(action='ignore')

from datetime import date, timedelta


def predict_price(data):
    data = {key.upper(): value for key, value in data.items()}
    today = date.today()
    today_formatted = today.strftime("%Y%m%d")
    DATA_DIR = './data/API/'

    df = pd.read_csv(DATA_DIR + 'API_data_{}.csv'.format(today_formatted))
    df = df.drop(df[df['TOT_AREA'] >= 3000].index)
    df = df.reset_index(drop=True)

    # 모델 로드
    model = load_model('./models/{}_blended_model'.format(data['SGG_NM']))

    # 새로운 데이터 만들기
    new_data = dict()

    # 라벨 인코딩
    house_type_dict = {'단독다가구': 0, '아파트': 1, '연립다세대': 2, '오피스텔': 3}

    new_data['HOUSE_TYPE'] = house_type_dict[data['HOUSE_TYPE']]

    # 법정동 onehotencoding
    BJDONG_NM_list = list(df[df['SGG_NM'] == data['SGG_NM']]['BJDONG_NM'].unique())
    for name in BJDONG_NM_list:
        if name == data['BJDONG_NM']:
            new_data[name] = 1
        else:
            new_data[name] = 0

    # 현재를 기준으로 3년 후의 시간 데이터 넣기
    new_data['DEAL_YEAR'] = date.today().year - 2010
    new_data['DEAL_MONTH'] = date.today().month

    # BLDG_AREA 처리
    if pd.isna(data['SUPPLY_AREA']):
        temp = pd.DataFrame(df.groupby(['SGG_NM', 'BJDONG_NM'])['BLDG_AREA'].agg('mean'))
        temp = temp.reset_index()
        new_data['BLDG_AREA'] = round(
            temp[(temp['SGG_NM'] == data['SGG_NM']) & (temp['BJDONG_NM'] == data['BJDONG_NM'])]['BLDG_AREA'], 2)
    else:
        new_data['BLDG_AREA'] = float(data['SUPPLY_AREA'].split('㎡')[0])

    # TOT_AREA 처리
    # 이전 데이터들의 평균으로 대체
    if pd.isna(data['NET_LEASABLE_AREA']):
        temp = pd.DataFrame(df.groupby(['SGG_NM', 'BJDONG_NM'])['TOT_AREA'].agg('mean'))
        temp = temp.reset_index()
        new_data['TOT_AREA'] = round(
            temp[(temp['SGG_NM'] == data['SGG_NM']) & (temp['BJDONG_NM'] == data['BJDONG_NM'])]['TOT_AREA'], 2)
    else:
        new_data['TOT_AREA'] = float(data['NET_LEASABLE_AREA'].split('㎡')[0])

    new = pd.DataFrame([new_data])

    preds = predict_model(model, data=new)
    pred = preds['prediction_label'][0]

    return int(pred)