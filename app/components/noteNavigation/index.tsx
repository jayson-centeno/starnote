import React from 'react'
import HeaderTitle from './headerTitle'
import HeaderRight from './headerRight'

export default ({ navigation }: any) => {
  const { edit, add, title } = {
    edit: navigation.dangerouslyGetParent().getParam('edit'),
    add: navigation.dangerouslyGetParent().getParam('add'),
    title: navigation.dangerouslyGetParent().getParam('title'),
  }

  return {
    headerRight: <HeaderRight />,
    headerTitle: <HeaderTitle title={title} navigation={navigation} />,
    headerStyle: {
      height: 30,
      backgroundColor: '#000',
      width: '100%',
    },
  }
}
