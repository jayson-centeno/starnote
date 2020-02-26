import React from 'react'
import { withTheme, Theme } from 'react-native-paper'
import { StyleSheet, TextInput } from 'react-native'
import NoteModel from 'app/domain/models/note'

interface INoteEditor {
  noteModel: NoteModel
  onTitleFocus: () => void
  onChangeContent: (content: string) => void
  theme: Theme
}

export default withTheme((props: INoteEditor) => {
  return (
    <TextInput
      defaultValue={props.noteModel.content}
      multiline={true}
      onFocus={() => props.onTitleFocus()}
      placeholderTextColor="#aaa"
      disableFullscreenUI={true}
      selectionColor="#aaa"
      textAlignVertical="top"
      autoFocus={true}
      placeholder="Type your Notes here!"
      style={styles.contentInput}
      onChangeText={value => props.onChangeContent(value)}
    ></TextInput>
  )
})

const styles = StyleSheet.create({
  contentInput: {
    fontSize: 20,
    borderTopWidth: 0,
    height: '100%',
    zIndex: 0,
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
})
