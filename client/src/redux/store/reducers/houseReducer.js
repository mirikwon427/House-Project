import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  house: {
    id: '',
    sgg_cd: '',
    sgg_nm: '',
    land_gbm: '',
    land_gbn_nm: '',
    bonbeon: '',
    bubeon: '',
    bldg_nm: '',
    dal_ymd: '',
    obj_amt: 0,
    bldg_area: 0,
    tot_area: 0,
    h_floor: '',
    build_year: '',
    house_type: '',
    req_gbn: '',
    acc_year: '',
    bjdong_cd: '',
    bjdong_nm: '',
    right_gbn: '',
    cntl_ymd: '',
    rdealer_lawdnm: '',
  },
  isErr: false,
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    registerHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    registerHouseSuc(state, action) {
      state.isLoading = false;

      window.location.href = `/house/${action.payload.house.id}`;
      state.house = action.payload.house;
    },
    registerHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },
  },
});

export const houseActions = houseSlice.actions;
export default houseSlice.reducer;
