import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://cloud-music.pl-fe.cn/",
  timeout: 60000,
  withCredentials: true,
  // headers: {},
});

export default myAxios;
