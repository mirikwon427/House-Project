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
  const url = `/api/user/${user.user.id}`
  // console.log('put 요청 들어감')
  // console.log(url)
  return await axios({
                method: 'put',
                url: url,
                data: user.user,
                headers: user.headers,
              })
};

export const getUser = async (user) => {
  const url = `/api/user/${user.id}`
  console.log('get User 요청 들어감')
  console.log(url)
  return await axios({
                method: 'get',
                url: url,
                // headers: user.headers,
                // header도 추가시켜야 user 정보 받아오게 하는데에 있어서 보안상 문제가 없지 않을깝쇼..?
              })
};