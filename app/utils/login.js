import electron from 'electron'
import { serialize, checkResponseStatus } from './helpers'
import { CLIENT_ID, CLIENT_SECRET, SCOPE } from './constants'

export function authenticate (onSuccess, onError) {
  const authWindow = new electron.remote.BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      nodeIntegration: false
    }
  })

  const baseUrl = 'https://github.com/login/oauth/authorize'

  const params = {
    client_id: CLIENT_ID,
    scope: SCOPE
  }

  const authUrl = `${baseUrl}?${serialize(params)}`

  authWindow.loadURL(authUrl)

  authWindow.on('close', () => {
    authWindow.destroy()
  })

  authWindow.webContents.on('will-navigate', (event, url) => {
    handleCallback(authWindow, url, onSuccess, onError)
  })

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    handleCallback(authWindow, newUrl, onSuccess, onError)
  })
}

function requestToken (code, onSuccess, onError) {
  const url = 'https://github.com/login/oauth/access_token'

  const options = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code
    })
  }

  return fetch(url, options)
    .then(checkResponseStatus)
    .then(response => response.json())
    .then(data => onSuccess(data.access_token))
    .catch(error => onError(error.error_description || 'Something went wrong. Please try again later.'))
}

function handleCallback (authWindow, url, onSuccess, onError) {
  const rawCode = /code=([^&]*)/.exec(url) || null
  const code = (rawCode && rawCode.length > 1) ? rawCode[1] : null
  const error = /\?error=(.+)$/.exec(url)

  if (code || error) {
    authWindow.destroy()
  }

  if (code) {
    requestToken(code, onSuccess, onError)
  } else if (error) {
    alert('Oops! Something went wrong and we couldn\'t ' +
          'log you in using Github. Please try again.')
  }
}

