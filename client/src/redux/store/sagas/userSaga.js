import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { userActions } from '../reducers/userReducer';
import { loginUser, signUp, logoutUser, updateUser } from '../api/userApi';

// Login
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

// Signup
function* signUpApi(action) {
  try {
    const { data } = yield call(signUp, action.payload);

    yield put(userActions.signUpSuc(data));
  } catch (e) {
    yield put(
      userActions.signUpFail({ success: false, msg: '서버에러입니다.' }),
    );
  }
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

function* updateUserApi(action) {
  try {
    const { data } = yield call(updateUser, action.payload);
    yield put(userActions.updateUserSuc(data));
  } catch (e) {
    console.error(e.message);
    yield put(
      userActions.updateUserFail({ success: false, msg: '서버에러입니다.'}),
      );
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
  yield all([fork(watchLoginUser), fork(watchSignUp), fork(watchLogoutUser), fork(watchUpdateUser)]);
}
