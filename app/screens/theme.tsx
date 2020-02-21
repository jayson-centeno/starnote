import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Screen from '../components/screen'
import { withTheme } from 'react-native-paper'
import { STORES } from '../domain/constants'
import { inject, observer } from 'mobx-react'

@inject(STORES.NoteStore)
@observer
class ThemeScreen extends Component<any> {
  get showAdd() {
    return this.props.navigation.dangerouslyGetParent().getParam('default')
  }

  componentDidMount = async () => {}

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
