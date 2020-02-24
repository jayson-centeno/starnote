import React from 'react'
import { withTheme } from 'react-native-paper'
import { StyleSheet, TextInput } from 'react-native'

export default withTheme((props: any) => {
  return (
    <TextInput
      defaultValue={props.noteModel.content}
      multiline={true}
      onFocus={(e: any) => props.onTitleFocus()}
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
    paddingVertical: 10,
  },
})
