import React, { PropTypes } from 'react'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper'
import { red500 } from 'material-ui/styles/colors'

/**
 * @example
 * <ConditionalStepper
 *   steps={[
 *     { label: 'success label', content: 'success content', error: false }
 *   ]}>
 * </ConditionalStepper>
 */
export default class ConditionalStepper extends React.Component {
  static propTypes = {
    steps: PropTypes.array.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      stepIndex: 0
    }
  }

  nextStep () {
    this.setState({ stepIndex: this.state.stepIndex + 1 })
  }

  prevStep () {
    this.setState({ stepIndex: this.state.stepIndex - 1 })
  }

  set step (step) {
    this.setState({ stepIndex: step })
  }

  get step () {
    return this.state.stepIndex
  }

  render () {
    const { stepIndex } = this.state

    return (
      <Stepper {...this.props} activeStep={stepIndex}>
        {this.props.steps.map((step, index) => (
          <Step key={index} style={{ color: step.error ? red500 : 'inherit' }}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              {typeof step.content === 'string' &&
                <p>{step.content}</p>
              }
              {typeof step.content !== 'string' &&
                step.content
              }
            </StepContent>
          </Step>
        ))}
      </Stepper>
    )
  }

}
