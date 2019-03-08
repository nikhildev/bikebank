import { ConnectedRouter } from "connected-react-router"
import { Provider } from "react-redux"
import * as React from "react"
import * as ReactDOM from "react-dom"

import App from "./App"
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"
import configureStore, { history } from "./store"

export const store = configureStore({})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)

registerServiceWorker()
