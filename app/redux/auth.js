import * as Github from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

// Actions
export const LOG_OUT = 'GHPUB/AUTH/LOG_OUT'
const FOUND_USER = 'GHPUB/AUTH/FOUND_USER'
const ERROR = 'GHPUB/AUTH/ERROR'

export const LOGGED_OUT = 'LOGGED_OUT'
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGING_IN = 'LOGGING_IN'

// ------------------------------------
// Action Creators
// ------------------------------------

const login = (token) => {
  Github.setToken(token)

  return (dispatch, getState) => (
    Github.getUser()
      .then(data => dispatch(foundUser(token, data)))
      .catch(err => {
        dispatch(error(err))
        dispatch(logout())
      })
  )
}

const logout = () => {
  Github.reset()

  return {
    type: LOG_OUT
  }
}

const foundUser = (token, user) => {
  Github.setUser(user)

  return {
    type: FOUND_USER,
    token,
    user
  }
}

const error = () => ({ type: ERROR })

export const actions = {
  login,
  logout
}

// ------------------------------------
// Reducer
// ------------------------------------

const actionHandlers = {
  [LOG_OUT]: (state, { token }) => ({ ...state, user: null, status: LOGGED_OUT }),

  [FOUND_USER]: (state, { token, user }) => ({ ...state, user: { ...user, token }, status: LOGGED_IN }),

  [ERROR]: (state) => ({ ...state, error: true })
}

const initialState = {
  user: null,
  status: LOGGED_OUT,
  error: false
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
