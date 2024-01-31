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
      sessionStorage.setItem('id', action.payload.id)

      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginUserFail(state, action) {
      state.isloading = false;
      sessionStorage.clear();
      alert(action.payload.msg);

      state.errMsg = action.payload.msg;
      state.isErr = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
