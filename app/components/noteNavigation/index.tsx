import React from 'react'
import HeaderTitle from './headerTitle'
import HeaderRight from './headerRight'

export default ({ navigation }: any) => {
  const { title } = {
    title: navigation.dangerouslyGetParent().getParam('title'),
  }

  return {
    headerRight: <HeaderRight navigation />,
    headerTitle: <HeaderTitle title={title} navigation={navigation} />,
    headerStyle: {
      height: 30,
      backgroundColor: '#000',
      width: '100%',
    },
  }
}
