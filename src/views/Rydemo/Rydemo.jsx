import React, { Component } from 'react'
import RySwitch from '@/components/RySwitch'

export default class extends Component {
  state = {
    switchFoo: true
  }

  render () {
    return (
      <div className="rydemo">
        <p>RySwitch 组件</p>
        <RySwitch
          checked={this.state.switchFoo}
          onChange={value => { this.setState({ switchFoo: value }) }}
        />
        <p>{this.state.switchFoo.toString()}</p>
      </div>
    )
  }
}