import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { registerHouse } from '../api/houseApi';
import { houseActions } from '../reducers/houseReducer';

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
  yield all([fork(watchRegisterHouse)]);
}
