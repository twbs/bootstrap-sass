import React from 'react'

export default function Dropdowns () {
  return (
    <div>
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
        <button className='btn btn-flat dropdown-toggle' type='button' id='dropdownMenu2'
          tabindex='0'
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

    </div>
  )
}
