import React from 'react'
import { createSelector } from 'reselect'
import { getUsername, getRepoName } from '../utils/helpers'

import A from '../components/A'

import {
  STEP_CREATED_REPO
} from '../redux/setup-step'

const getAuth = (state) => state.auth
const getSetupStep = (state) => state.setupStep

export const makeSteps = () => {
  return createSelector(
    [getAuth, getSetupStep],
    (auth, setupStep) => {
      const steps = getInitialSteps(auth)

      const step = setupStep.step

      steps[step] = { ...steps[step], error: setupStep.error }

      if (step === STEP_CREATED_REPO && setupStep.error) {
        steps[step].content = 'Repo is empty!'
      }

      return steps
    }
  )
}

function getInitialSteps (auth) {
  const username = getUsername(auth.user)

  const repoName = getRepoName(auth.user)

  return [
    { label: 'Log In To Github', content: 'You need to log in to Github to start publishing' },
    { label: 'Checking Repo', content: `Checking for ${repoName}` },
    { label: 'Create Repo If not Found', content: `Creating ${repoName} repo` },
    { label: 'Repo Created', content:
      <p>
        <A href={`https://github.com/${username}/${repoName}`}>
          {repoName}
        </A>
        &nbsp;
        repo is there! Proceeding to check if site is ready for publishing new contents
      </p>
    },
    { label: 'Repo Is Ready', content:
      <p>
        <A href={`https://github.com/${username}/${repoName}`}>
          {repoName}
        </A>
        &nbsp;
        is ready
      </p>
    }
  ]
}
