/* eslint-env browser */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-bootstrap'

export default class SampleModal extends Component {
  static get propTypes () {
    return {
      show: PropTypes.bool.isRequired,
      onHide: PropTypes.func.isRequired
    }
  }

  render () {
    const {show, onHide} = this.props
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Hellow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
          A<br />
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' onClick={onHide}>OK</button>
          <button className='btn btn-default' onClick={onHide}>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
}
