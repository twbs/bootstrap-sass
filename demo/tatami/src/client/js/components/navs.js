import React from 'react'

export default function Navs () {
  return (
    <div>
      <h2>Navs</h2>

      <h4>Tabs</h4>
      <div>
        <ul className='nav nav-tabs' role='tablist'>
          <li role='presentation' className='active'><a href='#home' aria-controls='home' role='tab' data-toggle='tab'>Home</a></li>
          <li role='presentation'><a href='#profile' aria-controls='profile' role='tab' data-toggle='tab'>Profile</a></li>
        </ul>
        <div className='tab-content'>
          <div role='tabpanel' className='tab-pane active' id='home'>
            <br />
            this is home...
          </div>
          <div role='tabpanel' className='tab-pane' id='profile'>
            <br />
            this is profile...
          </div>
        </div>
      </div>

      <br />
      <br />

      <h4>Pills</h4>
      <ul className='nav nav-pills'>
        <li role='presentation' className='active'><a href='javascript:;'>Home</a></li>
        <li role='presentation'><a href='javascript:;'>Profile</a></li>
        <li role='presentation'><a href='javascript:;'>Messages</a></li>
        <li role='presentation' className='dropdown'>
          <a className='dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>
            Dropdown <span className='caret'></span>
          </a>
          <ul className='dropdown-menu'>
            <li><a href='javascript:;'>Action</a></li>
            <li><a href='javascript:;'>Another action</a></li>
          </ul>
        </li>
      </ul>

      <br />
      <br />

      <h4>Stacked pills</h4>
      <ul className='nav nav-pills nav-stacked'>
        <li role='presentation' className='active'><a href='javascript:;'>Home</a></li>
        <li role='presentation' className='disabled'><a href='javascript:;'>Profile</a></li>
        <li role='presentation'><a href='javascript:;'>Messages</a></li>
      </ul>

      <br />
      <br />

      <h4>Justified</h4>
      <ul className='nav nav-tabs nav-justified' role='tablist'>
        <li role='presentation' className='active'><a href='#home' aria-controls='home' role='tab' data-toggle='tab'>Home</a></li>
        <li role='presentation'><a href='#profile' aria-controls='profile' role='tab' data-toggle='tab'>Profile</a></li>
        <li role='presentation'><a href='#messages' aria-controls='profile' role='tab' data-toggle='tab'>Messages</a></li>
      </ul>
      <br />
      <ul className='nav nav-pills nav-justified'>
        <li role='presentation' className='active'><a href='javascript:;'>Home</a></li>
        <li role='presentation'><a href='javascript:;'>Profile</a></li>
        <li role='presentation'><a href='javascript:;'>Messages</a></li>
      </ul>

    </div>
  )
}
