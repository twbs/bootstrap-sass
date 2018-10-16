/* eslint-env browser */

// const debug = require('../lib/debug')(__filename)

import React, {Component} from 'react'
import Alerts from './alerts'
import Buttons from './buttons'
import Dropdowns from './dropdowns'
import Forms from './forms'
import Labels from './labels'
import Modals from './modals'
import Tooltips from './tooltips'
import Tabs from './tabs'

export default class Sandbox extends Component {
  render () {
    return (
      <div>
        <Buttons />
        <hr />
        <Modals />
        <hr />
        <Tooltips />
        <hr />
        <Alerts />
        <hr />
        <Labels />
        <hr />
        <h4>Card</h4>
        <a href='javascript:;' className='card'>Sample Card Link</a>
        <hr />
        <p><a href='javascript:;'>Here is a text link</a></p>
        <p><button className='btn btn-link'>Button link</button></p>
        <hr />
        <Dropdowns />
        <hr />
        <Forms />
        <hr />
        <Tabs />
      </div>
    )
  }
}
