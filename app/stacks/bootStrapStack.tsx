import { createStackNavigator } from 'react-navigation-stack'
import Bootstrap from '../screens/bootstrap'

export default createStackNavigator(
  {
    Bootstrap,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
)
