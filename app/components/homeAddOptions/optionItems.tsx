import React from 'react'
import { withTheme, Theme } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import globalStyle from '../../globalStyle'
import Icon from '../Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NoteType } from '../../domain/enums'

interface IOptionItemProps {
  theme: Theme
  newNoteClicked: (noteType: NoteType) => void
}

export default withTheme((props: IOptionItemProps) => {
  const noteOptions = {
    size: 25,
    color: props.theme.colors.primary,
  }

  return (
    <View>
      <View
        style={[
          style.noteOptionList,
          globalStyle.centerContent,
          { backgroundColor: props.theme.colors.background, borderColor: props.theme.colors.primary },
        ]}
      >
        <TouchableOpacity onPress={() => props.newNoteClicked(NoteType.List)}>
          <Icon name="format-list-bulleted" size={noteOptions.size} color={noteOptions.color}></Icon>
        </TouchableOpacity>
      </View>
      <View
        style={[
          style.noteOptionNote,
          globalStyle.centerContent,
          { backgroundColor: props.theme.colors.background, borderColor: props.theme.colors.primary },
        ]}
      >
        <TouchableOpacity onPress={() => props.newNoteClicked(NoteType.Note)}>
          <Icon name="description" size={noteOptions.size} color={noteOptions.color}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  )
})

var style = StyleSheet.create({
  noteOptionList: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  noteOptionNote: {
    position: 'absolute',
    bottom: 135,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
})
