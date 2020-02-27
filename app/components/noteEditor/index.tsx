import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { BackHandler, Keyboard, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalDialog from '../../components/dialog'
import Screen from '../../components/screen'
import { STORES } from '../../domain/constants'
import { NoteType } from '../../domain/enums'
import { INoteProps } from '../../domain/interfaces/components'
import NoteItemModel from '../../domain/models/noteItem'
import NoteToolBar from './bottomToolbars/defaultToolbar'
import ListItemToolBar from './bottomToolbars/listItemToolbar'
import Editor from './editor'
import ListNote from './list'
import NoteTitle from './title'
import { withTheme } from 'react-native-paper'

@inject(STORES.NoteStore)
@observer
class Note extends Component<INoteProps, any> {
  backHandler: any

  constructor(props: INoteProps) {
    super(props)
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this))
  }

  componentWillUnmount = () => {
    this.backHandler.remove()
  }

  handleBackPress = async () => {
    console.log('back pressed')

    Keyboard.dismiss()

    if (this.props.noteStore!.header.showDelete) {
      this.props.noteStore!.header.showDelete = false
      return true
    }

    if (this.props.noteStore!.header.listEditMode) {
      this.props.noteStore!.header.listEditMode = false
      return true
    }

    if (this.props.noteStore!.header.isEditing) {
      await this.saveRecord()
      this.props.navigation.closeDrawer()
      this.props.noteStore!.header.showAddOption = true
      this.props.noteStore!.clearModel()
      return true
    }

    if (this.props.navigation.state.isDrawerOpen) {
      this.props.navigation.closeDrawer()
      // this.props.noteStore!.clearModel()
      this.props.noteStore!.header.showAddOption = true
      return true
    }

    BackHandler.exitApp()
    return false
  }

  saveRecord = async () => {
    await this.props.noteStore!.save()
    // if (this.props.noteStore?.header.isNew) {
    //   this.props.noteStore?.resetIsNew()
    //   await this.props.noteStore!.loadNotes()
    // }
    Keyboard.dismiss()
  }

  get noteType(): NoteType {
    return this.props.noteStore!.header.noteModel.type
  }

  onTitleFocus = (): void => {
    // this.props.noteStore!.header.isEditing = true
  }

  onChangeContent = (value: string): void => {
    this.props.noteStore!.header.isEditing = true
    this.props.noteStore!.header.noteModel.content = value
  }

  onItemEdit = () => {
    this.props.noteStore!.header.isEditing = true
  }

  onDelete = async (value: boolean) => {
    if (value) {
      const result = await this.props.noteStore!.delete(this.props.noteStore!.header.noteModel)
      if (result) {
        this.props.navigation.closeDrawer()
      }
    }

    this.props.noteStore!.header.showDelete = false
  }

  showDeleteDialog = (): void => {
    this.props.noteStore!.header.showDelete = true
  }

  onAddItem = (): void => {
    this.props.noteStore!.header.isEditing = true
    this.props.noteStore!.addListItem(
      new NoteItemModel({
        title: '',
        checked: false,
        rowIndex: 0,
      })
    )
  }

  onDeleteItem = (item: NoteItemModel): void => {
    this.props.noteStore!.header.isEditing = true
    this.props.noteStore!.removeSelectedItem(item)
  }

  switchToEditMode = (value: boolean) => (this.props.noteStore!.header.listEditMode = value)

  onItemChecked = (selectedModel: NoteItemModel, value: boolean) => {
    this.props.noteStore!.header.isEditing = true
    this.props.noteStore!.checkedItem(selectedModel, value)
  }

  changeTitle = (value: string): void => {
    this.props.noteStore!.header.isEditing = true
    this.props.noteStore!.header.noteModel.title = value
  }

  renderEditor = (): React.ReactNode => {
    if (this.noteType === NoteType.Note) {
      return (
        <View>
          <Editor
            noteModel={this.props.noteStore!.header.noteModel}
            onTitleFocus={() => this.onTitleFocus()}
            onChangeContent={(value: string) => this.onChangeContent(value)}
          />
        </View>
      )
    } else {
      return (
        <KeyboardAwareScrollView extraScrollHeight={70} extraHeight={70} enableOnAndroid={true}>
          <View style={[styles.editorWrapper]}>
            <ListNote
              onDeleteItem={data => this.onDeleteItem(data)}
              onItemEdit={() => this.onItemEdit()}
              listEditMode={this.props.noteStore!.header.listEditMode}
              items={this.props.noteStore!.header.noteModel.items!?.slice()}
              onItemChecked={(selectedModel: NoteItemModel, value: boolean) => this.onItemChecked(selectedModel, value)}
            />
          </View>
        </KeyboardAwareScrollView>
      )
    }
  }

  render() {
    return (
      <Screen>
        <NoteToolBar
          visible={!this.props.noteStore!.header.isNew && this.props.noteStore!.header.noteModel.type == NoteType.Note}
          onShowDeleteDialog={() => this.showDeleteDialog()}
          onSave={() => this.saveRecord()}
          isEdit={this.props.noteStore!.header.isEditing}
        />
        <ListItemToolBar
          isEdit={this.props.noteStore!.header.isEditing}
          onSave={() => this.saveRecord()}
          isNewNote={this.props.noteStore!.header.isNew}
          visible={this.props.noteStore!.header.noteModel.type == NoteType.List}
          onAddItem={() => this.onAddItem()}
          onDeleteNote={() => this.showDeleteDialog()}
          switchToEditMode={(value: boolean) => this.switchToEditMode(value)}
          isArrangeMode={this.props.noteStore!.header.listEditMode}
        />
        <NoteTitle
          noteModel={this.props.noteStore!.header.noteModel}
          isEditing={this.props.noteStore!.header.isEditing}
          changeTitle={(value: string) => this.changeTitle(value)}
          onTitleFocus={() => this.onTitleFocus()}
        />
        {this.renderEditor()}
        <ModalDialog
          onDelete={(value: boolean) => this.onDelete(value)}
          visible={this.props.noteStore!.header.showDelete}
          deleteDismissed={() => (this.props.noteStore!.header.showDelete = false)}
        ></ModalDialog>
      </Screen>
    )
  }
}

export default withTheme(Note)

const styles = StyleSheet.create({
  editorWrapper: {
    marginHorizontal: 10,
    marginBottom: 70,
  },
})
