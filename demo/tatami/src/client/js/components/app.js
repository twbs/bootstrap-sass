import React, {Component} from 'react'
import Sandbox from './sandbox'
import NavbarSample from './navbar-sample'

export default class App extends Component {
  constructor () {
    super()
    this.state = {hash: ''}
  }

  componentDidMount () {
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    this.onHashChange()
  }

  onHashChange () {
    let component = location.hash
    if (component.length > 0) component = component.substring(1)
    this.setState({component})
  }

  render () {
    const {component} = this.state

    const components = [
      'alerts',
      'buttons',
      'cards',
      'dropdowns',
      'forms',
      'grid',
      'labels',
      'modals',
      'navs',
      'tooltips',
      'type'
    ]

    return (
      <div>
        <NavbarSample />
        <div className='container' id='cont'>
          <div className='row'>
            <div className='col-md-3'>
              <ul className='nav nav-pills nav-stacked'>
                <li className={component ===  '' ? 'active' : ''}>
                  <a href='#'>Home</a>
                </li>
                {
                  components.map(c => {
                    return (
                      <li key={c} className={c === component ? 'active' : ''}>
                        <a href={'#'+c}>{capitalize(c)}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className='col-md-9'>
              {
                !component &&
                  <div>
                    <h1>
                      <img src='./public/assets/img/skelton.svg' alt='logo' className='logoimg' width='50' />
                      Hello, touch device friendly UI components
                    </h1>
                    <p>
                    特徴<br />
                    bootstrap 3系の派生なのでcss classやreactはbootstrap互換<br />
                    ウェブからは離れ、ネイティブアプリに近い動きを実現<br />
                    単にレスポンシブなだけではない<br />
                    タッチデバイスで、、ネイティブアプリ風の動きを実現<br />
                    一方でポインティングデバイスでもちゃんと動く<br />
                    </p>
                    <hr />
                    url: {window.location.href}<br />
                    <br />
                    Welcome to design system.
                  </div>
              }
              <Sandbox component={component} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
