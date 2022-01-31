import { combineReducers } from 'redux';
import userInfo from './UserInfoReducer';

const rootReducer = combineReducers({
  userInfo,
});

export default rootReducer;
