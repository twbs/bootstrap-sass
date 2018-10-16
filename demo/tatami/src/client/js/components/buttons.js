import React from 'react'

export default function Buttons () {
  return (
    <div>
      <h4>Buttons</h4>
      <button className='btn btn-default'>Default</button>&nbsp;
      <button className='btn btn-primary'>Primary</button>&nbsp;
      <button className='btn btn-danger'>Danger</button>&nbsp;
      <button className='btn btn-flat'>Flat</button>

      <br />
      <br />
      <h4>Link Button</h4>
      <a href='javascript:;' className='btn btn-default'>Default</a>&nbsp;
      <a href='javascript:;' className='btn btn-primary'>Primary</a>&nbsp;
      <a href='javascript:;' className='btn btn-danger'>Danger</a>&nbsp;
      <a href='javascript:;' className='btn btn-flat'>Flat</a>

      <br />
      <br />
      <h4>Size</h4>
      <p>
        <button className='btn btn-primary btn-lg'>Large button</button>&nbsp;
        <button className='btn btn-default btn-lg'>Large button</button>
      </p>
      <p>
        <button className='btn btn-primary'>Default button</button>&nbsp;
        <button className='btn btn-default'>Default button</button>
      </p>
      <p>
        <button className='btn btn-primary btn-sm'>Small button</button>&nbsp;
        <button className='btn btn-default btn-sm'>Small button</button>
      </p>
      <p>
        <button className='btn btn-primary btn-xs'>Extra small button</button>&nbsp;
        <button className='btn btn-default btn-xs'>Extra small button</button>
      </p>

      <br />
      <br />
      <h4>Disabled</h4>
      <button className='btn btn-default' disabled>
        Default
      </button>
      &nbsp;
      <button className='btn btn-primary' disabled>
        Primary
      </button>
      &nbsp;
      <button className='btn btn-danger' disabled>
        Danger
      </button>
    </div>
  )
}
