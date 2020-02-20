import { NoteType } from '../domain/enums'
import React, { Component } from 'react'
import Screen from '../components/screen'
import { observer, inject } from 'mobx-react'
import { withTheme, TextInput } from 'react-native-paper'
import { View } from 'react-native'
import globalStyle from '../globalStyle'
import { STORES, NAVIGATION } from '../domain/constants'
import { INoteProps } from '../domain/interfaces/components'
import ModalDialog from '../components/dialog'

@inject(STORES.NoteStore)
@observer
class Note extends Component<INoteProps, any> {
  constructor(props: INoteProps) {
    super(props)
  }

  get noteType(): NoteType {
    return this.props.noteStore.header.noteModel.type
  }

  showCalculator = (): React.ReactNode => {
    return null
  }

  onFocus = (): void => {
    this.props.noteStore.header.isEditing = true
  }

  onChangeContent = (value: string): void => {
    this.props.noteStore.header.noteModel.content = value
  }

  onDelete = async (value: boolean) => {
    if (value) {
      const result = await this.props.noteStore.delete(this.props.noteStore.header.noteModel)
      if (result) {
        this.props.noteStore.header.isEditing = false
        this.props.noteStore.header.isNew = false
        this.props.noteStore.loadNotes()
        this.props.navigation.navigate(NAVIGATION.NOTES)
      }
    }

    this.props.noteStore.header.showDelete = false
  }

  renderDeleteDialog(): React.ReactNode {
    if (!this.props.noteStore.header.showDelete) {
      return
    }
    return (
      <ModalDialog
        onDelete={(value: boolean) => this.onDelete(value)}
        visible={this.props.noteStore.header.showDelete}
      ></ModalDialog>
    )
  }

  renderEditor = () => {
    if (this.noteType === NoteType.Note) {
      return (
        <TextInput
          defaultValue={this.props.noteStore.header.noteModel.content}
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
          onChangeText={value => this.onChangeContent(value)}
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
          {this.renderDeleteDialog()}
        </View>
      </Screen>
    )
  }
}

export default withTheme(Note)
