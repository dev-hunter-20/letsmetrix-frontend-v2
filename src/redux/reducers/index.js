import { combineReducers } from 'redux';
import loadingReducer from './status/loading';
import errorReducer from './status/error';
import successReducer from './status/success';
import BlogReducer from './blog/index';
import myAppsReducer from './my-apps/index';
import AuthReducer from './auth/index';
import UserReducer from './user/index';
import uiReducer from '../reducers/ui';

const rootReducer = combineReducers({
  UserReducer,
  uiReducer,
  loadingReducer,
  errorReducer,
  successReducer,
  BlogReducer,
  myAppsReducer,
  AuthReducer,
});

export default rootReducer;
