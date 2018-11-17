import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
// import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
// import * as promise from 'redux-promise';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import thunk from 'redux-thunk';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const logger = createLogger();
const store = createStore(
  // allReducers,
  // tslint:disable-next-line:no-string-literal
  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__'](),
  // applyMiddleware(thunk, promise, logger)
);

ReactDOM.render(
  <BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
