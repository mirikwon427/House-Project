import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import houseReducer from './houseReducer';
import userReducer from './userReducer';

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducers({
        user: userReducer,
        house: houseReducer,
      })(state, action);
  }
};

const persistConfig = {
  timeout: 100,
  key: 'root',
  storage,
  whitelist: ['user', 'house'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
