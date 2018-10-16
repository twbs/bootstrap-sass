import React from 'react'

export default function Tabs () {
  return (
    <div>
      <h2>Tabs</h2>
      <div>
        <ul className='nav nav-tabs' role='tablist'>
          <li role='presentation' className='active'><a href='#home' aria-controls='home' role='tab' data-toggle='tab'>Home</a></li>
          <li role='presentation'><a href='#profile' aria-controls='profile' role='tab' data-toggle='tab'>Profile</a></li>
        </ul>
        <div className='tab-content'>
          <div role='tabpanel' className='tab-pane active' id='home'>this is home...</div>
          <div role='tabpanel' className='tab-pane' id='profile'>this is profile...</div>
        </div>
      </div>

      <h4>Nav Pills</h4>
      <ul className='nav nav-pills nav-stacked'>
        <li role='presentation' className='active'><a href='javascript:;'>Home</a></li>
        <li role='presentation' className='disabled'><a href='javascript:;'>Profile</a></li>
        <li role='presentation'><a href='javascript:;'>Messages</a></li>
      </ul>
    </div>
  )
}
