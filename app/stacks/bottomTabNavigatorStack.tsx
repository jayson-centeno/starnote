import React from 'react'
import Home from '../screens/home'
import Login from '../screens/login'
import Settings from '../screens/settings'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import TabBarIcon from '../components/tabBarIcon'
import { createStackNavigator } from 'react-navigation-stack'
import Navigation from '../components/homeHeaderToolbar'
import ThemeScreen from '../screens/theme'
import { NAVIGATION } from '../domain/constants'

const HomeStack = createStackNavigator({
  Notes: {
    screen: Home,
    navigationOptions: Navigation,
  },
})

const ThemeStack = createStackNavigator({
  Theme: {
    screen: ThemeScreen,
    navigationOptions: Navigation,
  },
})

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: Navigation,
  },
})

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: Navigation,
  },
})

export default createMaterialBottomTabNavigator(
  {
    Notes: {
      screen: HomeStack,
      params: {
        title: 'Star Notes',
        icon: 'star',
        default: true,
      },
      navigationOptions: {
        tabBarIcon: ({ focused }: any) => {
          return <TabBarIcon name="description" focused={focused} />
        },
      },
    },
    Theme: {
      screen: ThemeStack,
      params: {
        title: 'Themes',
        icon: 'brush',
      },
      navigationOptions: {
        tabBarIcon: ({ focused }: any) => {
          return <TabBarIcon name="brush" focused={focused} />
        },
      },
    },
    Settings: {
      screen: SettingsStack,
      params: {
        title: 'Settings',
        icon: 'settings',
      },
      navigationOptions: {
        tabBarIcon: ({ focused }: any) => {
          return <TabBarIcon name="settings" focused={focused} />
        },
      },
    },
    Login: {
      screen: AuthStack,
      params: {
        title: 'Login',
        icon: 'lock',
      },
      navigationOptions: {
        tabBarIcon: ({ focused }: any) => {
          return <TabBarIcon name="lock" focused={focused} />
        },
      },
    },
  },
  {
    initialRouteName: NAVIGATION.NOTES,
    labeled: true,
    shifting: false,
  }
)
