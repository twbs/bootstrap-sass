import React from 'react'

export default function Dropdowns () {
  return (
    <div>
      <h2>Dropdowns</h2>
      <div className='dropdown'>
        <button className='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          Dropdown <span className='caret' />
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenu1'>
          <li><a href='javascript:;'>Action</a></li>
          <li><a href='javascript:;'>Another action</a></li>
          <li><a href='javascript:;'>Something else here</a></li>
          <li role='separator' className='divider' />
          <li className='active'><a href='javascript:;'>Active link</a></li>
          <li className='disabled'><a href='javascript:;'>Disabled link</a></li>
        </ul>
      </div>
      <hr />
      <div className='dropdown'>
        <button className='btn btn-clear dropdown-toggle' type='button' id='dropdownMenu2'
          tabIndex='0'
          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          Dropdown <span className='caret' />
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenu2'>
          <li><a href='javascript:;'>Action</a></li>
          <li><a href='javascript:;'>Another action</a></li>
          <li><a href='javascript:;'>Something else here</a></li>
          <li role='separator' className='divider' />
          <li className='active'><a href='javascript:;'>Active link</a></li>
          <li className='disabled'><a href='javascript:;'>Disabled link</a></li>
        </ul>
      </div>

      <br />
      <br />

      <div className='btn-group'>
        <button type='button' className='btn btn-danger'>Action</button>
        <button type='button' className='btn btn-danger dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <span className='caret'></span>
          <span className='sr-only'>Toggle Dropdown</span>
        </button>
        <ul className='dropdown-menu'>
          <li><a href='#'>Action</a></li>
          <li><a href='#'>Another action</a></li>
          <li><a href='#'>Something else here</a></li>
          <li role='separator' className='divider'></li>
          <li><a href='#'>Separated link</a></li>
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
          <li><a href='#'>Action</a></li>
          <li><a href='#'>Another action</a></li>
        </ul>
      </div>
    </div>
  )
}
