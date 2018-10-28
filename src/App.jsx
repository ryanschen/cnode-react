import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Nav from '@/components/Nav'
import Routers from '@/router'
import '@/assets/styles/App.sass'

const navList = [
  { path: 'home', name: '首页' },
  { path: 'getstart', name: '新手入门' },
  { path: 'about', name: '关于' }
]

export default class extends Component {
  render () {
    return (
      <BrowserRouter basename="/">
        <div className="app">
          <Nav navList={navList} title="CNode JS"/>
          <Routers/>
        </div>
      </BrowserRouter>
    )
  }
}
