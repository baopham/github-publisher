import React, { PropTypes } from 'react'

import ConditionalStepper from '../components/ConditionalStepper'

import { LOGGED_IN } from '../redux/auth'
import { connect } from 'react-redux'
import { makeSteps } from '../selectors/setup-steps'

import { actions as githubIOActions } from '../redux/github-io'
import {
  STEP_LOGIN,
  actions as setupStepActions
} from '../redux/setup-step'

const mapStateToProps = (state, ownProps) => {
  const getSteps = makeSteps()

  return {
    auth: state.auth,
    ghio: state.githubIO,
    setupStep: state.setupStep,
    steps: getSteps(state, ownProps)
  }
}
export class InitialSetup extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    ghio: PropTypes.object.isRequired,
    setupStep: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired,
    onFinish: PropTypes.func,

    checkRepo: PropTypes.func.isRequired,
    createRepo: PropTypes.func.isRequired,
    checkMasterBranch: PropTypes.func.isRequired,

    stepLogin: PropTypes.func.isRequired,
    stepCheckRepo: PropTypes.func.isRequired,
    stepCreateRepo: PropTypes.func.isRequired,
    stepRepoCreated: PropTypes.func.isRequired,
    stepRepoReady: PropTypes.func.isRequired,
    stepError: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.stepper = null
  }

  componentDidUpdate () {
    this.stepper.step = this.props.setupStep.step

    if (this.props.setupStep.step === STEP_LOGIN && this.props.auth.status === LOGGED_IN) {
      this.props.checkRepo(this.onRepoCreated, this.createRepo)
      this.props.stepCreateRepo()
    }
  }

  createRepo = () => {
    this.props.createRepo(this.onRepoCreated, this.onError)
  }

  onError = () => {
    this.props.stepError()
  }

  onRepoCreated = () => {
    this.props.checkMasterBranch(this.finish, this.onError)
  }

  finish = () => {
    this.props.stepRepoReady()
    this.props.onFinish && this.props.onFinish()
  }

  _handleRef = (ref) => {
    this.stepper = ref
  }

  render () {
    return (
      <div style={{ maxWidth: 300, margin: 'auto' }}>
        <ConditionalStepper
          steps={this.props.steps}
          ref={this._handleRef}
          orientation='vertical'
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, {...githubIOActions, ...setupStepActions})(InitialSetup)

