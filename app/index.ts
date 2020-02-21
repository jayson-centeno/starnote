import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthStack from './stacks/bootStrapStack'
import DrawerStack from './stacks/drawerStack'
// import NoteStack from './stacks/noteStack'

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthStack,
      App: DrawerStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)

// import { resetDb } from './domain/helper'
// resetDb()
