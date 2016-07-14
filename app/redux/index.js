import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import auth, { LOG_OUT } from './auth'
import githubIO from './github-io'
import publisher from './publisher'
import setupStep from './setup-step'

export const appReducer = combineReducers({
  routing,
  auth,
  githubIO,
  publisher,
  setupStep
})

export default (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined
  }

  return appReducer(state, action)
}
