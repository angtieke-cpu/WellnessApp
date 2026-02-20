import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCESS,
  ORDER_SuCESS,
  USERDATA_SUCESS,
  IMAGE_UPLOAD_SUCESS,
  ORDER_SYNC_SuCESS,
  USERDATA_SYNC_SUCESS,
  IMAGE_UPLOAD_SYNC_SUCESS,
  ORDER_CLOSED,
  USER_CLOSED,
  IMAGE_ClOSED,
  INTIAL_STATE,
} from './authConstants';
import {AuthState} from './authInterfaces';
// import { AuthState } from './authInterface';

const initialState: AuthState = {
  isLoggedIn: false,
  isLoggedOut: false,
  userToken: null,
  loading: false,
  error: null,
  orderSucess: false,
  imageUploadSucess: false,
  userDataSucess: false,
  orderSyncSucess: false,
  userDataSyncSucess: false,
  imageUploaSyncSucess: false,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  // console.log(action)
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, loading: true, error: null};
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoggedOut: false,
        userToken: action.token,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {...state, loading: false, error: 'Invalid Credentials'};
    case LOGOUT_SUCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoggedOut: true,
        userToken: null,
        loading: false,
        imageUploadSucess: false,
        orderSyncSucess: false,
        userDataSyncSucess: false,
        imageUploaSyncSucess:false,
        orderSucess : false,
        userDataSucess:false
      };
      case INTIAL_STATE:
        return {
          ...state,
          isLoggedIn: true,
          isLoggedOut: false,
          userToken: 'data.token',
          loading: false,
          imageUploadSucess: false,
          orderSyncSucess: false,
          userDataSyncSucess: false,
          imageUploaSyncSucess:false,
          orderSucess : false,
          userDataSucess:false
        };
    case ORDER_SuCESS:
      return {...state, orderSucess: true, loading: false};
    case USERDATA_SUCESS:
      return {...state, userDataSucess: true, loading: false};
    case IMAGE_UPLOAD_SUCESS:
      return {...state, imageUploadSucess: true, loading: false};
      case ORDER_CLOSED:
        return {...state, orderSucess: false, loading: false};
      case USER_CLOSED:
        return {...state, userDataSucess: false, loading: false};
      case IMAGE_ClOSED:
        return {...state, imageUploadSucess: false, loading: false};
    // case IMAGE_UPLOAD_SYNC_SUCESS:
    //   return {...state, imageUploaSyncSucess: true, loading: false};
    // case ORDER_SYNC_SuCESS:
    //   return {...state, orderSyncSucess: true, loading: false};
    // case USERDATA_SYNC_SUCESS:
    //   return {...state, userDataSyncSucess: true, loading: false};
    default:
      return state;
  }
};
