import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://cloud-music.pl-fe.cn/',
  timeout: 60000,
  withCredentials: true,
  headers: {
    // origin: 'http://music.youah.cc',
    // referer: 'http://music.youah.cc',
  },
});

export default myAxios;
