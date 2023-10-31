import axios from "axios";

const Api = axios.create({
  
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