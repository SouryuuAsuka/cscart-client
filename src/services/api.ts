import axios from "axios";

const Api = axios.create({
  baseURL: 'https://test-cscart.lampymarket.com/',
})

Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error)
  }
);

export default Api;