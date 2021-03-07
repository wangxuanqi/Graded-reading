"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reducers = _interopRequireDefault(require("../reducers/reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// store.js
var configureStore = function configureStore(preloadedState) {
  return (0, _redux.createStore)(_reducers["default"], preloadedState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxLogger["default"])));
};

var store = configureStore();
var _default = store;
exports["default"] = _default;