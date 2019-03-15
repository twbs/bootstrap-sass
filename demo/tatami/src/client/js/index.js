/* eslint-env browser */

import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'

import '@notainc/key-focus-visible'
import '@notainc/mouse-hover-visible'
// import 'what-input'

import './lib/setup-os'

import App from './components/app'

const appContainer = document.getElementById('app-container')
if (appContainer) {
  render((<App />), appContainer)
}
