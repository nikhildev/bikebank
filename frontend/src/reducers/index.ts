import { combineReducers } from 'redux';
import UserReducer from './user';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
const ALL_REDUCERS = combineReducers({
  user: UserReducer,
});

export default ALL_REDUCERS;