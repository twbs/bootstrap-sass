import React, {Component} from 'react'
import PropTypes from 'prop-types'
const spritePath = 'public/assets/sprite.svg'

export default class Kamon extends Component {
  static get propTypes () {
    return {
      name: PropTypes.string.isRequired,
      className: PropTypes.string
    }
  }

  render () {
    const { className } = this.props

    return (
      <svg className={`kamon ${className ? className : ''}`}>
        <use xlinkHref={`${spritePath}#${this.props.name}`} />
      </svg>
    )
  }
}
