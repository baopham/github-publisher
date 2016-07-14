import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import AppContainer from './containers/AppContainer'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import { load as loadStorage } from './store/storage'
import './app.global.css'

require('react-tap-event-plugin')()

// ------------------------------------
// Store
// ------------------------------------

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

loadStorage(store)
  .catch(() => console.error('cannot load previous state'))

// ------------------------------------
// Render
// ------------------------------------

const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index')

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

render()
