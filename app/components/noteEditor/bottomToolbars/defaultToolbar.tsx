import React from 'react'
import { withTheme, Appbar, Theme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import globalStyle from '../../../globalStyle'

interface INoteToolbar {
  theme: Theme
  onShowDeleteDialog: () => void
  visible: boolean
  onSave: () => void
  isEdit: boolean
}

export default withTheme((props: INoteToolbar) => {
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
        <Appbar.Action icon="favorite" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="star" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="alarm" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="delete" onPress={() => props.onShowDeleteDialog()} />
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
