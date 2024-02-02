import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token : '',
    email: '',
    pw: '',
    id: '',
    name: '',
    phone: '',
    age: '',
    address: '',
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.age = action.payload.age;
      state.address = action.payload.address;
    },
    logout: (state) => {
      state.user = null;
    },
    // userSearch: (state, action) => {
      //   state.id = action.payload;
      //   state.number = action.payload;
      // },
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.pw = action.payload.pw;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.age = action.payload.age;
      state.address = action.payload.address;
    },
    },
  });