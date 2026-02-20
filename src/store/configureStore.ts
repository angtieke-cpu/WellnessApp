import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './rootSaga';
import {rootReducer} from './rootReducer';
// import rootSaga from './rootSaga';
// import rootReducer from './rootReducer';
// import { rootReducer } from './rootReducer';
// import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false, // Disable serializable checks if required
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
