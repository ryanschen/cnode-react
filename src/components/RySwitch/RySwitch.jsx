import React, { Component } from 'react'
import classNames from 'classnames'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.checked
    }
  }

  onValueChange = () => {
    const checked = !this.state.checked
    this.setState({ checked })
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange(checked)
    }
  }

  render() {
    const { checked } = this.state;
    const classes = classNames('ry-switch', {
      checked: checked
    })
    return (
      <span className={classes} onClick={this.onValueChange}>
        <span className="ry-switch-item"></span>
      </span>
    )
  }
}
