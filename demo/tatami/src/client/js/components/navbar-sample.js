import React from 'react'

export default function NavbarSample () {
  return (
    <nav className='navbar navbar-inverse navbar-fixed-top'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar' />
            <span className='icon-bar' />
            <span className='icon-bar' />
          </button>
          <a className='navbar-brand' href='javascript:;'>Tatami</a>
        </div>

        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li className='active'><a href='javascript:;'>Link <span className='sr-only'>(current)</span></a></li>
            <li><a href='javascript:;'>Link</a></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Dropdown <span className='caret' /></a>
              <ul className='dropdown-menu'>
                <li><a href='javascript:;'>Action</a></li>
                <li><a href='javascript:;'>Another action</a></li>
                <li><a href='javascript:;'>Something else here</a></li>
                <li role='separator' className='divider' />
                <li className='active'><a href='javascript:;'>Active link</a></li>
                <li className='disabled'><a href='javascript:;'>Disabled link</a></li>
              </ul>
            </li>
          </ul>
          <form className='navbar-form navbar-left'>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='Search' />
            </div>
            <button type='submit' className='btn btn-default'>Submit</button>
          </form>
          <ul className='nav navbar-nav navbar-right'>
            <li><a href='javascript:;'>Link</a></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>Dropdown <span className='caret' /></a>
              <ul className='dropdown-menu'>
                <li><a href='javascript:;'>Action</a></li>
                <li><a href='javascript:;'>Another action</a></li>
                <li><a href='javascript:;'>Something else here</a></li>
                <li role='separator' className='divider' />
                <li className='active'><a href='javascript:;'>Active link</a></li>
                <li className='disabled'><a href='javascript:;'>Disabled link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}
