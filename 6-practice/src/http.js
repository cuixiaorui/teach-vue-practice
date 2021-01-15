import axios from "axios";

// dev -> /api
// prod -> xxxx 线上的服务地址
// /api/login
const myAxios = axios.create({
  baseURL: "/api",
});

export default myAxios;
