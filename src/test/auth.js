const axios = require('react-native-axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
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

const NetPost = async (api, params) => {
  return new Promise((resolve, reject) => {
    instance
      .post(api, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const NetGet = async (api, params) => {
  return new Promise((resolve, reject) => {
    instance
      .post(api, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

NetPost('/auth/login', {
  password: '1325134625',
  email: '763827359@qq.com',
})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
