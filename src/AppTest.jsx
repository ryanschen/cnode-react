import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink as Link,
  Redirect,
  Switch
} from 'react-router-dom'
import './assets/styles/App.sass'
import NotFound from '@/views/NotFound'
import Home from '@/views/Home'
import News from '@/views/News'
import About from '@/views/About'

export default class extends Component {
  render () {
    return (
      <Router basename="/cnode">
        <div>
          <ul>
            <li>
              <Link to="/home">home</Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: '/news',
                  search: '?sort=name',
                  hash: '#the-hash',
                  state: { fromDashboard: true }
                }}
              >news</Link>
            </li>
            <li>
              <Link exact to="/about" activeStyle={{ color: 'red' }}>about</Link>
            </li>
          </ul>

          <hr/>
          
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/about" component={About} />
            <Redirect exact from="/" to="/home" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}
