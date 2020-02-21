import { NoteType } from '../../domain/enums'
import React, { Component } from 'react'
import Screen from '../../components/screen'
import { observer, inject } from 'mobx-react'
import { withTheme, Portal } from 'react-native-paper'
import { View, TextInput, BackHandler, StyleSheet } from 'react-native'
import globalStyle from '../../globalStyle'
import { STORES, NAVIGATION } from '../../domain/constants'
import { INoteProps } from '../../domain/interfaces/components'
import ModalDialog from '../../components/dialog'
import ToolBar from './toolbar'

@inject(STORES.NoteStore)
@observer
class Note extends Component<INoteProps, any> {
  backHandler: any

  constructor(props: INoteProps) {
    super(props)
  }

  handleBackPress = async () => {
    console.log('back pressed')

    if (this.props.noteStore!.header.isEditing) {
      await this.saveRecord()
      this.props.navigation.closeDrawer()
      this.props.noteStore!.header.showAddOption = true
      return true
    }

    BackHandler.exitApp()
    return false
  }

  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  saveRecord = async () => {
    await this.props.noteStore!.save()
    await this.props.noteStore!.loadNotes()
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this))
  }

  get noteType(): NoteType {
    return this.props.noteStore!.header.noteModel.type
  }

  onFocus = (): void => {
    this.props.noteStore!.header.isEditing = true
  }

  onChangeContent = (value: string): void => {
    this.props.noteStore!.header.noteModel.content = value
  }

  onDelete = async (value: boolean) => {
    if (value) {
      const result = await this.props.noteStore!.delete(this.props.noteStore!.header.noteModel)
      if (result) {
        await this.props.noteStore!.loadNotes()
        this.props.navigation.closeDrawer()
      }
    }

    this.props.noteStore!.header.showDelete = false
  }

  showDeleteDialog = () => {
    this.props.noteStore!.header.showDelete = true
  }

  renderDeleteDialog(): React.ReactNode {
    if (!this.props.noteStore!.header.showDelete) {
      return
    }
    return (
      <ModalDialog
        onDelete={(value: boolean) => this.onDelete(value)}
        visible={this.props.noteStore!.header.showDelete}
      ></ModalDialog>
    )
  }

  changeTitle(value: string): void {
    this.props.noteStore!.header.noteModel.title = value
  }

  renderTitle = (): React.ReactNode => {
    return (
      <TextInput
        defaultValue={this.props.noteStore!.header.noteModel.title}
        onFocus={() => this.onFocus()}
        placeholder="Type the Title here!"
        placeholderTextColor="#888"
        disableFullscreenUI={true}
        autoFocus={this.props.noteStore!.header.isEditing ? true : false}
        selectTextOnFocus={false}
        selectionColor="#aaa"
        onChangeText={value => this.changeTitle(value)}
        style={style.titleInput}
      ></TextInput>
    )
  }

  renderEditor = () => {
    if (this.noteType === NoteType.Note) {
      return (
        <TextInput
          defaultValue={this.props.noteStore!.header.noteModel.content}
          multiline={true}
          onFocus={() => this.onFocus()}
          placeholderTextColor="#aaa"
          disableFullscreenUI={true}
          selectionColor="#aaa"
          textAlignVertical="top"
          textBreakStrategy="highQuality"
          autoFocus={false}
          placeholder="Type your Notes here!"
          style={style.contentInput}
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
        <ToolBar visible={!this.props.noteStore!.header.isNew} onShowDeleteDialog={() => this.showDeleteDialog()} />
        <View style={[globalStyle.innerScreen]}>
          {this.renderTitle()}
          {this.renderEditor()}
          {this.renderDeleteDialog()}
        </View>
      </Screen>
    )
  }
}

export default withTheme(Note)

var style = StyleSheet.create({
  titleInput: {
    width: '100%',
    color: '#000',
    backgroundColor: '#ddd',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  contentInput: {
    backgroundColor: '#fff',
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    height: '100%',
    zIndex: 0,
  },
})
