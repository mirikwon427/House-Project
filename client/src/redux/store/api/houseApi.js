import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getHouse = async (id) => {
  return await axios.get(`/api/house/${id}`);
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

export const getLikedHouse = async (userId) => {
  const requestData = {
    method: 'get',
    url: `/api/liked/${userId}`,
  };

  return await axios(requestData);
};

export const getRegisteredHouse = async (userId) => {
  const requestData = {
    method: 'get',
    url: `/api/registered/${userId}`,
  };

  return await axios(requestData);
};
