import React, { PropTypes } from 'react'
import InitialSetup from '../containers/InitialSetup'
import Publisher from '../containers/Publisher'
import Divider from 'material-ui/Divider'
import { connect } from 'react-redux'

const styles = {
  publisherContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
}

const mapStateToProps = (state, ownProps) => ({
  ghio: state.githubIO
})
class HomePage extends React.Component {
  static propTypes = {
    ghio: PropTypes.object.isRequired
  }

  render () {
    return (
      <div>
        <InitialSetup />
        {this.props.ghio.repo &&
          <div>
            <Divider />
            <div style={styles.publisherContainer}>
              <Publisher />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(HomePage)
