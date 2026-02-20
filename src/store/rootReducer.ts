import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from '../redux/auth/authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
});
