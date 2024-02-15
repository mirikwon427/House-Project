import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const getHouse = async (id) => {
  return await axios.get(`/api/house/${id}`);
};

export const registerHouse = async (data) => {
  console.log('house:::', data);
  const requestData = {
    method: 'post',
    url: '/api/house',
    data: data.house,
    headers: data.token,
  };
  console.log('requestData:::', requestData);
  //   return await axios.post('/api/house', house);

  return await axios(requestData);
};
