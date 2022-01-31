import * as types from '../constants';

export const setUserInfo = userInfo => ({
  type: types.SET_USER_INFO,
  payload: userInfo
});