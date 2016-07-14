import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import LinearProgress from 'material-ui/LinearProgress'
import { GridList, GridTile } from 'material-ui/GridList'
import { grey500 } from 'material-ui/styles/colors'

import { getRepoName, getUrl } from '../utils/helpers'

import A from '../components/A'
import CodeEditor from '../components/CodeEditor'
import CodeModeSelectField from '../components/CodeModeSelectField'

import {
  actions,
  PUBLISHED_STATUS,
  PUBLISHING_STATUS,
  ERROR_STATUS
} from '../redux/publisher'

const styles = {
  container: {
    minHeight: 600
  },
  homepage: {
    color: grey500
  },
  publishedMessage: {
    margin: 0
  },
  publishedMessageLink: {
    color: '#FFFFFF'
  },
  editorTitle: {
    float: 'right',
    paddingRight: 10
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  publisher: state.publisher
})
export default class Publisher extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    publisher: PropTypes.object.isRequired,
    publish: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      path: props.publisher.path,
      content: props.publisher.content,
      codeMode: props.publisher.codeMode
    }

    this.contentChanged = false
    this.statusUpdated = false
  }

  componentWillUpdate (nextProps, nextState) {
    this.statusUpdated = nextProps.publisher.status !== this.props.publisher.status
    this.contentChanged = !(this.statusUpdated && nextProps.publisher.status === PUBLISHED_STATUS)
  }

  componentDidUpdate () {
    this.statusUpdated && this.notify()
  }

  notify () {
    const { status, path } = this.props.publisher
    const { user } = this.props.auth
    const href = getUrl(user, path)

    /* eslint-disable no-new */
    if (status === PUBLISHED_STATUS) {
      new Notification('Github Publisher', {
        body: `Published! ${href}`
      })
    }

    if (status === ERROR_STATUS) {
      new Notification('Github Publisher', {
        body: `Failed to publish to ${href}`
      })
    }
    /* eslint-enable */
  }

  publish = () => {
    const { path, content, codeMode } = this.state

    if (content) {
      this.props.publish(path, content, codeMode)
    }
  }

  setPath = (e) => {
    this.setState({ path: e.target.value.trim() })
  }

  setContent = (content) => {
    this.contentChanged = content !== this.state.content
    this.setState({ content: content })
  }

  _publishedStatusMessage = () => {
    const { user } = this.props.auth
    const { path } = this.props.publisher
    const href = getUrl(user, path)

    return (
      <div style={styles.publishedMessage}>
        Published!
        &nbsp;
        <A href={href} style={styles.publishedMessageLink}>
          {href}
        </A>
      </div>
    )
  }

  renderStatus = () => {
    if (!this.statusUpdated) {
      return
    }

    const status = {
      [PUBLISHING_STATUS]: <LinearProgress mode='indeterminate' />,
      [PUBLISHED_STATUS]: <Snackbar open message={this._publishedStatusMessage()} autoHideDuration={5000} />,
      [ERROR_STATUS]: <Snackbar open message='Could not publish...' autoHideDuration={4000} />
    }

    return status[this.props.publisher.status] || ''
  }

  selectCodeMode = (mode) => {
    this.setState({ codeMode: mode })
  }

  render () {
    const { user } = this.props.auth

    const url = `https://${getRepoName(user)}`

    return (
      <div style={styles.container}>
        {this.renderStatus()}
        <h2>Add/Edit Page</h2>
        <span style={styles.homepage}>
          {url}/
        </span>
        <TextField
          hintText='blogs/new-adventure'
          value={this.state.path}
          onChange={this.setPath}
        />
        <RaisedButton
          style={{ float: 'right' }}
          label='Publish'
          disabled={!this.contentChanged}
          onClick={this.publish}
        />
        <GridList
          cols={1}
          padding={10}
        >
          <GridTile
            title={
              <CodeModeSelectField
                value={this.state.codeMode}
                style={styles.editorTitle}
                onChange={this.selectCodeMode}
              />
            }
            rows={2}
          >
            <CodeEditor
              mode={this.state.codeMode}
              value={this.state.content}
              onChange={this.setContent}
            />
          </GridTile>
        </GridList>
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(Publisher)

