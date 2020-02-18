import { NoteType } from '../core/enums/appEnum'
import React, { Component } from 'react'
import Screen from '../components/screen'
import { observer, inject } from 'mobx-react'
import { withTheme } from 'react-native-paper'

@inject('headerStore')
@observer
class Note extends Component<any, any> {
  constructor(props: any) {
    super(props)

    console.log(this.props.headerStore.header.showCalc)
  }

  get noteType(): NoteType {
    return this.props.navigation.dangerouslyGetParent().getParam('type') as NoteType
  }

  showCalculator = () => {
    return null
  }

  render() {
    return <Screen>{this.showCalculator()}</Screen>
  }
}

export default withTheme(Note)
