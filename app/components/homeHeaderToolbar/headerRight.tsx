import React from 'react'
import { withTheme, Theme, Menu, Divider } from 'react-native-paper'
import { NoteStore } from '../../domain/stores/noteStore'
import { View } from 'react-native'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'
import { inject, observer } from 'mobx-react'
import { STORES } from '../../domain/constants'
import { CardView } from '../../domain/enums'

interface IHomeHeaderRightProps {
  navigation: any
  noteStore?: NoteStore
  theme: Theme
}

const headerNav = withTheme((props: IHomeHeaderRightProps) => {
  const [showOptions, setShowOptions] = React.useState(false)
  const [viewOptions, setViewOptions] = React.useState(false)

  const setCardView = (cardView: CardView) => {
    props.noteStore?.setCardView(cardView)
    setViewOptions(false)
  }

  return (
    <View style={[globalStyle.flexRow]}>
      <View style={{ marginRight: 10, marginBottom: 15 }}>
        <Icon name="search" />
      </View>
      <View style={{ marginRight: 10, marginBottom: 15 }}>
        <Menu
          visible={viewOptions}
          onDismiss={() => setViewOptions(false)}
          anchor={<Icon name="view-headline" onPress={() => setViewOptions(true)} />}
        >
          <Menu.Item icon={'view-stream'} onPress={() => setCardView(CardView.ListView)} title="List View" />
          <Menu.Item icon={'view-column'} onPress={() => setCardView(CardView.GridView)} title="Grid View" />
        </Menu>
      </View>
      <View style={{ marginRight: 10, marginBottom: 15 }}>
        <Menu
          visible={showOptions}
          onDismiss={() => setShowOptions(false)}
          anchor={<Icon name="more-vert" onPress={() => setShowOptions(true)} />}
        >
          <Menu.Item onPress={() => setShowOptions(false)} title="Item 1" />
          <Menu.Item onPress={() => setShowOptions(false)} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => setShowOptions(false)} title="Item 3" />
        </Menu>
      </View>
    </View>
  )
})

export default inject(STORES.NoteStore)(observer(headerNav))
