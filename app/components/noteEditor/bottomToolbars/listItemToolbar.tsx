import React from 'react'
import { StyleSheet } from 'react-native'
import { Appbar, Theme, withTheme } from 'react-native-paper'
import globalStyle from '../../../globalStyle'

interface IListItemToolbar {
  theme: Theme
  onAddItem: () => void
  onDeleteNote: () => void
  onSave: () => void
  switchToEditMode: (value: boolean) => void
  isArrangeMode: boolean
  visible: boolean
  isNewNote: boolean
  isEdit: boolean
}

export default withTheme((props: IListItemToolbar) => {
  const renderDeleteNote = (): React.ReactNode => {
    if (!props.isNewNote) {
      return <Appbar.Action size={28} icon="delete" onPress={() => props.onDeleteNote()} />
    }
    return
  }

  const renderSave = () => {
    if (props.isEdit) {
      return <Appbar.Action size={28} icon="check-circle" onPress={() => props.onSave()} />
    }
    return
  }

  if (props.visible) {
    return (
      <Appbar theme={props.theme} style={[globalStyle.rightContent, styles.bottom]}>
        {renderSave()}
        {renderDeleteNote()}
        <Appbar.Action size={28} icon="favorite" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action size={28} icon="star" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action size={28} icon="unfold-more" onPress={() => props.switchToEditMode(!props.isArrangeMode)} />
        <Appbar.Action size={28} icon="add-circle-outline" onPress={() => props.onAddItem()} />
      </Appbar>
    )
  }
  return null
})

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
})
