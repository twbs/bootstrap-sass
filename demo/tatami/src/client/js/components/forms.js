import React from 'react'

export default function Forms () {
  return (
    <div>
      <h2>Forms</h2>
      <form>
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-addon'>https://scrapbox.io/</div>
            <input type='text' className='form-control' />
          </div>
        </div>

        <div className='form-group has-error'>
          <label className='control-label' htmlFor='exampleInputEmail1'>Has error</label>
          <div className='input-group'>
            <div className='input-group-addon'>https://scrapbox.io/</div>
            <input type='text' className='form-control' />
          </div>
        </div>

        <div className='form-group'>
          <label className='control-label' htmlFor='exampleInputEmail1'>Email address</label>
          <input type='email' className='form-control' id='exampleInputEmail1' placeholder='Email' />
        </div>
        <div className='form-group'>
          <label className='control-label' htmlFor='exampleInputPassword1'>Password</label>
          <input type='password' className='form-control' id='exampleInputPassword1' placeholder='Password' />
          <span id='helpBlock' className='help-block'>
            A block of help text that breaks onto a new line and may extend beyond one line.
          </span>
        </div>
        <div className='form-group'>
          <label className='control-label' htmlFor='exampleInputEmail1'>Select</label>
          <select className='form-control'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className='form-group'>
          <label className='control-label' htmlFor='disabledTextInput'>Disabled input</label>
          <input type='text' id='disabledTextInput' className='form-control' placeholder='Disabled input' disabled />
        </div>
        <div className='form-group'>
          <label className='control-label' htmlFor='freetext'>Free text</label>
          <textarea className='form-control' id='freetext'  />
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' /> Check me out
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' name='optionsRadios' id='optionsRadios1' value='option1' />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' name='optionsRadios' id='optionsRadios2' value='option2' />
            Option two can be something else and selecting it will deselect option one
          </label>
        </div>

        <div className='form-group'>
          <label htmlFor='slider'>Process nice score from -20 to +20</label>
          <input type='range' min='-20' max='20' defaultValue='0' />
        </div>

        <div className='form-group'>
          <label htmlFor='file'>Upload file</label>
          <input type='file' title='File' />
        </div>

        <button className='btn btn-default'>Submit</button>

        <h4>Sizes</h4>
        <div className='form-group'>
          <input className='form-control input-lg' type='text' placeholder='.input-lg' />
        </div>
        <div className='form-group'>
          <input className='form-control' type='text' placeholder='Default input' />
        </div>
        <div className='form-group'>
          <input className='form-control input-sm' type='text' placeholder='.input-sm' />
        </div>

        <div className='form-group'>
          <select className="form-control input-lg">
            <option>Large select</option>
          </select>
        </div>
        <div className='form-group'>
          <select className="form-control">
            <option>Default select</option>
          </select>
        </div>
        <div className='form-group'>
          <select className="form-control input-sm">
            <option>Small select</option>
          </select>
        </div>

        <h3>Input groups</h3>

        <div className='input-group input-group-lg'>
          <span className='input-group-addon' id='sizing-addon1'>@</span>
          <input type='text' className='form-control' placeholder='Username' aria-describedby='sizing-addon1' />
          <span className='input-group-addon'>.00</span>
        </div>
        <br />

        <div className='input-group'>
          <span className='input-group-addon' id='sizing-addon2'>@</span>
          <input type='text' className='form-control' placeholder='Username' aria-describedby='sizing-addon2' />
          <span className='input-group-addon'>.00</span>
        </div>
        <br />

        <div className='input-group input-group-sm'>
          <span className='input-group-addon' id='sizing-addon3'>@</span>
          <input type='text' className='form-control' placeholder='Username' aria-describedby='sizing-addon3' />
          <span className='input-group-addon'>.00</span>
        </div>
        <br />


        <div className='row'>
          <div className='col-lg-6'>
            <div className='input-group'>
              <div className='input-group-btn'>
                <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'>
                  Action <span className='caret'></span>
                </button>
                <ul className='dropdown-menu'>
                  <li><a href='javascript:;'>Action</a></li>
                  <li><a href='javascript:;'>Another action</a></li>
                  <li><a href='javascript:;'>Something else here</a></li>
                  <li role='separator' className='divider'></li>
                  <li><a href='javascript:;'>Separated link</a></li>
                </ul>
                <button type='button' className='btn btn-default' aria-label='Bold'>
                  Go
                </button>
              </div>
              <input type='text' className='form-control' aria-label='...' />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='input-group'>
              <input type='text' className='form-control' aria-label='...' />
              <div className='input-group-btn'>
                <button type='button' className='btn btn-default dropdown-toggle' data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'>
                  Action <span className='caret'></span>
                </button>
                <ul className='dropdown-menu dropdown-menu-right'>
                  <li><a href='javascript:;'>Action</a></li>
                  <li><a href='javascript:;'>Another action</a></li>
                  <li><a href='javascript:;'>Something else here</a></li>
                  <li role='separator' className='divider'></li>
                  <li><a href='javascript:;'>Separated link</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h4>Panels</h4>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <div className='panel-title'>
              Panel title
            </div>
          </div>
          <div className='panel-body'>
            Basic panel example
          </div>
          <div className='panel-footer'>
            Footer
          </div>
        </div>
      </form>
    </div>
  )
}
