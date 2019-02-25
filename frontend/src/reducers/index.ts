import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import UserReducer from './user';
import BikeReducer from './bikes';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: UserReducer,
    bikes: BikeReducer,
  });
