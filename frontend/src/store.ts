// import { createLogger } from 'redux-logger';
// import * as promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      // tslint:disable-next-line:no-string-literal
      window['__REDUX_DEVTOOLS_EXTENSION__'] &&
        window['__REDUX_DEVTOOLS_EXTENSION__'](),
      applyMiddleware(thunk, routerMiddleware(history)),
    ),
  );

  return store;
}
