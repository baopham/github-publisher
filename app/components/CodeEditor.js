import React, { PropTypes } from 'react'
import AceEditor from 'react-ace'

import 'brace'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/javascript'
import 'brace/theme/github'

export default class CodeEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    id: PropTypes.string,
    mode: PropTypes.oneOf(['html', 'css', 'javascript'])
  }

  static defaultProps = {
    mode: 'html',
    id: 'editor'
  }

  render () {
    const { mode, value, onChange, id } = this.props

    return (
      <AceEditor
        mode={mode}
        height='100%'
        width='100%'
        theme='github'
        value={value}
        onChange={onChange}
        name={id}
      />
    )
  }
}

