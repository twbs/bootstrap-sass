/* eslint-env browser */

// const debug = require('../lib/debug')(__filename)

import React, {Component} from 'react'
import Alerts from './alerts'
import Buttons from './buttons'
import Cards from './cards'
import Dropdowns from './dropdowns'
import Forms from './forms'
import Grid from './grid'
import Labels from './labels'
import Modals from './modals'
import Tabs from './tabs'
import Tooltips from './tooltips'
import Type from './type'

export default function Sandbox ({component}) {
  switch (component) {
    case 'alerts':
      return <Alerts />
    case 'buttons':
      return <Buttons />
    case 'cards':
      return <Cards />
    case 'dropdowns':
      return <Dropdowns />
    case 'forms':
      return <Forms />
    case 'grid':
      return <Grid />
    case 'labels':
      return <Labels />
    case 'modals':
      return <Modals />
    case 'tabs':
      return <Tabs />
    case 'tooltips':
      return <Tooltips />
    case 'type':
      return <Type />

  }
  return null
}
