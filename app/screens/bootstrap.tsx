import React from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'

export default class Bootstrap extends React.Component<any> {
  async componentDidMount() {
    await this.bootstrap()
  }

  bootstrap = async () => {
    // const { authStore } = this.props
    // await authStore.clearAuthData()

    // // const userToken = await authStore.getAuthData()
    // if (userToken) {
    //   //navigate to Home screen
    //   this.props.navigation.navigate('App')

    //   //dispatch auto login to prefill the stored user info
    //   // this.props.autoLogin(userToken)
    // } else {
    //   //navigate to Login page
    //   this.props.navigation.navigate('Auth')
    // }

    this.props.navigation.navigate('App')
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}
