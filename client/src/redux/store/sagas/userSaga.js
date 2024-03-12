import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { loginUser, signUp, updateUser } from '../api/userApi';
import { userActions } from '../reducers/userReducer';

// Login
function* loginUserApi(action) {
  try {
    const { data } = yield call(loginUser, action.payload);

    yield put(userActions.loginUserSuc(data));
  } catch (e) {
    yield put(
      userActions.loginUserFail({
        success: false,
        msg: e.response.data.message,
      }),
    );
  }
}

// Signup
function* signUpApi(action) {
  try {
    const { data } = yield call(signUp, action.payload);

    yield put(userActions.signUpSuc(data));
  } catch (e) {
    yield put(userActions.signUpFail({ success: false, msg: e.message }));
  }
}

// Logout
function* logoutUserApi(action) {
  try {
    // const { data } = yield call(logoutUser);

    yield put(userActions.logoutUserSuc());
  } catch (e) {
    yield put(
      userActions.logoutUserFail({ success: false, msg: '서버에러입니다.' }),
    );
  }
}

function* updateUserApi(action) {
  try {
    const { data } = yield call(updateUser, action.payload);
    yield put(userActions.updateUserSuc(data));
  } catch (err) {
    yield put(userActions.updateUserFail({ success: false, msg: err.message }));
  }
}

function* watchLogoutUser() {
  yield takeLatest(userActions.logoutUserReq, logoutUserApi);
}

function* watchLoginUser() {
  yield takeLatest(userActions.loginUserReq, loginUserApi);
}

function* watchSignUp() {
  yield takeLatest(userActions.signUpReq, signUpApi);
}

function* watchUpdateUser() {
  yield takeLatest(userActions.updateUserReq, updateUserApi);
}

export default function* userSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchSignUp),
    fork(watchLogoutUser),
    fork(watchUpdateUser),
  ]);
}
