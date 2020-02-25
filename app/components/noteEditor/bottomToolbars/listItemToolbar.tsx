import React from 'react'
import { withTheme, Appbar, Theme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import globalStyle from '../../../globalStyle'

interface IListItemToolbar {
  theme: Theme
  onAddItem: () => void
  onDeleteItem: () => void
  onDeleteNote: () => void
  switchToEditMode: (value: boolean) => void
  isArrangeMode: boolean
  visible: boolean
  isNewNote: boolean
}

export default withTheme((props: IListItemToolbar) => {
  const renderDeleteNote = (): React.ReactNode => {
    if (!props.isNewNote) {
      return <Appbar.Action size={28} icon="delete" onPress={() => props.onDeleteNote()} />
    }
    return
  }

  if (props.visible) {
    return (
      <Appbar theme={props.theme} style={[globalStyle.rightContent, styles.bottom]}>
        {renderDeleteNote()}
        <Appbar.Action size={28} icon="unfold-more" onPress={() => props.switchToEditMode(!props.isArrangeMode)} />
        <Appbar.Action size={28} icon="clear" onPress={() => props.onDeleteItem()} />
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
    opacity: 0.8,
  },
})
