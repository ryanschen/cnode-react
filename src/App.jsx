import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from '@/components/Nav'
import MyRouters from '@/router'
import '@/assets/styles/App.sass'

export default class extends Component {
  render () {
    const navList = [
      { path: 'home', name: '首页' },
      { path: 'news', name: '新手入门' },
      { path: 'about', name: '关于' }
    ]
    return (
      <Router basename="/">
        <div className="app">
          <Nav navList={navList} title="CNode JS"/>
          <MyRouters/>
        </div>
        {/* <ul>
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
        
        <hr/> */}
      </Router>
    )
  }
}
