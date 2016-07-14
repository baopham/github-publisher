import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

import { authenticate } from '../utils/login'

import { LOGGED_IN, LOGGED_OUT, actions } from '../redux/auth'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth
})
export class AuthInfo extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      token: this.props.auth.user && this.props.auth.user.token
    }
  }

  login = () => {
    authenticate(this.props.login, alert)
  }

  onTokenFieldChange = (e) => {
    this.setState({ token: e.target.value })
  }

  render () {
    const actions = [
      <RaisedButton
        label='Login'
        primary
        onTouchTap={this.login}
      />
    ]

    const { logout, auth } = this.props

    return (
      <div>
        {auth.status === LOGGED_IN &&
          <List>
            <ListItem
              leftIcon={<Avatar src={auth.user.avatar_url ? auth.user.avatar_url : null} />}
            >
              {auth.user.login}
            </ListItem>
            <Divider />
            <ListItem
              primaryText='Logout'
              onTouchTap={logout}
            />
          </List>
        }

        {auth.status === LOGGED_OUT &&
          <Dialog
            title='Welcome'
            actions={actions}
            modal
            open
          >
            <p>You need to log in to Github. After you login, the app will:</p>
            <ul>
              <li>Set up a repo <u>your-username.github.io</u> on Github for you</li>
              <li>Allow you to publish any content to your new site <u>https://your-username.github.io</u></li>
            </ul>
            <p>Click Login to continue</p>
          </Dialog>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(AuthInfo)
