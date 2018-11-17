import { combineReducers } from 'redux';
import AuthReducer from './auth';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
const ALL_REDUCERS = combineReducers({
  auth: AuthReducer,
});

export default ALL_REDUCERS;