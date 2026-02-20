import {call, put, takeLatest} from 'redux-saga/effects';
// import { loginApi } from './authApi';
// import { loginSuccess, loginFailure } from './authAction';
import {
  IMAGE_UPLOAD_REQ,
  LOGIN_REQUEST,
  LOGOUT,
  ORDER_REQUEST,
  USERDATA_REQUEST,
} from './authConstants';
import {
  saveToken,
  saveUserData,
  removeToken,
  getorderDetails,
  getPersonalDetails,
  getImageDetails,
  saveDate,
} from '../../helpers/storage';
import {
  imagesSyncSucess,
  imageUploadSucess,
  loginFailure,
  loginSuccess,
  logout_sucess,
  orderSucess,
  orderSyncSucess,
  userDataSucess,
  userDataSyncSucess,
} from './authActions';
import {
  loginApi,
  postImageDetails,
  postOrderDetails,
  postUserDetails,
} from './authApi';

// import userData from '../../assets/data/userData.json';

function* handleLogin(action: any): any {
  const {username, password} = action.payload;
  try {
    // const data=
    const data = yield call(loginApi, username, password);
    console.log(data);
    if (data) {
      yield put(loginSuccess('data.token'));
      saveToken(username, username.split('_').pop());
      saveUserData(data);
      saveDate();
    } // Assume API returns { token: string }
    else {
      yield put(loginFailure('Invalid Credentials'));
    }

    // Save the token in MMKV for session persistence
  } catch (error: any) {
    yield put(loginFailure(error.message));
    //   yield put(loginSuccess('data.token'));
    //   saveToken(username);
  }
}

function* handleLogout(): any {
  yield put(logout_sucess());
  removeToken();
}

function* handleOrder(): any {
  let orderDetails = getorderDetails();
  const data = yield call(postOrderDetails, orderDetails);
  if (data) {
    // console.log(data);
    // console.log(getSyncCall());
    // if (getSyncCall()) {
      // yield put(orderSyncSucess());
    // } else 
    yield put(orderSucess());
    // handleImgUpload();
    // getorderSequence().then((res:any)=>{
    //   let numbr = Number(res)+1;
    //   console.log(number)
    //   saveOrderSeq(numbr+'');
    //   removeOrderDetails();
    // })
  }
}

function* handleUser(): any {
  let personalDetails = getPersonalDetails();
  console.log(personalDetails);
  const data = yield call(postUserDetails, personalDetails);
  console.log(data)
  if (data) {
    // console.log(data)
    // console.log(getSyncCall());
    // if (getSyncCall()) {
      // yield put(userDataSyncSucess());
    // } else {
      yield put(userDataSucess());
    // }
    // handleOrder();
    // removePersonalDetails();
  }
}

function* handleImgUpload(): any {
  let orderDetails = getImageDetails();
  const data = yield call(postImageDetails, orderDetails);
  if (data) {
    console.log(data);
    // if (getSyncCall()) {
      // yield put(imagesSyncSucess());
    // } else yield
     yield put(imageUploadSucess());
    // removeImageDetails();
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(ORDER_REQUEST, handleOrder);
  yield takeLatest(USERDATA_REQUEST, handleUser);
  yield takeLatest(IMAGE_UPLOAD_REQ, handleImgUpload);
}
