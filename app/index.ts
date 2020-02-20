import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AppStack from './stacks/bottomTabNavigatorStack'
import AuthStack from './stacks/bootStrapStack'
import NoteStack from './stacks/noteStack'

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthStack,
      App: AppStack,
      Note: NoteStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)

// import { resetDb } from './domain/helper'
// resetDb()
