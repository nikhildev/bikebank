// import { createLogger } from 'redux-logger';
// import * as promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

import ALL_REDUCERS from './reducers/index';

// const logger = createLogger();
const store = createStore(
  ALL_REDUCERS,
  compose(
    // tslint:disable-next-line:no-string-literal
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
    applyMiddleware(thunk),
  )
);

export default store;