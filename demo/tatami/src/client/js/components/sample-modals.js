/* eslint-env browser */

import React from 'react'
import {Modal} from 'react-bootstrap'

export function SampleModal1({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <h3 className='modal-title'><strong>Some induction title</strong></h3>
      </Modal.Header>
      <Modal.Body>
        <div className='text-auto-size'>
          Instantly browse, search, and collect all your captures with unlimited access when you upgrade to Gyazo Pro, including this one.
        </div>
        <div style={ {  width: 292, height: 168, background: '#d8d8d8', margin: '24px auto 0' } } />
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary btn-auto-size' onClick={onHide}>Upgrade</button>
      </Modal.Footer>
    </Modal>
  )
}

export function SampleModal2({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Modal title</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-auto-size'>Modal body text goes here. Max width is 600px.</div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary btn-auto-size' onClick={onHide}>Button</button>
        <button className='btn btn-default btn-auto-size' onClick={onHide}>Button</button>
      </Modal.Footer>
    </Modal>
  )
}

export function SampleModal3({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <h3 className='modal-title'><strong>Edit account info</strong></h3>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className='form-group'>
            <label className='control-label' htmlFor='exampleInput1'>Profile image</label>
            <input type='text' className='form-control input-auto-size' id='exampleInput1' placeholder='Type something' />
          </div>
          <div className='form-group'>
            <label className='control-label' htmlFor='exampleInput2'>Name</label>
            <input type='text' className='form-control input-auto-size' id='exampleInput2' placeholder='Type something' />
          </div>
          <div className='form-group'>
            <label className='control-label' htmlFor='exampleInputEmail1'>Email</label>
            <input type='email' className='form-control input-auto-size' id='exampleInputEmail1' placeholder='Type something' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-auto-size' onClick={onHide}>Button</button>
          <button className='btn btn-default btn-auto-size' onClick={onHide}>Button</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export function SampleModalSmall({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='modal-sm'>
      <Modal.Header className='modal-header-no-border'>
        <h3 className='modal-title'><strong>Small modal</strong></h3>
      </Modal.Header>
      <Modal.Body>
        <div className='text-auto-size'>Max width is 300px.</div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary btn-auto-size' onClick={onHide}>Button</button>
        <button className='btn btn-default btn-auto-size' onClick={onHide}>Button</button>
      </Modal.Footer>
    </Modal>
  )
}

export function SampleModalSmall2({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='modal-sm'>
      <Modal.Header className='modal-header-no-border'>
        <h3 className='modal-title'><strong>Delete?</strong></h3>
      </Modal.Header>
      <Modal.Body>
        <div className='text-auto-size'>There is no undo for this action.</div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary btn-auto-size' onClick={onHide}>Copy link</button>
        <button className='btn btn-default btn-auto-size' onClick={onHide}>Delete now</button>
      </Modal.Footer>
    </Modal>
  )
}

export function SampleModalSmall3({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='modal-sm'>
      <Modal.Header className='modal-header-no-border'>
        <h3 className='modal-title text-center'><strong>Delete?</strong></h3>
      </Modal.Header>
      <Modal.Body>
        <div className='text-lg'>There is no undo for this action.</div>
      </Modal.Body>
      <Modal.Footer className='modal-footer-vertical'>
        <button className='btn btn-primary btn-block btn-lg' onClick={onHide}>Copy link</button>
        <button className='btn btn-default btn-block btn-lg' onClick={onHide}>Delete now</button>
      </Modal.Footer>
    </Modal>
  )
}

export function SampleModalSmall4({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='modal-sm'>
      <Modal.Header closeButton>
        <h3 className='modal-title'><strong>Set password</strong></h3>
      </Modal.Header>
      <form>
        <Modal.Body>
          <div className='form-group'>
            <label className='control-label' htmlFor='exampleInput1'>Password</label>
            <input type='password' className='form-control input-auto-size' id='exampleInput1' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-auto-size' onClick={onHide}>Button</button>
          <button className='btn btn-default btn-auto-size' onClick={onHide}>Button</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export function SampleModalLarge({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName='modal-lg'>
      <Modal.Header closeButton>
        <h3 className='modal-title'><strong>Large modal</strong></h3>
      </Modal.Header>
      <Modal.Body>
        <div className='text-auto-size'>Max width is 900px.</div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary btn-auto-size' onClick={onHide}>Button</button>
        <button className='btn btn-default btn-auto-size' onClick={onHide}>Button</button>
      </Modal.Footer>
    </Modal>
  )
}
