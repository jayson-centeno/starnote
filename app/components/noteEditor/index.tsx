import { NoteType } from '../../domain/enums'
import React, { Component } from 'react'
import Screen from '../../components/screen'
import { observer, inject } from 'mobx-react'
import { withTheme } from 'react-native-paper'
import { BackHandler, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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

  onAddItem = (): void =>
    this.props.noteStore!.addListItem(
      new NoteItemModel({
        title: '',
        checked: false,
        rowIndex: 0,
      })
    )

  onSelectItem = (seletedModel: NoteItemModel): void => {
    this.props.noteStore!.selectItem(seletedModel)
  }

  onDeleteItem = (): void => this.props.noteStore!.removeSelectedItem()

  switchToEditMode = (value: boolean) => (this.props.noteStore!.header.listEditMode = value)

  onItemChecked = (selectedModel: NoteItemModel, value: boolean) => {
    this.props.noteStore!.checkedItem(selectedModel, value)
  }

  renderDeleteDialog = (): React.ReactNode => (
    <ModalDialog
      onDelete={(value: boolean) => this.onDelete(value)}
      visible={this.props.noteStore!.header.showDelete}
      deleteDismissed={() => (this.props.noteStore!.header.showDelete = false)}
    ></ModalDialog>
  )

  changeTitle = (value: string): void => {
    this.props.noteStore!.header.noteModel.title = value
  }

  renderTitle = (): React.ReactNode => (
    <NoteTitle
      noteModel={this.props.noteStore!.header.noteModel}
      isEditing={this.props.noteStore!.header.isEditing}
      changeTitle={(value: string) => this.changeTitle(value)}
      onTitleFocus={() => this.onTitleFocus()}
    />
  )

  renderEditor = () => {
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
          onSelectItem={(model: NoteItemModel) => this.onSelectItem(model)}
          onItemChecked={(selectedModel: NoteItemModel, value: boolean) => this.onItemChecked(selectedModel, value)}
        />
      )
    }
  }

  render() {
    return (
      <Screen>
        <NoteToolBar
          visible={!this.props.noteStore!.header.isNew && this.props.noteStore!.header.noteModel.type == NoteType.Note}
          onShowDeleteDialog={() => this.showDeleteDialog()}
        />
        <ListItemToolBar
          isNewNote={this.props.noteStore!.header.isNew}
          visible={this.props.noteStore!.header.noteModel.type == NoteType.List}
          onAddItem={() => this.onAddItem()}
          onDeleteItem={() => this.onDeleteItem()}
          onDeleteNote={() => this.showDeleteDialog()}
          switchToEditMode={(value: boolean) => this.switchToEditMode(value)}
          isArrangeMode={this.props.noteStore!.header.listEditMode}
        />
        <View>{this.renderTitle()}</View>
        <KeyboardAwareScrollView extraScrollHeight={70} extraHeight={70} enableOnAndroid={true}>
          <View style={{ marginHorizontal: 10, marginBottom: 60 }}>{this.renderEditor()}</View>
        </KeyboardAwareScrollView>
        {this.renderDeleteDialog()}
      </Screen>
    )
  }
}

export default withTheme(Note)
