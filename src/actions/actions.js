// actions.js
import {
  SET_LOGIN_STATE,
  GET_ALL_MOMENTS,
  INSERT_COMMENT,
  THUMBS_UP_MOMENT,
  GET_CLOCK_INFO,
} from './actionsTypes';
import {NetGet, NetPost} from '../utils/request';

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
        dispatch(fetchingMomentData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getClockInfo = (token) => {
  return (dispatch) => {
    NetGet('/clock', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        dispatch(fetchingClockData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateClockInfo = (token, param) => {
  console.log(param);
  return (dispatch) => {
    NetPost(
      '/clock',
      {...param},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((res) => {
        dispatch(fetchingClockData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchingMomentData = (val) => {
  return {
    type: GET_ALL_MOMENTS,
    val,
  };
};

const fetchingClockData = (val) => {
  return {
    type: GET_CLOCK_INFO,
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

export {
  setLoginState,
  getAllMoments,
  insertComment,
  thumbsUpMoment,
  getClockInfo,
  updateClockInfo,
};
