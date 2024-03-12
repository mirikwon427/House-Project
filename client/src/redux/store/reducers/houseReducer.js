import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  house: {
    address: '',
    addressRoad: '',
    bathroom: '',
    bjdongNm: '',
    bldgNm: '',
    description: '',
    direction: '',
    entranceStructure: '',
    floor: '',
    houseType: '',
    managementFee: '',
    netLeasableArea: 0,
    numberOfHouseholds: '',
    objAmt: 0,
    parkingSpaces: '',
    registeredHouse_id: 0,
    room: '',
    sggNm: '',
    supplyArea: 0,
    totalFloor: '',
    user_id: 0,
  },
  predicted: 0,
  pastPrices: {},
  likedHouses: [],
  registeredHouses: [],
  recommendedHouses: [],
  searchedHouses: [],
  isErr: false,
  isLiked: false,
  totalCnt: 0,
  hotPlaces: [],
};

const houseSlice = createSlice({
  name: 'house',
  initialState,
  reducers: {
    getHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.house = {
        address: '',
        addressRoad: '',
        bathroom: '',
        bjdongNm: '',
        bldgNm: '',
        description: '',
        direction: '',
        entranceStructure: '',
        floor: '',
        houseType: '',
        managementFee: '',
        netLeasableArea: 0,
        numberOfHouseholds: '',
        objAmt: 0,
        parkingSpaces: '',
        registeredHouse_id: 0,
        room: '',
        sggNm: '',
        supplyArea: 0,
        totalFloor: '',
        user_id: 0,
      };
      state.isErr = false;
      state.isLiked = false;
    },
    getHouseSuc(state, action) {
      state.isLoading = false;
      state.house = action.payload.registeredHouseDto;
      state.pastPrices = action.payload.pastList;
      state.predicted = action.payload.price;
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
      state.likedHouses = [];
      state.isErr = false;
    },
    getLikedHouseSuc(state, action) {
      state.isLoading = false;
      state.likedHouses = action.payload.registeredHouse;
    },
    getLikedHouseFail(state, action) {
      state.isLoading = false;
      state.likedHouses = [];
      state.isErr = true;
    },

    getRegisteredHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
      state.registeredHouses = [];
    },
    getRegisteredHouseSuc(state, action) {
      state.isLoading = false;
      state.registeredHouses = action.payload.registeredHouse;
    },
    getRegisteredHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
      state.registeredHouses = [];
    },

    getRecommendedHouseReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
      state.recommendedHouses = [];
    },
    getRecommendedHouseSuc(state, action) {
      state.isLoading = false;
      state.recommendedHouses = action.payload.registeredHouse;
    },
    getRecommendedHouseFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
      state.recommendedHouses = [];
    },

    searchHousesReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
      state.searchedHouses = [];
      state.totalCnt = 0;
    },
    searchHousesSuc(state, action) {
      state.isLoading = false;
      state.isErr = false;
      state.errMsg = '';
      state.searchedHouses = action.payload.registeredHouse;
      state.totalCnt = action.payload.totalCount;
    },
    searchHousesFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
      state.searchedHouses = [];
      state.totalCnt = 0;
    },

    getHotPlacesReq(state, action) {
      state.isLoading = true;
      state.errMsg = '';
      state.isErr = false;
      state.hotPlaces = [];
    },
    getHotPlacesSuc(state, action) {
      state.isLoading = false;
      state.hotPlaces = action.payload.status;
    },
    getHotPlacesFail(state, action) {
      state.isLoading = false;
      state.isErr = true;
      state.hotPlaces = [];
    },
  },
});

export const houseActions = houseSlice.actions;
export default houseSlice.reducer;
