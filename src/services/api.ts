import axios from "axios";

const Api = axios.create({
  baseURL: 'https://test-h2o.lampymarket.com/api/',
})

Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error)
    //return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log("Access token просрочен");
        originalConfig._retry = true;

        try {
          console.log("refresh token запрошен");
          const rs = await Api.post("users/token", {
            refreshToken: window.localStorage.getItem('refreshToken')
          });
          console.log(rs.data.error);
          const { accessToken, refreshToken } = rs.data.data;
          window.localStorage.setItem('accessToken', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
          originalConfig.headers['Authorization'] = 'Bearer ' + accessToken;
          return Api(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);
export default Api;