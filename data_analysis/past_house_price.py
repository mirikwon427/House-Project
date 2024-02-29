import pandas as pd

def past_price(data):
    data = {key.upper(): value for key, value in data.items()}

    from datetime import date

    today = date.today()
    today_formatted = today.strftime("%Y%m%d")
    df = pd.read_csv('./data/API_data_{}.csv'.format(today_formatted))

    SGG = data['SGG_NM']
    BJDONG = data['BJDONG_NM']
    BLDG = data['BLDG_NM'].replace(' ','')


    building_df = df[(df['SGG_NM'] == SGG) & (df['BJDONG_NM'] == BJDONG) & (df['BLDG_NM'] == BLDG)]
    building_df = building_df.sort_values(by='DEAL_YMD', ascending=False)

    date = list(building_df.iloc[:10, :]['DEAL_YMD'])
    price = list(building_df.iloc[:10, :]['OBJ_AMT'])

    return date, price
