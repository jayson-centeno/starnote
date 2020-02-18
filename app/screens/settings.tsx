import React, { Component } from 'react'
import Screen from '../components/screen'
import { Text, View } from 'react-native'
import { withTheme } from 'react-native-paper'

class Settings extends Component<any> {
  render() {
    return (
      <Screen hideStatus={false}>
        <View>
          <Text>Test</Text>
        </View>
      </Screen>
    )
  }
}

export default withTheme(Settings)
