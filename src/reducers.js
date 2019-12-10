/**
 *  Import node modules
 */
import { combineReducers } from 'redux-immutable';
/**
 *  Import reducers
 *  All reducers used in the app must be declared here!
 */
import authReducer from './modules/auth/reducer';

/**
 *  Combine the reducers
 */
const reducers = combineReducers({
  auth: authReducer
});

/**
 *  Export the combined reducers
 */
export default reducers;
