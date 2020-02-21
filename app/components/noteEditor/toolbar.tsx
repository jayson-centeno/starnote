import React from 'react'
import { withTheme, Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import globalStyle from '../../globalStyle'

export default withTheme((props: any) => {
  if (props.visible) {
    return (
      <Appbar theme={props.theme} style={[globalStyle.rightContent, styles.bottom]}>
        <Appbar.Action icon="favorite" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="star" onPress={() => console.log('Pressed archive')} />
        <Appbar.Action icon="alarm" onPress={() => console.log('Pressed mail')} />
        <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
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
