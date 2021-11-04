import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';

// reducer that will handle all ui
const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

export default reducers;
