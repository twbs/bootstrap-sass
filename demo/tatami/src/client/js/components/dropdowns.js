import React from 'react'

export default function Dropdowns () {
  return (
    <div>
      <h1>Dropdowns</h1>
      <div className='dropdown'>
        <button className='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          Dropdown <span className='caret' />
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
          <li><a href='javascript:;'>New</a></li>
          <li><a href='javascript:;'>Save</a></li>
          <li><a href='javascript:;'>Open in Chrome</a></li>
          <li role='separator' className='divider' />
          <li className='active'><a href='javascript:;'>Active link</a></li>
          <li className='disabled'><a href='javascript:;'>Disabled link</a></li>
        </ul>
      </div>

      <br /><br />

      <div className='dropdown'>
        <button className='btn btn-clear dropdown-toggle' type='button' id='dropdownMenu2'
          tabIndex='0'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          Dropdown <span className='caret' />
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenu2'>
          <li><a href='javascript:;'>New</a></li>
          <li><a href='javascript:;'>Save</a></li>
          <li><a href='javascript:;'>Open in Chrome</a></li>
          <li role='separator' className='divider' />
          <li className='disabled'><a href='javascript:;'>Disabled link</a></li>
        </ul>
      </div>

      <br /><br />

      <div className='btn-group'>
        <button type='button' className='btn btn-danger'>Action</button>
        <button type='button' className='btn btn-danger dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <span className='caret'></span>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <ul className='dropdown-menu'>
          <li><a href='javascript:;'>New</a></li>
          <li><a href='javascript:;'>Save</a></li>
          <li><a href='javascript:;'>Open in Chrome</a></li>
          <li role='separator' className='divider'></li>
          <li><a href='javascript:;'>Delete</a></li>
        </ul>
      </div>
      {' '}
      <div className='btn-group dropup'>
        <button type='button' className='btn btn-default'>Dropup</button>
        <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <span className='caret'></span>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <ul className='dropdown-menu'>
          <li><a href='javascript:;'>Action</a></li>
          <li><a href='javascript:;'>Another action</a></li>
        </ul>
      </div>

      <br /><br />
      <h3>Large size</h3>

      <div className='dropdown'>
        <button className='btn btn-clear btn-lg dropdown-toggle' type='button' id='dropdownMenu2'
          tabIndex='0'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          Dropdown <span className='caret' />
        </button>
        <ul className='dropdown-menu dropdown-menu-lg' aria-labelledby='dropdownMenu2'>
          <li><a href='javascript:;'>New</a></li>
          <li><a href='javascript:;'>Save</a></li>
          <li><a href='javascript:;'>Open in Chrome</a></li>
          <li><a href='javascript:;'>Print</a></li>
          <li><a href='javascript:;'>Share</a></li>
          <li className='dropdown-header'>Header</li>
          <li><a href='javascript:;'>Download</a></li>
          <li><a href='javascript:;'>Delete</a></li>
        </ul>
      </div>

      <br />
      <h3>Auto large</h3>

      <div className='dropdown'>
        <button className='btn btn-clear btn-auto-lg dropdown-toggle' type='button' id='dropdownMenu2'
          tabIndex='0'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          Dropdown <span className='caret' />
        </button>
        <ul className='dropdown-menu dropdown-menu-auto-lg' aria-labelledby='dropdownMenu2'>
          <li><a href='javascript:;'>New</a></li>
          <li><a href='javascript:;'>Save</a></li>
          <li><a href='javascript:;'>Open in Chrome</a></li>
          <li><a href='javascript:;'>Print</a></li>
          <li><a href='javascript:;'>Share</a></li>
          <li className='dropdown-header'>Header</li>
          <li><a href='javascript:;'>Download</a></li>
          <li><a href='javascript:;'>Delete</a></li>
        </ul>
      </div>
    </div>
  )
}
