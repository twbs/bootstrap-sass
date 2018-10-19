import React from 'react'

export default function Labels () {
  return (
    <div>
      <h2>Labels</h2>
      In the text <span className='label label-default'>Default</span>{' '}
      <span className='label label-primary'>Primary</span>{' '}
      <span className='label label-success'>Success</span>{' '}
      <span className='label label-info'>Info</span>{' '}
      <span className='label label-warning'>Warning</span>{' '}
      <span className='label label-danger'>Danger</span>

      <br />
      <br />

      <h4>As links</h4>
      In the text <a href='javascript:;' className='label label-default'>Default</a>{' '}
      <a href='javascript:;' className='label label-primary'>Primary</a>{' '}
      <a href='javascript:;' className='label label-success'>Success</a>{' '}
      <a href='javascript:;' className='label label-info'>Info</a>{' '}
      <a href='javascript:;' className='label label-warning'>Warning</a>{' '}
      <a href='javascript:;' className='label label-danger'>Danger</a>
    </div>
  )
}
