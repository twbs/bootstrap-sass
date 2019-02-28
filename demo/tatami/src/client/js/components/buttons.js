import React from 'react'

export default function Buttons () {
  return (
    <div>
      <h2>Buttons</h2>
      <div className='single-buttons'>
        <h4>Buttons</h4>
        <button className='btn btn-default'>Default</button>&nbsp;
        <button className='btn btn-primary'>Primary</button>&nbsp;
        <button className='btn btn-warning'>Warning</button>&nbsp;
        <button className='btn btn-danger'>Danger</button>&nbsp;
        <button className='btn btn-clear'>Clear</button>

        <br />
        <br />
        <h4>Link Button</h4>
        <a href='javascript:;' className='btn btn-default'>Default</a>&nbsp;
        <a href='javascript:;' className='btn btn-primary'>Primary</a>&nbsp;
        <a href='javascript:;' className='btn btn-warning'>Warning</a>&nbsp;
        <a href='javascript:;' className='btn btn-danger'>Danger</a>&nbsp;
        <a href='javascript:;' className='btn btn-clear'>Clear</a>

        <br />
        <br />
        <h3>Sizes</h3>

        <h4>Large</h4>
        <button className='btn btn-default btn-lg'>Default</button>&nbsp;
        <button className='btn btn-primary btn-lg'>Primary</button>&nbsp;
        <button className='btn btn-warning btn-lg'>Warning</button>&nbsp;
        <button className='btn btn-danger btn-lg'>Danger</button>&nbsp;
        <button className='btn btn-clear btn-lg'>Clear</button>

        <h4>Small</h4>
        <p>
          <button className='btn btn-default btn-sm'>Default</button>&nbsp;
          <button className='btn btn-primary btn-sm'>Primary</button>
        </p>

        <h4>Extra small</h4>
        <p>
          <button className='btn btn-default btn-xs'>Default</button>&nbsp;
          <button className='btn btn-primary btn-xs'>Primary</button>
        </p>

        <br />
        <h4>Block level button</h4>
        <a href='javascript:;' className='btn btn-default btn-lg btn-block'>Block level button</a>&nbsp;
        <a href='javascript:;' className='btn btn-primary btn-lg btn-block'>Block level button</a>&nbsp;

        <br />
        <br />
        <h3>Disabled state</h3>
        <button className='btn btn-default' disabled>
          Default
        </button>
        &nbsp;
        <button className='btn btn-primary' disabled>
          Primary
        </button>
        &nbsp;
        <button className='btn btn-warning' disabled>
          Warning
        </button>
        &nbsp;
        <button className='btn btn-danger' disabled>
          Danger
        </button>
        &nbsp;
        <button className='btn btn-clear' disabled>
          Clear
        </button>
      </div>
    </div>
  )
}
