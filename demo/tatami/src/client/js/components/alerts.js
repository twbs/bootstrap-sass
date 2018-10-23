import React from 'react'

export default function Alerts () {
  return (
    <div>
      <h2>Alerts</h2>
      <div className='alert alert-dismissible alert-success' role='alert'>
        Well done!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='alert alert-dismissible alert-info' role='alert'>
        Heads up!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
      <div className='alert alert-warning' role='alert'>
        Warning!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
      </div>
      <div className='alert alert-danger' role='alert'>
        Oh snap!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
      </div>
    </div>
  )
}
