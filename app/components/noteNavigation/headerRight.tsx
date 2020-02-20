import React from 'react'
import { View } from 'react-native'
import Icon from '../Icon'
import { Menu, Divider, withTheme, Theme } from 'react-native-paper'
import { inject, observer } from 'mobx-react'
import globalStyle from '../../globalStyle'
import { STORES } from '../../domain/constants'
import { NoteStore } from 'app/domain/stores/noteStore'
import { NoteItemOptions } from '../../domain/enums'

interface IheaderRightProps {
  navigation: any
  noteStore?: NoteStore
  theme: Theme
}

const headerRight = withTheme((props: IheaderRightProps) => {
  const [openMenu, setOpenMenu] = React.useState(false)

  const _closeMenu = () => {
    setOpenMenu(false)
  }

  const _openMenu = () => {
    setOpenMenu(true)
  }

  const selectItem = (options: NoteItemOptions) => {
    switch (options) {
      case NoteItemOptions.Delete:
        props.noteStore!.showDeleteDialog()
        break
      default:
        break
    }

    setOpenMenu(false)
  }

  const renderDeleteMenu = (): React.ReactNode => {
    if (!props.noteStore!.header.isNew) {
      return (
        <Menu.Item
          onPress={() => {
            selectItem(NoteItemOptions.Delete)
          }}
          title="Delete"
        />
      )
    }

    return null
  }

  return (
    <View style={[{ marginRight: 10, marginBottom: 15 }, globalStyle.flexRow]}>
      <Menu
        visible={openMenu}
        onDismiss={() => _closeMenu()}
        anchor={<Icon name="more-vert" onPress={() => _openMenu()} />}
      >
        {renderDeleteMenu()}
        <Divider />
        <Menu.Item
          onPress={() => {
            selectItem(NoteItemOptions.AddMap)
          }}
          title="Add Map"
        />
        <Menu.Item
          onPress={() => {
            selectItem(NoteItemOptions.AddContacts)
          }}
          title="Add Contacts"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            selectItem(NoteItemOptions.Attachements)
          }}
          title="Attachments"
        />
        <Menu.Item
          onPress={() => {
            selectItem(NoteItemOptions.Calculator)
          }}
          title="Calculator"
        />
      </Menu>
    </View>
  )
})

export default inject(STORES.NoteStore)(observer(headerRight))
