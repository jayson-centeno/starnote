import React from 'react'
import { withTheme } from 'react-native-paper'
import { StyleSheet, TextInput } from 'react-native'

export default withTheme((props: any) => {
  return (
    <TextInput
      defaultValue={props.noteModel.title}
      onFocus={() => props.onTitleFocus()}
      placeholder="Type the Title here!"
      placeholderTextColor="#888"
      disableFullscreenUI={true}
      autoFocus={props.isEditing}
      selectTextOnFocus={false}
      selectionColor="#aaa"
      onChangeText={value => props.changeTitle(value)}
      style={style.titleInput}
    ></TextInput>
  )
})

var style = StyleSheet.create({
  titleInput: {
    color: '#000',
    backgroundColor: '#ddd',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 0,
  },
})
