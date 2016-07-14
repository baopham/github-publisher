// ------------------------------------
// Constants
// ------------------------------------

export const STEP_LOGIN = 0
export const STEP_CHECK_REPO = 1
export const STEP_CREATE_REPO = 2
export const STEP_CREATED_REPO = 3
export const STEP_REPO_READY = 4

// Actions
const LOGIN = 'GHPUB/SETUP_STEP/LOGIN'
const CHECK_REPO = 'GHPUB/SETUP_STEP/CHECK_REPO'
const CREATE_REPO = 'GHPUB/SETUP_STEP/CREATE_REPO'
const REPO_CREATED = 'GHPUB/SETUP_STEP/REPO_CREATED'
const REPO_READY = 'GHPUB/SETUP_STEP/REPO_READY'
const ERROR = 'GHPUB/SETUP_STEP/ERROR'

// ------------------------------------
// Action Creators
// ------------------------------------

const stepLogin = () => ({ type: LOGIN })

const stepCheckRepo = () => ({ type: CHECK_REPO })

const stepCreateRepo = () => ({ type: CREATE_REPO })

const stepRepoCreated = () => ({ type: REPO_CREATED })

const stepRepoReady = () => ({ type: REPO_READY })

const stepError = () => ({ type: ERROR })

export const actions = {
  stepLogin,
  stepCheckRepo,
  stepCreateRepo,
  stepRepoCreated,
  stepRepoReady,
  stepError
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  step: STEP_LOGIN,
  error: false
}

const actionHandlers = {
  [LOGIN]: (state) => ({ ...initialState, step: STEP_LOGIN }),

  [CHECK_REPO]: (state) => ({ ...initialState, step: STEP_CHECK_REPO }),

  [CREATE_REPO]: (state) => ({ ...initialState, step: STEP_CREATE_REPO }),

  [REPO_CREATED]: (state) => ({ ...initialState, step: STEP_CREATED_REPO }),

  [REPO_READY]: (state) => ({ ...initialState, step: STEP_REPO_READY }),

  [ERROR]: (state) => ({ ...state, error: true })
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
