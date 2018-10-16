/* eslint-env browser */

import React from 'react'

// Touch Device Friendly Button
export default function TouchButton (props) {
  let btn

  // Android Chromeで、長押しによるフォーカスの移動を抑制する
  // マウスの右クリック(button=2)は無視する
  // Macのcontrol+左クリックも無視する
  const onContextMenu = e => {
    console.log('onContextMenu', e.button, e.ctrlKey)
    if (e.button > 0 || e.ctrlKey) return
    e.preventDefault()
    btn.blur()
  }

  // Desktop Chrome, Android Chromeでクリックまたはタップ直後のフォーカスを抑制
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button の下部参照
  const onMouseDown = e => {
    console.log('onMouseDown')
    e.preventDefault()
  }

  const onFocus = e => {
    e.preventDefault()
    if (btn.className.includes('dropdown-toggle')) btn.blur()
  }

  // iOSで、tap後すぐに:activeにするためタッチイベントを登録する
  // https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html の一番下参照
  const onTouchStart = () => {}

  return (
    <button
      {...props}
      ref={(ref) => { btn = ref }}
      onFocus={onFocus}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      onContextMenu={onContextMenu}>
      {props.children}
    </button>
  )
}
