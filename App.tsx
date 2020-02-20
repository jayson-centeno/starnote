import React from 'react'
import './app/domain/di'
import { Provider } from 'mobx-react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppContainer from './app/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { THEME } from './app/domain/constants'
import stores from './app/domain/stores/index'

export default function App() {
  return (
    <PaperProvider
      theme={THEME}
      settings={{
        icon: props => <MaterialIcons {...props} />,
      }}
    >
      <Provider {...stores}>
        <AppContainer />
      </Provider>
    </PaperProvider>
  )
}
