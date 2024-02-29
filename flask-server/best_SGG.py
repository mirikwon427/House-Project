import pandas as pd
import os

def best_SGG():
    DATA_DIR = './data/API/'

    file_list = os.listdir(DATA_DIR)
    file_list.sort()
    file_name = file_list[-1]

    data_df = pd.read_csv(DATA_DIR + file_name)
    data_df = data_df.reset_index()
    grouped = data_df.groupby(['SGG_NM'])['index'].count()
    grouped = grouped.reset_index()
    grouped = grouped.sort_values(by='index', ascending=False)
    best_SGG = grouped['SGG_NM'].to_list()[:3]

    return best_SGG
