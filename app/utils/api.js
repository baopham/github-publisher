import { serialize, checkResponseStatus, getUsername, getRepoName } from './helpers'

const BASE_URL = 'https://api.github.com'

// ------------------------------------
// Storage
// ------------------------------------

let token, user

export const setToken = (t) => (token = t)

export const setUser = (u) => (user = u)

export const reset = () => {
  token = null
  user = null
}

// ------------------------------------
// API
// ------------------------------------

export function getUser () {
  return get('/user')
}

export function getGithubIORepo () {
  return get(`/repos/${username()}/${repo()}`)
}

export function createGithubIORepo () {
  return post('/user/repos', {
    name: repo(),
    homepage: `https://${repo()}`,
    auto_init: true
  })
}

export function checkMasterBranch () {
  return get(`/repos/${username()}/${repo()}/branches/master`)
}

export function createMasterBranch () {
}

export function publishContent (path, content, codeMode) {
  if (codeMode.toLowerCase() === 'html') {
    path = getHtmlPath(path)
  }

  return checkFile(path)
          .then((data) => createOrUpdateFile(path, content, data.sha))
          .catch(() => createOrUpdateFile(path, content))
}

export function createOrUpdateFile (path, content, sha) {
  return put(`/repos/${username()}/${repo()}/contents/${path}`, {
    message: 'Publish by Github Publisher',
    content: btoa(content),
    sha: sha
  })
}

export function checkFile (path) {
  return get(`/repos/${username()}/${repo()}/contents/${path}`)
}

// ------------------------------------
// Helpers
// ------------------------------------

function repo () {
  return getRepoName(user)
}

function username () {
  return getUsername(user)
}

function getHtmlPath (path) {
  path = path.trim()

  if (!path.length) {
    return 'index.html'
  }

  if (path.charAt(path.length - 1) === '/') {
    path = path.slice(0, -1)
  }

  if (!path.endsWith('.html')) {
    path += '/index.html'
  }

  return path
}

function request (method, url, params) {
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-GitHub-Media-Type': 'application/vnd.github.v3+json',
      'Authorization': `token ${token}`
    }
  }

  url = `${BASE_URL}${url}`

  if (method.toLowerCase() !== 'get') {
    options.body = JSON.stringify(params)
  } else {
    url = `${url}?${serialize(params)}`
  }

  return fetch(url, options)
      .then(checkResponseStatus)
      .then(response => response.json())
}

const put = (url, params) => request('put', url, params)

const post = (url, params) => request('post', url, params)

const get = (url, params) => request('get', url, params)
