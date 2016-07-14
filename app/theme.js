import {
  lightBlue700,
  lightBlue800,
  lightBlue900,
  yellowA700,
  orangeA400,
  lightBlue100,
  darkBlack
} from 'material-ui/styles/colors'

const white = '#FFFFFF'

export default {
  fontFamily: 'Source Sans Pro, sans-serif',
  palette: {
    primary1Color: lightBlue700,
    primary2Color: lightBlue800,
    primary3Color: lightBlue900,
    textColor: darkBlack,
    accent1Color: '#6C6D6E',
    accent2Color: yellowA700,
    accentYellow: yellowA700,
    accentOrange: orangeA400,
    canvasColor: white,
    titleColor: lightBlue100,
    iconColor: '#6C6D6E',
    white: white
  },
  toolbar: {
    iconColor: darkBlack,
    backgroundColor: 'transparent'
  },
  drawer: {
    width: 200
  }
}
