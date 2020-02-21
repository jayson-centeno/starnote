import TabNavigator from './bottomTabNavigatorStack'
import Navigator from '../components/navigator'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Dimensions } from 'react-native'

export default createDrawerNavigator(
  {
    Notes: {
      screen: TabNavigator,
      navigationOptions: {
        // drawerLockMode: 'locked-closed',
      },
    },
  },
  {
    initialRouteName: 'Notes',
    drawerPosition: 'right',
    drawerType: 'slide',
    contentComponent: Navigator,
    keyboardDismissMode: 'none',
    unmountInactiveRoutes: true,
    drawerWidth: () => {
      return Dimensions.get('window').width
    },
    edgeWidth: 0,
    hideStatusBar: false,
    navigationOptions: {
      gesturesEnabled: false,
      initialRouteName: 'Notes',
      backBehavior: 'initialRoute',
    },
    drawerBackgroundColor: '#fff',
  }
)
