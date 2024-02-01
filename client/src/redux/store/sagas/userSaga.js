import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { userActions } from '../reducers/userReducer';
import { loginUser, signUp } from '../api/userApi';

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
function* watchLoginUser() {
  yield takeLatest(userActions.loginUserReq, loginUserApi);
}

function* watchSignUp() {
  yield takeLatest(userActions.signUpReq, signUpApi);
}

export default function* userSaga() {
  yield all([fork(watchLoginUser), fork(watchSignUp)]);
}
