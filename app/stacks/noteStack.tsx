import { createStackNavigator } from 'react-navigation-stack'
import Note from '../screens/note'
import NoteNavigation from '../components/noteNavigation/index'

export default createStackNavigator({
  Note: {
    screen: Note,
    navigationOptions: NoteNavigation,
  },
})
