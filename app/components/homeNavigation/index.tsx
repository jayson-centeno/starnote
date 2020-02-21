import React from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'
import { Title } from 'react-native-paper'
// import HomeHeaderRight from './headerRight'

export default ({ navigation }: any) => {
  const { title, icon } = {
    title: navigation.dangerouslyGetParent().getParam('title'),
    icon: navigation.dangerouslyGetParent().getParam('icon'),
  }

  const color = '#FFD4AA'

  return {
    headerLeft: (
      <TouchableWithoutFeedback
        style={{
          marginRight: 10,
          paddingTop: 0,
          paddingLeft: 10,
          paddingBottom: 55,
        }}
      >
        <View style={[globalStyle.flexRow]}>
          <View style={{ paddingTop: 7, paddingRight: 5 }}>
            <Icon name={icon} color={color} />
          </View>
          <View style={{ paddingRight: 5, paddingTop: 2 }}>
            <Title style={{ color: color }}>{title}</Title>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ),
    // headerRight: <HomeHeaderRight navigation />,
    headerStyle: {
      height: 30,
      backgroundColor: '#000',
    },
  }
}
