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

export const updateUser = async (user) => {
  const url = `/api/user/${user.user.id}`;

  console.log('updateUser:::', user);
  return await axios({
    method: 'put',
    url: url,
    data: user.user,
    headers: user.headers,
  });
};

export const getUser = async (user) => {
  const url = `/api/user/${user.id}`;

  return await axios({
    method: 'get',
    url: url,
  });
};
