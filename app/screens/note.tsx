import { NoteType } from '../core/enums/appEnum'
import React, { Component } from 'react'
import Screen from '../components/screen'
import { observer, inject } from 'mobx-react'
import { withTheme, TextInput, Theme } from 'react-native-paper'
import { View } from 'react-native'
import globalStyle from '../globalStyle'
import { HeaderStore } from '../core/stores/headerStore'

interface INoteProps {
  title: string
  navigation: any
  headerStore: HeaderStore
  theme: Theme
}

@inject('headerStore')
@observer
class Note extends Component<INoteProps, any> {
  constructor(props: INoteProps) {
    super(props)
  }

  get noteType(): NoteType {
    return this.props.headerStore.header.type as NoteType
  }

  showCalculator = () => {
    return null
  }

  onFocus = () => {
    this.props.headerStore.header.edit = true
  }

  renderEditor = () => {
    if (this.noteType === NoteType.Note) {
      return (
        <TextInput
          multiline={true}
          onFocus={() => this.onFocus()}
          dense={true}
          disableFullscreenUI={true}
          selectionColor="#888"
          underlineColor="#fff"
          mode="flat"
          numberOfLines={50}
          theme={this.props.theme}
          style={{ backgroundColor: '#fff', fontSize: 22, letterSpacing: 50 }}
          disabled={false}
        ></TextInput>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <Screen>
        <View style={[globalStyle.innerScreen, { position: 'relative' }]}>
          {this.renderEditor()}
          {this.showCalculator()}
        </View>
      </Screen>
    )
  }
}

export default withTheme(Note)
