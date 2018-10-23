/* eslint-env browser */

import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import './lib/use-focus'
// import 'what-input'

import App from './components/app'

const appContainer = document.getElementById('app-container')
if (appContainer) {
  render((<App />), appContainer)
}
