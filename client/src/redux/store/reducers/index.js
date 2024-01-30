import { combineReducers } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';
import { userSlice } from './LoginReducer';

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducers({
        user: userSlice.reducer
      })(state, action);
  }
};

export default rootReducer;
