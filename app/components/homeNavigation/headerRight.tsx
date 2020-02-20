import React from 'react'
import { withTheme, Theme } from 'react-native-paper'
import { NoteStore } from '../../domain/stores/noteStore'
import { observer, inject } from 'mobx-react'
import { STORES } from '../../domain/constants'
import { View } from 'react-native'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'

interface IHomeHeaderRightProps {
  navigation: any
  noteStore?: NoteStore
  theme: Theme
}

const headerRight = withTheme((props: IHomeHeaderRightProps) => {
  return (
    <View style={[globalStyle.flexRow]}>
      <View style={{ marginRight: 10, marginBottom: 15 }}>
        <Icon name="search" />
      </View>
      <View style={{ marginRight: 10, marginBottom: 15 }}>
        <Icon name="sort" />
      </View>
      <View style={{ marginRight: 10, marginBottom: 15 }}>
        <Icon name="more-vert" />
      </View>
    </View>
  )
})

export default inject(STORES.NoteStore)(observer(headerRight))
