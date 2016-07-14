import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { middleware as storageMiddleware } from './storage'
import rootReducer from '../redux'

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const router = routerMiddleware(hashHistory)

const enhancer = compose(
  applyMiddleware(thunk, storageMiddleware, router, logger),
  window.devToolsExtension ? window.devToolsExtension() : noop => noop
)

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../redux', () =>
      store.replaceReducer(require('../redux')) // eslint-disable-line global-require
    )
  }

  return store
}
