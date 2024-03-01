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
  console.log('request:::', data.house);
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

export const searchHouses = async (data) => {
  let queryStr = '';

  if (data.data.price1 !== 0) queryStr += `&price1=${data.data.price1}`;
  if (data.data.price2 !== 0) queryStr += `&price2=${data.data.price2}`;
  if (data.data.size1 !== 0) queryStr += `&size1=${data.data.size1}`;
  if (data.data.size2 !== 0) queryStr += `&size2=${data.data.size2}`;
  if (data.data.location.length > 0) {
    data.data.location.map((v) => {
      queryStr += `&location=${v}`;
      return v;
    });
  }
  if (data.data.type.length > 0) {
    data.data.type.map((v) => {
      queryStr += `&type=${v}`;
      return v;
    });
  }

  const requestData = {
    method: 'get',
    url: `/api/search?page=${data.data.page}${queryStr}`,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};

export const getHotPlaces = async (data) => {
  const requestData = {
    method: 'get',
    url: `/api/hotPlace`,
    headers: { Authorization: `Bearer ${data.token}` },
  };

  return await axios(requestData);
};
