import React from 'react'
import { remote } from 'electron'
import FlatButton from 'material-ui/FlatButton'

export default class FolderBrowser extends React.Component {

  chooseFolder = () => {
    const options = {
      properties: ['openDirectory']
    }

    remote.dialog.showOpenDialog(options, (fileNames) => {
      console.log(fileNames)
    })
  }

  render () {
    return (
      <div>
        <FlatButton
          primary
          label='Choose Folder To Publish'
          onClick={this.chooseFolder}
        />
      </div>
    )
  }

}

