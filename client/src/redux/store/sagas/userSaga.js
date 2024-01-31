import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { userActions } from '../reducers/userReducer';
import { loginUser } from '../api/userApi';

function* loginUserApi(action) {
  try {
    const { data } = yield call(loginUser, action.payload);

    yield put(userActions.loginUserSuc(data));
  } catch (e) {
    yield put(
      userActions.loginUserFail({ success: false, msg: '회원정보가 일치하지 않습니다.' }),
    );
  }
}
function* watchLoginUser() {
  yield takeLatest(userActions.loginUserReq, loginUserApi);
}

export default function* userSaga() {
  yield all([fork(watchLoginUser)]);
}
