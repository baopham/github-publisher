import React, { PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class CodeModeSelectField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
  }

  onChange = (e, index, value) => {
    this.props.onChange && this.props.onChange(value)
  }

  render () {
    return (
      <SelectField
        {...this.props}
        value={this.props.value}
        onChange={this.onChange}
      >
        <MenuItem value='html' primaryText='HTML' />
        <MenuItem value='css' primaryText='CSS' />
      </SelectField>
    )
  }
}
