import * as Github from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

// Statuses
export const RETRIEVING = 'RETRIEVING'
export const FOUND = 'FOUND'
export const ERROR = 'ERROR'
export const CREATING = 'CREATING'
export const CREATED = 'CREATED'

// Actions
const RETRIEVING_REPO = 'GHPUB/GITHUB_IO/RETRIEVING_REPO'

const RETRIEVED_REPO = 'GHPUB/GITHUB_IO/RETRIEVED_REPO'

const REPO_NOT_FOUND = 'GHPUB/GITHUB_IO/REPO_NOT_FOUND'

const CREATING_REPO = 'GHPUB/GITHUB_IO/CREATING_REPO'

const CREATED_REPO = 'GHPUB/GITHUB_IO/CREATED_REPO'

const FAILED_TO_CREATE_REPO = 'GHPUB/GITHUB_IO/FAILED_TO_CREATE_REPO'

// ------------------------------------
// Action Creators
// ------------------------------------

const checkRepo = (onSuccess, onError) => {
  return (dispatch, getState) => {
    dispatch(retrievingRepo())

    Github.getGithubIORepo()
      .then((data) => {
        onSuccess(data)
        dispatch(retrievedRepo(data))
      })
      .catch((err) => {
        onError(err)
        dispatch(repoNotFound())
      })
  }
}

const createRepo = (onSuccess, onError) => {
  return (dispatch, getState) => {
    dispatch(creatingRepo())

    Github.createGithubIORepo()
      .then((data) => {
        onSuccess(data)
        dispatch(createdRepo(data))
      })
      .catch((err) => {
        onError(err)
        dispatch(failedToCreateRepo())
      })
  }
}

const checkMasterBranch = (onSuccess, onError) => {
  return (dispatch, getState) => {
    Github.checkMasterBranch()
      .then((data) => onSuccess(data))
      .catch((err) => {
        onError(err)
        dispatch(error())
      })
  }
}

const retrievingRepo = () => ({ type: RETRIEVING_REPO })

const repoNotFound = () => ({ type: REPO_NOT_FOUND })

const retrievedRepo = (repo) => ({ type: RETRIEVED_REPO, repo })

const creatingRepo = () => ({ type: CREATING_REPO })

const createdRepo = (repo) => ({ type: CREATED_REPO, repo })

const failedToCreateRepo = () => ({ type: FAILED_TO_CREATE_REPO })

const error = () => ({ type: ERROR })

export const actions = {
  checkRepo,
  createRepo,
  checkMasterBranch
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  status: null,
  repo: null
}

const actionHandlers = {
  [RETRIEVING_REPO]: (state) => ({ ...state, status: RETRIEVING }),

  [RETRIEVED_REPO]: (state, { repo }) => ({ ...state, repo, status: FOUND }),

  [ERROR]: (state) => ({ ...state, status: ERROR }),

  [CREATING_REPO]: (state) => ({ ...state, status: CREATING }),

  [CREATED_REPO]: (state, { repo }) => ({ ...state, repo, status: CREATED })
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}

