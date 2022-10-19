import axios from 'axios';

const myAxios = axios.create({
  baseURL: '/api',
  timeout: 60000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // origin: 'http://music.youah.cc',
    // referer: 'http://music.youah.cc',
  },
});

export default myAxios;
