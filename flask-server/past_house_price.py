
def past_price(data, df):
    data = {key.upper(): value for key, value in data.items()}

    SGG = data['SGGNM']
    BJDONG = data['BJDONGNM']
    BLDG = data['BLDGNM'].replace(' ', '')
    BLDG_TYPE = data['HOUSETYPE']

    building_df = df[(df['SGG_NM'] == SGG) & (df['BJDONG_NM'] == BJDONG) & (df['BLDG_NM'] == BLDG) & (df['HOUSE_TYPE']==BLDG_TYPE)]
    building_df = building_df.sort_values(by='DEAL_YMD', ascending=False)

    date = list(building_df.iloc[:10, :]['DEAL_YMD'])
    price = list(building_df.iloc[:10, :]['OBJ_AMT'])

    return date, price
