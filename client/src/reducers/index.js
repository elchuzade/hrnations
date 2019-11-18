import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import jobReducer from './jobReducer';
import applicantReducer from './applicantReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  jobs: jobReducer,
  applicants: applicantReducer
});
