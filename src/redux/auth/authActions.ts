import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCESS,
  ORDER_SuCESS,
  USERDATA_SUCESS,
  ORDER_REQUEST,
  USERDATA_REQUEST,
  LOGOUT,
  IMAGE_UPLOAD_REQ,
  IMAGE_UPLOAD_SUCESS,
  IMAGE_UPLOAD_SYNC_SUCESS,
  USERDATA_SYNC_SUCESS,
  ORDER_SYNC_SuCESS,
  ORDER_CLOSED,
  USER_CLOSED,
  IMAGE_ClOSED,
  INTIAL_STATE,
} from './authConstants';
import {LoginRequestPayload} from './authInterfaces';
// import { LoginRequestPayload } from './authInterface';

export const loginRequest = (payload: LoginRequestPayload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (token: string) => ({
  type: LOGIN_SUCCESS,
  token,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  error,
});

export const postOrder = () => ({
  type: ORDER_REQUEST,
});
export const orderSucess = () => ({
  type: ORDER_SuCESS,
});

export const intialState = () => ({
  type: INTIAL_STATE,
});

export const orderClosed = () => ({
  type: ORDER_CLOSED,
});
export const postUserData = () => ({
  type: USERDATA_REQUEST,
});
export const userDataSucess = () => ({
  type: USERDATA_SUCESS,
});
export const userDataClosed = () => ({
  type: USER_CLOSED,
});
export const imageUpload = () => ({
  type: IMAGE_UPLOAD_REQ,
});
export const imageUploadSucess = () => ({
  type: IMAGE_UPLOAD_SUCESS,
});
export const imageUploadClosed = () => ({
  type: IMAGE_ClOSED,
});
export const logout = () => ({
  type: LOGOUT,
});
export const logout_sucess = () => ({
  type: LOGOUT_SUCESS,
});
export const imagesSyncSucess = () => ({
  type: IMAGE_UPLOAD_SYNC_SUCESS,
});
export const userDataSyncSucess = () => ({
  type: USERDATA_SYNC_SUCESS,
});
export const orderSyncSucess = () => ({
  type: ORDER_SYNC_SuCESS,
});
