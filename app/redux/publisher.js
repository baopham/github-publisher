import * as Github from '../utils/api'

// ------------------------------------
// Constants
// ------------------------------------

// Statuses
export const PUBLISHING_STATUS = 'PUBLISHING_STATUS'

export const PUBLISHED_STATUS = 'PUBLISHED_STATUS'

export const ERROR_STATUS = 'ERROR_STATUS'

// Actions
const PUBLISHING = 'GHPUB/PUBLISHER/PUBLISHING'

const PUBLISHED = 'GHPUB/PUBLISHER/PUBLISHED'

const ERROR = 'GHPUB/PUBLISHER/ERROR'

// ------------------------------------
// Action Creators
// ------------------------------------

const publish = (path, content, codeMode) => {
  return (dispatch, getState) => {
    dispatch(publishing())
    Github.publishContent(path, content, codeMode)
      .then((data) => dispatch(published(path, content, codeMode)))
      .catch((err) => dispatch(error(err)))
  }
}

const publishing = () => ({ type: PUBLISHING })

const published = (path, content, codeMode) => ({ type: PUBLISHED, path, content, codeMode })

const error = () => ({ type: ERROR })

export const actions = {
  publish
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  path: '',
  content: '',
  status: null,
  codeMode: 'html'
}

const actionHandlers = {
  [PUBLISHING]: (state) => ({ ...state, status: PUBLISHING_STATUS }),

  [PUBLISHED]: (state, { path, content, codeMode }) => ({
    ...initialState,
    path,
    content,
    codeMode,
    status: PUBLISHED_STATUS
  }),

  [ERROR]: (state) => ({ ...state, status: ERROR_STATUS })
}

export default function reducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}
