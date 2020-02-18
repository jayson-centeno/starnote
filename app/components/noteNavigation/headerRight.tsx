import React from 'react'
import { View } from 'react-native'
import Icon from '../Icon'
import { Menu, Divider, withTheme } from 'react-native-paper'
import { inject, observer } from 'mobx-react'
import globalStyle from '../../globalStyle'

const headerRight = withTheme((props: any) => {
  const [openMenu, setOpenMenu] = React.useState(false)

  const _closeMenu = () => {
    setOpenMenu(false)
  }

  const _openMenu = () => {
    setOpenMenu(true)
  }

  return (
    <View style={[{ marginRight: 10, marginBottom: 15 }, globalStyle.flexRow]}>
      <Menu
        visible={openMenu}
        onDismiss={() => _closeMenu()}
        anchor={<Icon name="more-vert" onPress={() => _openMenu()} />}
      >
        <Menu.Item
          onPress={() => {
            setOpenMenu(false)
          }}
          title="Add Map"
        />
        <Menu.Item
          onPress={() => {
            setOpenMenu(false)
          }}
          title="Add Contacts"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            setOpenMenu(false)
          }}
          title="Attachments"
        />
        <Menu.Item
          onPress={() => {
            props.headerStore.header.showCalc = true
            setOpenMenu(false)
          }}
          title="Calculator"
        />
      </Menu>
    </View>
  )
})

export default inject('headerStore')(observer(headerRight))
