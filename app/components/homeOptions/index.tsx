import React from 'react'
import { withTheme, Theme, FAB, Portal } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { NoteType } from '../../domain/enums'
import { useState } from 'react'

interface IHomeOptionProps {
  theme: Theme
  newNoteClicked: (noteType: NoteType) => void
  showOption: boolean
}

export default withTheme((props: IHomeOptionProps) => {
  const [showAddOptions, setshowAddOptions] = useState(false)

  return (
    <Portal>
      <FAB.Group
        style={style.addButton}
        visible={props.showOption}
        open={showAddOptions}
        icon="plus"
        actions={[
          { icon: 'format-list-bulleted', label: 'List', onPress: () => props.newNoteClicked(NoteType.List) },
          { icon: 'note', label: 'Note', onPress: () => props.newNoteClicked(NoteType.Note) },
        ]}
        onStateChange={({ open }) => setshowAddOptions(open)}
        onPress={() => {
          if (showAddOptions) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  )
})

var style = StyleSheet.create({
  addButton: {
    position: 'absolute',
    paddingBottom: 60,
    height: '100%',
  },
})
