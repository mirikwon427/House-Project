import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducers({
        user: userReducer,
      })(state, action);
  }
};

const persistConfig = {
  timeout: 100,
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
