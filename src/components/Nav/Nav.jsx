import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class extends Component {
  render () {
    return (
      <header className="nav">
        <h1 className="nav-title">{this.props.title}</h1>
        <ul className="nav-wrap">
          {
            this.props.navList.map((nav, index) => {
              return (<li key={index}><Link to={`/${nav.path}`}>{nav.name}</Link></li>)
            })
          }
        </ul>
      </header>
    )
  }
}
