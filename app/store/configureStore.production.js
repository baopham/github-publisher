import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { middleware as storageMiddleware } from './storage'
import rootReducer from '../redux'

const router = routerMiddleware(hashHistory)

const enhancer = applyMiddleware(thunk, storageMiddleware, router)

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
