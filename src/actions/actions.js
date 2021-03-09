// actions.js
import {
  SET_LOGIN_STATE,
  GET_ALL_MOMENTS,
  INSERT_COMMENT,
  THUMBS_UP_MOMENT,
} from './actionsTypes';
import {NetGet} from '../utils/request';

const setLoginState = (val) => ({
  type: SET_LOGIN_STATE,
  val: val,
});

const getAllMoments = (token) => {
  return (dispatch) => {
    NetGet('/moment', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch(fetchingData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchingData = (val) => {
  return {
    type: GET_ALL_MOMENTS,
    val,
  };
};

const insertComment = (val) => {
  return {
    type: INSERT_COMMENT,
    val,
  };
};

const thumbsUpMoment = (val) => {
  return {
    type: THUMBS_UP_MOMENT,
    val,
  };
};

export {setLoginState, getAllMoments, insertComment, thumbsUpMoment};
