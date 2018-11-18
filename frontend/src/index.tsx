import { createStore, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
// import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
// import * as promise from 'redux-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import thunk from 'redux-thunk';

import ALL_REDUCERS from './reducers/index';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const logger = createLogger();
const store = createStore(
  ALL_REDUCERS,
  compose(
    // tslint:disable-next-line:no-string-literal
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
    // applyMiddleware(thunk),
  )
);

ReactDOM.render(
  <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
