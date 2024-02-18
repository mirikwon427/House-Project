import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getHouse = async (data) => {
  const requestData = {
    method: 'get',
    url: `/api/house/${data.id}`,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};

export const likedHouse = async (data) => {
  const requestData = {
    method: 'post',
    url: `/api/like/${data.id}`,
    headers: { Authorization: `Bearer ${data.token}` },
  };
  return await axios(requestData);
};

export const unlikedHouse = async (data) => {
  const requestData = {
    method: 'delete',
    url: `/api/like/${data.id}`,
    headers: { Authorization: `Bearer ${data.token}` },
  };
  return await axios(requestData);
};

export const registerHouse = async (data) => {
  const requestData = {
    method: 'post',
    url: '/api/house',
    data: data.house,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};

export const getLikedHouse = async (data) => {
  const requestData = {
    method: 'get',
    url: `/api/liked/${data.userId}`,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};

export const getRegisteredHouse = async (data) => {
  const requestData = {
    method: 'get',
    url: `/api/getHouse`,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};

export const getRecommendedHouse = async (data) => {
  const requestData = {
    method: 'get',
    url: `/api/recommend/${data.userId}`,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};
