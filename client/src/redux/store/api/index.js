import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASIC_SERVER_URL + '/api',
  withCredentials: true,
  timeout: 10000,
});
