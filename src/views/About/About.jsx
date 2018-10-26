import React, { Component } from 'react'
import { Route, NavLink as Link } from 'react-router-dom'
import Home from '@/views/Home'
import News from '@/views/News'

export default class extends Component {
  render() {
    return (
      <div>
        <p>About page</p>
        <ul>
          <li>
            <Link exact to="/about/other1">other route 1</Link>
          </li>
          <li>
            <Link exact to="/about/other2">other route 2</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/about/other1" component={Home} />
        <Route exact path="/about/other2" component={News} />
      </div>
    )
  }
}
