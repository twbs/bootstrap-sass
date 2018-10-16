import React from 'react'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'

export default function Tooltips () {
  const tooltip = (
    <Tooltip id='tooltip'>Hello</Tooltip>
  )

  return (
    <div>
      <h2>Tooltips</h2>
      <OverlayTrigger placement='top' overlay={tooltip}>
        <a href='javascript:;'>
          Hover me
        </a>
      </OverlayTrigger>
    </div>
  )
}

