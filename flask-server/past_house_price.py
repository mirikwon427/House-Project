import pandas as pd
import os

def past_price(data):
    data = {key.upper(): value for key, value in data.items()}

    DATA_DIR = './data/API/'

    file_list = os.listdir(DATA_DIR)
    file_list.sort()

    df = pd.read_csv('./data/API/' + file_list[-1])

    SGG = data['SGGNM']
    BJDONG = data['BJDONGNM']
    BLDG = data['BLDGNM'].replace(' ', '')

    building_df = df[(df['SGG_NM'] == SGG) & (df['BJDONG_NM'] == BJDONG) & (df['BLDG_NM'] == BLDG)]
    building_df = building_df.sort_values(by='DEAL_YMD', ascending=False)

    date = list(building_df.iloc[:10, :]['DEAL_YMD'])
    price = list(building_df.iloc[:10, :]['OBJ_AMT'])

    return date, price
