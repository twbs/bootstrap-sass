import React from 'react'
import Kamon from './kamon'

export default function ButtonGroups () {
  return (
    <div>
      <h2>Button groups</h2>
      <div className='btn-group btn-group-auto-lg' role='group' aria-label='...'>
        <button type='button' className='btn btn-default active'>Left</button>
        <button type='button' className='btn btn-default'>Middle</button>
        <button type='button' className='btn btn-default'>Right</button>
      </div>&nbsp;&nbsp;

      <div className='btn-group btn-group-auto-lg' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>
          <Kamon name='share' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='pencil' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='card-plus' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='unlocked' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='trash' />
        </button>
      </div>

      <h4>Vertical</h4>
      <div className='btn-group-vertical btn-group-auto-lg' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>One</button>
        <button type='button' className='btn btn-default'>Two</button>
        <button type='button' className='btn btn-default'>Three</button>
        <div className='btn-group btn-group-auto-lg' role='group' aria-label='...'>
          <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Dropdown{' '}
            <span className='caret'></span>
          </button>
          <ul className='dropdown-menu dropdown-menu-auto-lg'>
            <li><a href='javascript:;'>Dropdown link</a></li>
            <li><a href='javascript:;'>Dropdown link</a></li>
          </ul>
        </div>
        <button type='button' className='btn btn-default'>Four</button>
      </div>&nbsp;&nbsp;

      <div className='btn-group-vertical btn-group-auto-lg' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>
          <Kamon name='share' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='pencil' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='card-plus' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='unlocked' />
        </button>
        <button type='button' className='btn btn-default'>
          <Kamon name='trash' />
        </button>
      </div>

      <h4>Toolbar</h4>
      <div className='btn-toolbar' role='toolbar' aria-label='...'>
        <div className='btn-group btn-group-auto-lg' role='group' aria-label='...'>
          <button type='button' className='btn btn-default'>1</button>
          <button type='button' className='btn btn-default'>2</button>
          <button type='button' className='btn btn-default'>3</button>
        </div>
        <div className='btn-group btn-group-auto-lg' role='group' aria-label='...'>
          <div className='btn-group btn-group-auto-lg' role='group'>
            <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              Dropdown{' '}
              <span className='caret'></span>
            </button>
            <ul className='dropdown-menu dropdown-menu-auto-lg'>
              <li><a href='javascript:;'>Dropdown link</a></li>
              <li><a href='javascript:;'>Dropdown link</a></li>
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
      <div className='btn-group btn-group-justified btn-group-auto-lg' role='group' aria-label='...'>
        <button type='button' className='btn btn-default'>Left</button>
        <button type='button' className='btn btn-default'>Middle</button>
        <button type='button' className='btn btn-default'>Right</button>
        <div className='btn-group btn-group-auto-lg' role='group'>
          <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Dropdown{' '}
            <span className='caret'></span>
          </button>
          <ul className='dropdown-menu dropdown-menu-auto-lg'>
            <li><a href='javascript:;'>Dropdown link</a></li>
            <li><a href='javascript:;'>Dropdown link</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
