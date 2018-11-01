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
          <span className='help-block'>
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

        <br />

        <h3>Checkboxes and radios</h3>
        <h4>Default (stacked)</h4>
        <div className='checkbox'>
          <label>
            <input type='checkbox' /> Check me out
          </label>
        </div>
        <div className='checkbox disabled'>
          <label>
            <input type='checkbox' disabled /> Disabled check
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' name='optionsRadios' value='option1' />
            Option one is this and that&mdash;be sure to include why it's great
          </label>
        </div>
        <div className='radio'>
          <label>
            <input type='radio' name='optionsRadios' value='option2' />
            Option two can be something else and selecting it will deselect option one
          </label>
        </div>
        <div className='radio disabled'>
          <label>
            <input type='radio' name='optionsRadios' value='option2' disabled />
            This option is disabled
          </label>
        </div>

        <br />
        <h4>Inline checkboxes and radios</h4>
        <div className='form-group'>
          <label className='checkbox-inline'>
            <input type='checkbox' value='option1' /> One
          </label>
          <label className='checkbox-inline'>
            <input type='checkbox' value='option2' /> Two
          </label>
          <label className='checkbox-inline'>
            <input type='checkbox' value='option3' /> Three
          </label>
        </div>

        <div className='form-group'>
          some text {' '}
          <label className='radio-inline'>
            <input type='radio' name='inlineRadioOptions' value='option1' /> One
          </label>
          <label className='radio-inline'>
            <input type='radio' name='inlineRadioOptions' value='option2' /> Two
          </label>
          <label className='radio-inline'>
            <input type='radio' name='inlineRadioOptions' value='option3' /> Three
          </label>
        </div>
        <br />
        <br />

        <div className='form-group'>
          <label htmlFor='slider'>Process nice score from -20 to +20</label>
          <input type='range' min='-20' max='20' defaultValue='0' data-require-use-focus-class />
        </div>

        <div className='form-group'>
          <label htmlFor='slider'>Disabled slider</label>
          <input type='range' min='-20' max='20' defaultValue='0' disabled />
        </div>

        <div className='form-group'>
          <label htmlFor='file'>Upload file</label>
          <input type='file' title='File' />
        </div>

        <div className='form-group'>
          <label htmlFor='file'>Upload file disabled</label>
          <input type='file' title='File' disabled />
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
          <select className='form-control input-lg'>
            <option>Large select</option>
          </select>
        </div>
        <div className='form-group'>
          <select className='form-control'>
            <option>Default select</option>
          </select>
        </div>
        <div className='form-group'>
          <select className='form-control input-sm'>
            <option>Small select</option>
          </select>
        </div>

        <h3>Input groups</h3>

        <div className='input-group input-group-lg'>
          <span className='input-group-addon'>@</span>
          <input type='text' className='form-control' placeholder='Username' aria-describedby='sizing-addon1' />
          <span className='input-group-addon'>.00</span>
        </div>
        <br />

        <div className='input-group'>
          <span className='input-group-addon'>@</span>
          <input type='text' className='form-control' placeholder='Username' aria-describedby='sizing-addon2' />
          <span className='input-group-addon'>.00</span>
        </div>
        <br />

        <div className='input-group input-group-sm'>
          <span className='input-group-addon'>@</span>
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

      <br />
      <h2>Inline form</h2>
      <form className='form-inline'>
        <div className='form-group'>
          <label htmlFor='exampleInputName2'>Name</label>
          <input type='text' className='form-control' id='exampleInputName2' placeholder='Jane Doe' />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail2'>Email</label>
          <input type='email' className='form-control' id='exampleInputEmail2' placeholder='jane.doe@example.com' />
        </div>
        <div className='checkbox'>
          <label>
            <input type='checkbox' /> Remember me
          </label>
        </div>
        <button type='submit' className='btn btn-default'>Send invitation</button>
      </form>

      <form className='form-inline'>
        <div className='input-group'>
          <span className='input-group-addon'>@</span>
          <input type='text' className='form-control' placeholder='Username' aria-describedby='sizing-addon2' />
          <span className='input-group-addon'>.00</span>
        </div>
        <div className='form-group'>
          <p className='form-control-static'>note</p>
        </div>
        <button type='submit' className='btn btn-default'>Send invitation</button>
      </form>

      <br />
      <h2>Horizontal form</h2>
      <form className='form-horizontal'>
        <div className='form-group'>
          <label htmlFor='inputEmail3' className='col-sm-2 control-label'>Email</label>
          <div className='col-sm-10'>
            <input type='email' className='form-control' id='inputEmail3' placeholder='Email' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='inputPassword3' className='col-sm-2 control-label'>Password</label>
          <div className='col-sm-10'>
            <input type='password' className='form-control' id='inputPassword3' placeholder='Password' />
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-2 col-sm-10'>
            <div className='checkbox'>
              <label>
                <input type='checkbox' /> Remember me
              </label>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-2 col-sm-10'>
            <button type='submit' className='btn btn-default'>Sign in</button>
          </div>
        </div>
      </form>
    </div>
  )
}
