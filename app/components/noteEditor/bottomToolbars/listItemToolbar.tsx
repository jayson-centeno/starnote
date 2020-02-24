import React from 'react'
import { withTheme, Appbar, Theme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import globalStyle from '../../../globalStyle'

interface IListItemToolbar {
  theme: Theme
  onShowAddListItemDialog: () => void
  onShowDeleteDialog: () => void
  visible: boolean
}

export default withTheme((props: IListItemToolbar) => {
  if (props.visible) {
    return (
      <Appbar theme={props.theme} style={[globalStyle.rightContent, styles.bottom]}>
        <Appbar.Action size={30} icon="delete" onPress={() => props.onShowDeleteDialog()} />
        <Appbar.Action size={30} icon="add-circle-outline" onPress={() => props.onShowAddListItemDialog()} />
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
