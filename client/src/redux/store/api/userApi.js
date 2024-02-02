import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const loginUser = async (user) => {
  return await axios.post('/api/login', user);
};


export const signUp = async (user) => {
  return await axios.post('/api/signup', user);
};

export const logoutUser = async () => {
  return await axios.post('/api/logout');
};
