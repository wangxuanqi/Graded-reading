import axios from 'react-native-axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:3000/api/',
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'},
});

//请求拦截处理
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

//返回拦截处理
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

const NetPost = async (api, params, config) => {
  return new Promise((resolve, reject) => {
    instance
      .post(api, params, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const NetGet = async (api, config) => {
  return new Promise((resolve, reject) => {
    instance
      .get(api, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {NetGet, NetPost};
