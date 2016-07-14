import React from 'react'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import AuthInfo from '../containers/AuthInfo'

import { spacing, typography } from 'material-ui/styles'
import { lightBlue700 } from 'material-ui/styles/colors'

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 20,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: lightBlue700,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  }
}

export const CoreLayout = ({ children }, context) => (
  <Paper style={{ height: '100%' }} zDepth={0}>
    <Drawer
      zDepth={1}
      open
    >
      <div style={styles.logo}>
        Github Publisher
      </div>
      <AuthInfo />
    </Drawer>
    <Paper zDepth={0} style={{ paddingLeft: context.muiTheme.drawer.width }}>
      {children}
    </Paper>
  </Paper>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

CoreLayout.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

export default CoreLayout
