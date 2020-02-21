// import React from 'react'
// import { createDrawerNavigator } from 'react-navigation-drawer'
// import { createStackNavigator } from 'react-navigation-stack'
// import Home from '../screens/home'
// import Settings from '../screens/settings'
// import Navigation from '../components/homeNavigation'
// import Navigator from '../components/navigator'
// import { Text } from 'react-native'
// import globalStyle from '../globalStyle'

// const HomeStack = createStackNavigator({
//   Notes: {
//     screen: Home,
//     navigationOptions: Navigation,
//     params: {
//       title: 'Star Notes',
//     },
//   },
// })

// const ThemeStack = createStackNavigator({
//   Theme: {
//     screen: Home,
//     navigationOptions: Navigation,
//   },
// })

// const SettingsStack = createStackNavigator({
//   Settings: {
//     screen: Settings,
//     navigationOptions: Navigation,
//   },
// })

// export default createDrawerNavigator(
//   {
//     Notes: {
//       screen: HomeStack,
//       params: {
//         title: 'Star Notes',
//       },
//       navigationOptions: {
//         title: 'Notes',
//         drawerLabel: <Text style={globalStyle.menuItem}>Notes</Text>,
//       },
//     },
//     Settings: {
//       screen: SettingsStack,
//       navigationOptions: {
//         title: 'Settings',
//         drawerLabel: <Text style={globalStyle.menuItem}>Settings</Text>,
//       },
//     },
//     Theme: {
//       screen: ThemeStack,
//       navigationOptions: {
//         title: 'Theme',
//         drawerLabel: <Text style={globalStyle.menuItem}>Theme</Text>,
//       },
//     },
//   },
//   {
//     initialRouteName: 'Notes',
//     contentComponent: Navigator,
//     drawerPosition: 'left',
//     drawerType: 'front',
//     keyboardDismissMode: 'none',
//     drawerLockMode: 'unlocked',
//     unmountInactiveRoutes: true,
//     defaultNavigationOptions: {},
//     hideStatusBar: false,

//     navigationOptions: {
//       initialRouteName: '',
//       backBehavior: 'initialRoute',
//     },
//     drawerBackgroundColor: '#222',
//   }
// )
