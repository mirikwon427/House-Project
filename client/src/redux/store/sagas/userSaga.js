import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { userActions } from '../reducers/userReducer';
import { loginUser, logoutUser } from '../api/userApi';

// Login
function* loginUserApi(action) {
  try {
    const { data } = yield call(loginUser, action.payload);

    yield put(userActions.loginUserSuc(data));
  } catch (e) {
    yield put(
      userActions.loginUserFail({ success: false, msg: '서버에러입니다.' }),
    );
  }
}
function* watchLoginUser() {
  yield takeLatest(userActions.loginUserReq, loginUserApi);
}

// Logout
function* logoutUserApi(action) {
  try {
    const { data } = yield call(logoutUser);

    yield put(userActions.logoutUserSuc(data));
  } catch (e) {
    yield put(
      userActions.logoutUserFail({ success: false, msg: '서버에러입니다.' }),
    );
  }
}
function* watchLogoutUser() {
  yield takeLatest(userActions.logoutUserReq, logoutUserApi);
}

export default function* userSaga() {
  yield all([fork(watchLoginUser), fork(watchLogoutUser)]);
}
