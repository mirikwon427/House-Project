import { combineReducers } from '@reduxjs/toolkit';
// import { HYDRATE } from 'next-redux-wrapper';

const rootReducer = (state, action) => {
  switch (action.type) {
    default:
      return combineReducers({})(state, action);
  }
};

export default rootReducer;
