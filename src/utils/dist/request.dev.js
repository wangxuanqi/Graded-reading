"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetPost = exports.NetGet = void 0;

var _reactNativeAxios = _interopRequireDefault(require("react-native-axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var instance = _reactNativeAxios["default"].create({
  baseURL: 'http://10.0.2.2:3000/api/',
  timeout: 3000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
}); //请求拦截处理


instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); //返回拦截处理

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

var NetPost = function NetPost(api, params) {
  return regeneratorRuntime.async(function NetPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            instance.post(api, params).then(function (res) {
              resolve(res.data);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.NetPost = NetPost;

var NetGet = function NetGet(api, params) {
  return regeneratorRuntime.async(function NetGet$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            instance.get(api, params).then(function (res) {
              resolve(res.data);
            })["catch"](function (error) {
              reject(error);
            });
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.NetGet = NetGet;