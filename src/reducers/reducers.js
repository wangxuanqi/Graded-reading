// reducers.js

import {combineReducers} from 'redux';
import {
  SET_LOGIN_STATE,
  GET_ALL_MOMENTS,
  INSERT_COMMENT,
  THUMBS_UP_MOMENT,
} from '../actions/actionsTypes';

function loginState(state = {}, action) {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {...state, ...action.val};
    default:
      return state;
  }
}

function moment(state = {}, action) {
  switch (action.type) {
    case GET_ALL_MOMENTS:
      return {...state, allMoments: action.val};
    case INSERT_COMMENT:
      return {
        ...state,
        allMoments: updateAllMoments(
          state.allMoments,
          action.val,
          'commentUsers',
        ),
      };
    case THUMBS_UP_MOMENT:
      return {
        ...state,
        allMoments: updateAllMoments(state.allMoments, action.val, 'thumbsUp'),
      };
    default:
      return state;
  }
}

function updateAllMoments(allMoments, val, property) {
  const index = allMoments.findIndex((item) => {
    return item._id === val._id;
  });

  allMoments[index][property] = val[property];
  return allMoments;
}

export default combineReducers({
  loginState,
  moment,
});
