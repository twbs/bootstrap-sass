import React, {Component} from 'react'
import {
  SampleModal1,
  SampleModal2,
  SampleModal3,
  SampleModalSmall,
  SampleModalSmall2,
  SampleModalSmall3,
  SampleModalSmall4,
  SampleModalLarge } from './sample-modals'

// Touch Device Friendly Button
export default class Modals extends Component {
  constructor () {
    super()
    this.state = {
      showModal1: false,
      showModal2: false,
      showModalSmall: false,
      showModalSmall2: false,
      showModalSmall3: false,
      showModalSmall4: false,
      showModalLarge: false
    }
  }

  render () {
    return (
      <div>
        <h1>Modals</h1>
        <h3>Sizes</h3>

        <SampleModal2 show={this.state.showModal2} onHide={() => this.setState({showModal2: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModal2: true})}>
          Default modal
        </button>

        <br /><br />

        <SampleModalSmall show={this.state.showModalSmall} onHide={() => this.setState({showModalSmall: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModalSmall: true})}>
          Small modal
        </button>

        <br /><br />

        <SampleModalLarge show={this.state.showModalLarge} onHide={() => this.setState({showModalLarge: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModalLarge: true})}>
          Large modal
        </button>

        <h3>Use cases</h3>

        <SampleModalSmall2 show={this.state.showModalSmall2} onHide={() => this.setState({showModalSmall2: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModalSmall2: true})}>
          Delete?
        </button>

        <br /><br />

        <SampleModalSmall4 show={this.state.showModalSmall4} onHide={() => this.setState({showModalSmall4: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModalSmall4: true})}>
          Set password
        </button>

        <br /><br />

        <SampleModal1 show={this.state.showModal1} onHide={() => this.setState({showModal1: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModal1: true})}>
          Upgrade induction
        </button>

        <br /><br />

        <SampleModal3 show={this.state.showModal4} onHide={() => this.setState({showModal4: false})} />
        <button className='btn btn-default btn-auto-size' onClick={() => this.setState({showModal4: true})}>
          Edit account info
        </button>

        <br /><br />

        <SampleModalSmall3 show={this.state.showModalSmall3} onHide={() => this.setState({showModalSmall3: false})} />
        <button className='btn btn-lg btn-default' onClick={() => this.setState({showModalSmall3: true})}>
          Delete? (Mobile version)
        </button>
      </div>
    )
  }
}
