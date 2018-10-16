/* eslint-env browser */

import 'babel-polyfill'
if (location.pathname !== '/default.html') {
  require('focus-visible')
}
import React from 'react'
import {render} from 'react-dom'

import App from './components/app'

const appContainer = document.getElementById('app-container')
if (appContainer) {
  render((<App />), appContainer)
}
