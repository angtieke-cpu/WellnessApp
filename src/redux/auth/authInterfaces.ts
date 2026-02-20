export interface LoginRequestPayload {
  username: string;
  password: string;
}
export interface AuthState {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  userToken: string | null;
  loading: boolean;
  error: string | null;
  orderSucess: boolean;
  imageUploadSucess: boolean;
  userDataSucess: boolean;
  orderSyncSucess: boolean;
  userDataSyncSucess: boolean;
  imageUploaSyncSucess: boolean;
}
