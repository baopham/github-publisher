import React, { PropTypes } from 'react'
import { shell } from 'electron'

export default class A extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node
  }

  _open = (e) => {
    e.preventDefault()

    shell.openExternal(this.props.href)
  }

  render () {
    return (
      <a {...this.props} onClick={this._open}>
        {this.props.children}
      </a>
    )
  }
}

