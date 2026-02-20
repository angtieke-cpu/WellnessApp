import {all} from 'redux-saga/effects';
import {authSaga} from '../redux/auth/authSaga';

export function* rootSaga() {
  yield all([authSaga()]);
}
