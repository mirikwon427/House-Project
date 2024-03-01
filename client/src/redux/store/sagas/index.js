import { all, fork } from 'redux-saga/effects';
import houseSaga from './houseSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(houseSaga)]);
}
