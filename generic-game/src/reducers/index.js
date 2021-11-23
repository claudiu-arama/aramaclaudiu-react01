import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';

// reducer that will handle all ui
const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
});

export default reducers;
