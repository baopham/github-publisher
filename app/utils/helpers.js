export function serialize (params = {}) {
  return Object.keys(params).map(
    (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
  ).join('&')
}

export function checkResponseStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    console.error(response)
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function getUsername (user) {
  return user ? user.login : ''
}

export function getRepoName (user) {
  return `${getUsername(user)}.github.io`
}

const re = /(?:\.([^.]+))?$/

export function getExt (path) {
  return re.exec(path)[1]
}

export function getUrl (user, path) {
  if (path.length && !getExt(path)) {
    path += '/'
  }

  path = `https://${getRepoName(user)}/${path}`

  if (path.endsWith('//') && path.charAt(path.length - 1) === '/') {
    path = path.slice(0, -1)
  }

  return path
}
