import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  getHouse,
  getLikedHouse,
  getRegisteredHouse,
  likedHouse,
  registerHouse,
  unlikedHouse,
} from '../api/houseApi';
import { houseActions } from '../reducers/houseReducer';

// Get House
function* getHouseApi(action) {
  try {
    const { data } = yield call(getHouse, action.payload);

    yield put(houseActions.getHouseSuc(data));
  } catch (e) {
    console.error(e);
    yield put(houseActions.getHouseFail({ success: false, msg: e.message }));
  }
}

function* watchGetHouse() {
  yield takeLatest(houseActions.getHouseReq, getHouseApi);
}

// Like House
function* likeHouseApi(action) {
  try {
    const { data } = yield call(likedHouse, action.payload);

    yield put(houseActions.likeHouseSuc(data));
  } catch (e) {
    console.error(e);
    yield put(houseActions.likeHouseFail({ success: false, msg: e.message }));
  }
}

function* watchLikeHouse() {
  yield takeLatest(houseActions.likeHouseReq, likeHouseApi);
}

// Unlike House
function* unlikeHouseApi(action) {
  try {
    const { data } = yield call(unlikedHouse, action.payload);

    yield put(houseActions.unlikeHouseSuc(data));
  } catch (e) {
    console.error(e);
    yield put(houseActions.unlikeHouseFail({ success: false, msg: e.message }));
  }
}

function* watchUnLikeHouse() {
  yield takeLatest(houseActions.unlikeHouseReq, unlikeHouseApi);
}

// Register House
function* registerHouseApi(action) {
  try {
    const { data } = yield call(registerHouse, action.payload);

    yield put(houseActions.registerHouseSuc(data));
  } catch (e) {
    yield put(
      houseActions.registerHouseFail({ success: false, msg: e.message }),
    );
  }
}

function* watchRegisterHouse() {
  yield takeLatest(houseActions.registerHouseReq, registerHouseApi);
}

// Get Registered House
function* getRegisteredHouseApi(action) {
  try {
    const { data } = yield call(getRegisteredHouse, action.payload);

    yield put(houseActions.getRegisteredHouseSuc(data));
  } catch (e) {
    yield put(
      houseActions.getRegisteredHouseFail({ success: false, msg: e.message }),
    );
  }
}

function* watchGetRegisteredHouse() {
  yield takeLatest(houseActions.getRegisteredHouseReq, getRegisteredHouseApi);
}

// Get Liked House
function* getLikedHouseApi(action) {
  try {
    const { data } = yield call(getLikedHouse, action.payload);

    yield put(houseActions.getLikedHouseSuc(data));
  } catch (e) {
    yield put(
      houseActions.getLikedHouseFail({ success: false, msg: e.message }),
    );
  }
}

function* watchGetLikedHouse() {
  yield takeLatest(houseActions.getLikedHouseReq, getLikedHouseApi);
}

export default function* houseSaga() {
  yield all([
    fork(watchRegisterHouse),
    fork(watchGetHouse),
    fork(watchLikeHouse),
    fork(watchUnLikeHouse),
    fork(watchGetRegisteredHouse),
    fork(watchGetLikedHouse),
  ]);
}
