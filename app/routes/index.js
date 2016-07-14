import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout'
import HomePage from './HomePage'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomePage} />
  </Route>
)
