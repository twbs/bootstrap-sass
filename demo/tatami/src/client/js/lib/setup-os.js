function getOSFromUserAgent (userAgent) {
  if (!userAgent) return
  const found = userAgent.match(/(Mac|Windows|Android|iPhone|iPad)/i)
  if (!found) return

  if (found[0] === 'iPhone' || found[0] === 'iPad') return 'ios'
  return found[0].toLowerCase()
}

(function () {
  const os = getOSFromUserAgent(navigator.userAgent)
  if (!os) return

  document.documentElement.setAttribute('data-os', os)
}())
