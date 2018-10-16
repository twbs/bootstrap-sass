import React from 'react'

export default function Labels () {
  return (
    <div>
      <h4>Labels</h4>
      <span className='label label-default'>Default</span>{' '}
      <a href='javascript:;' className='label label-default'>Link</a>{' '}
      <span className='label label-primary'>Primary</span>{' '}
      <span className='label label-success'>Success</span>{' '}
      <span className='label label-info'>Info</span>{' '}
      <span className='label label-warning'>Warning</span>{' '}
      <span className='label label-danger'>Danger</span>
    </div>
  )
}
