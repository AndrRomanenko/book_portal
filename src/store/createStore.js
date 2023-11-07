import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducer'

const middlewares = [thunk]

const logger = createLogger({
  collapsed: true,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export default () => {
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
  return { store }
}
