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

      <br />
      <br />
      <h3>Button groups</h3>
      <div className='btn-group' role='group' aria-label='...'>
        <button type='button' className='btn btn-default active'>Left</button>
        <button type='button' className='btn btn-default'>Middle</button>
        <button type='button' className='btn btn-default'>Right</button>
      </div>

      <h4>Vertical</h4>
      <div className='btn-group-vertical' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>One</button>
        <button type='button' className='btn btn-default'>Two</button>
        <button type='button' className='btn btn-default'>Three</button>
        <div className='btn-group' role='group' aria-label='...'>
          <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Dropdown{' '}
            <span className='caret'></span>
          </button>
          <ul className='dropdown-menu'>
            <li><a href='#'>Dropdown link</a></li>
            <li><a href='#'>Dropdown link</a></li>
          </ul>
        </div>
        <button type='button' className='btn btn-default'>Four</button>
      </div>

      <h4>Toolbar</h4>
      <div className='btn-toolbar' role='toolbar' aria-label='...'>
        <div className='btn-group' role='group' aria-label='...'>
          <button type='button' className='btn btn-default'>1</button>
          <button type='button' className='btn btn-default'>2</button>
          <button type='button' className='btn btn-default'>3</button>
        </div>
        <div className='btn-group' role='group' aria-label='...'>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              Dropdown{' '}
              <span className='caret'></span>
            </button>
            <ul className='dropdown-menu'>
              <li><a href='#'>Dropdown link</a></li>
              <li><a href='#'>Dropdown link</a></li>
            </ul>
          </div>
          <button type='button' className='btn btn-default'>4</button>
          <button type='button' className='btn btn-default'>5</button>
          <button type='button' className='btn btn-default'>6</button>
        </div>
      </div>

      <h4>Small size</h4>
      <div className='btn-group btn-group-sm' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>Left</button>
        <button type='button' className='btn btn-default'>Middle</button>
        <button type='button' className='btn btn-default'>Right</button>
      </div>

      <h4>Justified</h4>
      <div className='btn-group btn-group-justified' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>Left</button>
        <button type='button' className='btn btn-default'>Middle</button>
        <button type='button' className='btn btn-default'>Right</button>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Dropdown{' '}
            <span className='caret'></span>
          </button>
          <ul className='dropdown-menu'>
            <li><a href='#'>Dropdown link</a></li>
            <li><a href='#'>Dropdown link</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
