import React from 'react'

export default function Panels () {
  return (
    <div>
      <h2>Panels</h2>

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

      <br /><br />

      <div className='panel panel-default'>
        <div className='panel-body'>
          Basic panel example
        </div>
      </div>
    </div>
  )
}
