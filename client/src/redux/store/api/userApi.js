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

  return await axios({
    method: 'put',
    url: url,
    data: user.user,
    headers: user.headers,
  });
};

export const phoneAuth = async (phone) => {

  const authsend = await axios({
    method: 'post',
    url: "/api/sendOTP",
    data: phone,
  })

  return authsend
};

export const checkOtp = async (otp) => {

  const approved =  await axios({
    method: 'post',
    url: "/api/checkOTP",
    data: otp,
  });

  return approved
};