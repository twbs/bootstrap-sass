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
          <span id='helpBlock' className='help-block'>A block of help text that breaks onto a new line and may extend beyond one line.</span>
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

        <h4>Panels</h4>
        <div className='panel panel-default'>
          <div className='panel-body'>
            Basic panel example
          </div>
        </div>
      </form>
    </div>
  )
}
