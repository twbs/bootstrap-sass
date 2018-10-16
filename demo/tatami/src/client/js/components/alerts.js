import React from 'react'

export default function Alerts () {
  return (
    <div>
      <h4>Alerts</h4>
      <div className='alert alert-success' role='alert'>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
        Well done!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
      </div>
      <div className='alert alert-info' role='alert'>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
        Heads up!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
      </div>
      <div className='alert alert-warning' role='alert'>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
        Warning!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
      </div>
      <div className='alert alert-danger' role='alert'>
        <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
        Oh snap!
        {' '}
        <a href='javascript:;' className='alert-link'>Link</a>
      </div>
    </div>
  )
}
