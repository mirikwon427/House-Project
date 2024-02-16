import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  house: {
    registerdHouse_id: 0,
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
    tot_area: '',
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
    user_id: 0,
  },
  isErr: false,
  isLiked: false,
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    getHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    getHouseSuc(state, action) {
      state.isLoading = false;

      state.house = action.payload.registeredHouseDto;
      state.isLiked = action.payload.isLiked === 'TRUE';
    },
    getHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },

    likeHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    likeHouseSuc(state, action) {
      state.isLoading = false;
      state.isLiked = true;
    },
    likeHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },

    unlikeHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    unlikeHouseSuc(state, action) {
      state.isLoading = false;
      state.isLiked = false;
    },
    unlikeHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },

    registerHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    registerHouseSuc(state, action) {
      state.isLoading = false;

      window.location.href = `/house/${action.payload.registeredHouseId}`;
    },
    registerHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },

    getLikedHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    getLikedHouseSuc(state, action) {
      state.isLoading = false;
    },
    getLikedHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },

    getRegisteredHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    getRegisteredHouseSuc(state, action) {
      state.isLoading = false;
    },
    getRegisteredHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
    },
  },
});

export const houseActions = houseSlice.actions;
export default houseSlice.reducer;
