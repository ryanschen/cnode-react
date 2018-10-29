import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import Nav from '@/components/Nav'
import Routers from '@/router'
import '@/assets/styles/App.sass'

const navList = [
  { path: 'topics', name: '首页' },
  { path: 'getstart', name: '新手入门' },
  { path: 'about', name: '关于' },
  { path: 'rydemo', name: '组件demo' }
]

export default class extends Component {
  render () {
    return (
      <HashRouter basename="/">
        <div className="app">
          <Nav navList={navList} title="CNode JS" />
          <Routers/>
        </div>
      </HashRouter>
    )
  }
}
