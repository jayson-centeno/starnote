import React, { Component } from 'react'
import globalStyle from '../../globalStyle'
import { View, TextInput, Keyboard } from 'react-native'
import Icon from '../Icon'
import { inject, observer } from 'mobx-react'
import { withTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper'
import { NoteStore } from '../../domain/stores/noteStore'
import { STORES } from '../../domain/constants'

interface IHeaderTitleProps {
  title: string
  navigation: any
  noteStore?: NoteStore
  theme: Theme
}

interface IHeaderTitleState {
  edit: boolean
  lastPress: number
}

@inject(STORES.NoteStore)
@observer
class HeaderTitle extends Component<IHeaderTitleProps, IHeaderTitleState> {
  constructor(props: any) {
    super(props)
  }

  backClicked = (): void => {
    this.props.navigation.navigate('Notes')
  }

  saveClicked = (): void => {
    Keyboard.dismiss()
    this.saveRecord()
  }

  saveRecord = (): void => {
    this.props.noteStore!.save()
  }

  onFocus = (): void => {
    this.props.noteStore!.header.isEditing = true
  }

  get title(): string {
    return this.props.noteStore!.header.noteModel.title
  }

  changeTitle(value: string): void {
    this.props.noteStore!.header.noteModel.title = value
  }

  renderInput = (title: string): React.ReactNode => {
    return (
      <TextInput
        defaultValue={title}
        onFocus={() => this.onFocus()}
        disableFullscreenUI={true}
        autoFocus={true}
        selectTextOnFocus={true}
        onChangeText={value => this.changeTitle(value)}
        style={{
          height: 30,
          width: 280,
          color: '#fff',
          backgroundColor: '#000',
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 3,
          fontSize: 20,
        }}
      ></TextInput>
    )
  }

  renderUpdate = (): React.ReactNode => {
    if (this.props.noteStore!.header.isEditing) {
      return (
        <View style={{ marginRight: 5, paddingTop: 6 }}>
          <Icon name="done" color={this.props.theme.colors.primary} onPress={() => this.saveClicked()} />
        </View>
      )
    } else {
      return (
        <View style={{ marginRight: 5, paddingTop: 8 }}>
          <Icon
            name="arrow-back"
            size={24}
            color={this.props.theme.colors.primary}
            onPress={() => this.backClicked()}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View
        style={{
          marginRight: 20,
          marginTop: 0,
          marginLeft: 10,
          marginBottom: 55,
        }}
      >
        <View style={[globalStyle.flexRow]}>
          {this.renderUpdate()}
          <View style={{ marginRight: 5 }}>{this.renderInput(this.title)}</View>
        </View>
      </View>
    )
  }
}

export default withTheme(HeaderTitle)
