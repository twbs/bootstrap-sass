import browserInfo from 'browser-info'

let info = {}
try {
  info = browserInfo()
  console.log(info)
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack || err)
  }
}

export function isMac () {
  return info.os === 'OS X'
}

export function isNotMac () {
  return !isMac()
}

export function isiOS () {
  return info.os === 'iOS'
}

export function isAndroid () {
  return info.os === 'Android'
}

export function isWindowsPhone () {
  return info.os === 'Windows Phone'
}

export function isTouchDevice () {
  return isiOS() || isAndroid() || isWindowsPhone()
}

export function isNotTouchDevice () {
  return !isTouchDevice()
}

export function isLegacyBrowser () {
  return (info.name === 'Chrome' && info.version < 50) ||
    (info.name === 'Safari' && info.version < 10) ||
    (info.name === 'Firefox' && info.version < 50) ||
    (info.name === 'IE')
}

export function isOperaCoast () {
  return info.name === 'OperaCoast'
}

export function isSafari () {
  return info.name === 'Safari'
}
