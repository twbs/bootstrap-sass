import React, {Component} from 'react'
import Sandbox from './sandbox'
import NavbarSample from './navbar-sample'

export default class App extends Component {
  render () {
    return (
      <div>
        <NavbarSample />
        <div className='container' id='cont'>
          <h1>
            <img src='./public/assets/img/skelton.svg' alt='logo' className='logoimg' width='50' />
            Hello, touch device friendly UI components
          </h1>
          <Sandbox />
          <hr />
          url: {window.location.href}<br />
          <br />
          Welcome to service worker skelton app!
        </div>
      </div>
    )
  }
}
