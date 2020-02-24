import { NoteType } from '../../domain/enums'
import React, { Component } from 'react'
import Screen from '../../components/screen'
import { observer, inject } from 'mobx-react'
import { withTheme } from 'react-native-paper'
import { BackHandler, KeyboardAvoidingView, View } from 'react-native'
import { STORES } from '../../domain/constants'
import { INoteProps } from '../../domain/interfaces/components'
import ModalDialog from '../../components/dialog'
import NoteToolBar from './bottomToolbars/defaultToolbar'
import ListItemToolBar from './bottomToolbars/listItemToolbar'
import ListNote from './list'
import NoteTitle from './title'
import Editor from './editor'
import NoteItemModel from '../../domain/models/noteItem'

@inject(STORES.NoteStore)
@observer
class Note extends Component<INoteProps, any> {
  backHandler: any

  constructor(props: INoteProps) {
    super(props)
  }

  handleBackPress = async () => {
    console.log('back pressed')

    if (this.props.noteStore!.header.showDelete) {
      this.props.noteStore!.header.showDelete = false
      return false
    }

    if (this.props.noteStore!.header.listEditMode) {
      this.props.noteStore!.header.listEditMode = false
      return false
    }

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

  onTitleFocus = (): void => {
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

  onShowAddListItemDialog() {
    this.props.noteStore!.addListItem(
      new NoteItemModel({
        title: '',
        checked: false,
        rowIndex: 0,
      })
    )
  }

  switchToEditMode = (value: boolean) => {
    this.props.noteStore!.header.listEditMode = value
  }

  renderDeleteDialog(): React.ReactNode {
    return (
      <ModalDialog
        onDelete={(value: boolean) => this.onDelete(value)}
        visible={this.props.noteStore!.header.showDelete}
        deleteDismissed={() => (this.props.noteStore!.header.showDelete = false)}
      ></ModalDialog>
    )
  }

  changeTitle(value: string): void {
    this.props.noteStore!.header.noteModel.title = value
  }

  renderTitle = (): React.ReactNode => {
    return (
      <NoteTitle
        noteModel={this.props.noteStore!.header.noteModel}
        isEditing={this.props.noteStore!.header.isEditing}
        changeTitle={(value: string) => this.changeTitle(value)}
        onTitleFocus={() => this.onTitleFocus()}
      />
    )
  }

  renderEditor = () => {
    console.log('list note')
    if (this.noteType === NoteType.Note) {
      return (
        <Editor
          noteModel={this.props.noteStore!.header.noteModel}
          onTitleFocus={() => this.onTitleFocus()}
          onChangeContent={(value: string) => this.onChangeContent(value)}
        />
      )
    } else {
      return (
        <ListNote
          switchToEditMode={(value: boolean) => this.switchToEditMode(value)}
          listEditMode={this.props.noteStore!.header.listEditMode}
          items={this.props.noteStore!.header.noteModel.items?.slice()}
        />
      )
    }
  }

  render() {
    return (
      <Screen>
        <NoteToolBar visible={!this.props.noteStore!.header.isNew} onShowDeleteDialog={() => this.showDeleteDialog()} />
        <ListItemToolBar
          visible={this.props.noteStore!.header.noteModel.type == NoteType.List}
          onShowAddListItemDialog={() => this.onShowAddListItemDialog()}
          onShowDeleteDialog={() => this.showDeleteDialog()}
        />
        <KeyboardAvoidingView>
          <View>{this.renderTitle()}</View>
          <View style={{ marginHorizontal: 10, marginVertical: 0 }}>{this.renderEditor()}</View>
          {this.renderDeleteDialog()}
        </KeyboardAvoidingView>
      </Screen>
    )
  }
}

export default withTheme(Note)
