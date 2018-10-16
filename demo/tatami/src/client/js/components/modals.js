import React, {Component} from 'react'
import SampleModal from './sample-modal'

// Touch Device Friendly Button
export default class Modals extends Component {
  constructor () {
    super()
    this.state = {showModal: false}
  }

  render () {
    return (
      <div>
        <h4>Modals</h4>
        <SampleModal show={this.state.showModal} onHide={() => this.setState({showModal: false})} />
        <button className='btn btn-default' onClick={() => this.setState({showModal: true})}>
          Show Modal
        </button>
      </div>
    )
  }
}
