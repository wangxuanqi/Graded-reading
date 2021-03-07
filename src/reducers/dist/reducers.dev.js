"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _actionsTypes = require("../actions/actionsTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 原始默认state
var defaultState = {
  userlist: [{
    id: '001',
    name: '路人甲',
    sex: '女',
    age: 27
  }, {
    id: '002',
    name: '路人乙',
    sex: '女',
    age: 31
  }, {
    id: '003',
    name: '路人丙',
    sex: '男',
    age: 45
  }]
};

function user() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState.userlist;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionsTypes.CHANGE_NAME:
      return state.map(function (item) {
        return item.id === action.id ? _objectSpread({}, item, {
          name: action.name
        }) : item;
      });

    default:
      return state;
  }
}

var _default = (0, _redux.combineReducers)({
  user: user
});

exports["default"] = _default;