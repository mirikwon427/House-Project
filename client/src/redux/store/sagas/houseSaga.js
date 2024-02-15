import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { getHouse, registerHouse } from '../api/houseApi';
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

// Register House
function* registerHouseApi(action) {
  try {
    console.log('registerHouseAction:::', action);
    const { data } = yield call(registerHouse, action.payload);

    console.log('registerHouseResponse:::', data);
    yield put(houseActions.registerHouseSuc(data));
  } catch (e) {
    console.error(e);
    yield put(
      houseActions.registerHouseFail({ success: false, msg: e.message }),
    );
  }
}

function* watchRegisterHouse() {
  yield takeLatest(houseActions.registerHouseReq, registerHouseApi);
}

export default function* houseSaga() {
  yield all([fork(watchRegisterHouse), fork(watchGetHouse)]);
}
