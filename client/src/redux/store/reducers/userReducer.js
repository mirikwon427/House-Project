import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  user: {
    id: '',
    email: '',
    name: '',
    phone: '',
    age: '',
    address: '',
  },
  token: '',
  isErr: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUserReq(state, action) {
      state.isloading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    loginUserSuc(state, action) {
      state.isloading = false;

      window.location.href = '/';
      sessionStorage.setItem('token', action.payload.token);

      state.user = {
        id: action.payload.id,
        email: action.payload.enauk,
        name: action.payload.name,
        phone: action.payload.phone,
        age: action.payload.age,
        address: action.payload.address,
      };
      state.token = action.payload.token;
    },
    loginUserFail(state, action) {
      state.isloading = false;
      sessionStorage.removeItem('token');

      state.errMsg = action.payload.msg;
      state.isErr = true;
    },

    // Logout
    logoutUserReq(state, action) {
      state.isloading = true;
      state.errMsg = '';
      state.isErr = false;
    },
    logoutUserSuc(state, action) {
      state.isloading = false;

      window.location.href = '/login';
      sessionStorage.removeItem('token');
      sessionStorage.clear();

      state.user = {
        id: '',
        email: '',
        name: '',
        phone: '',
        age: '',
        address: '',
      };
      state.token = '';
    },
    logoutUserFail(state, action) {
      state.isloading = false;
      state.errMsg = action.payload.msg;
      state.isErr = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
