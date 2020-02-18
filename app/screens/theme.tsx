import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Screen from '../components/screen'
import { withTheme } from 'react-native-paper'

class ThemeScreen extends Component<any> {
  render() {
    return (
      <Screen>
        <View>
          <Text>Theme</Text>
        </View>
      </Screen>
    )
  }
}

export default withTheme(ThemeScreen)
