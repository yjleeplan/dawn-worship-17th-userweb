import * as types from '../constants';

const initialState = {
  userInfo: {},
};

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default UserInfoReducer;