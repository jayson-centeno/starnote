import './app/core/di/bootstrap'
import React from 'react'
import { Provider } from 'mobx-react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppContainer from './app/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { THEME } from './app/core/constants/appConstants'
import stores from './app/core/stores/index'

export default function App() {
  return (
    <Provider {...stores}>
      <PaperProvider
        theme={THEME}
        settings={{
          icon: props => <MaterialIcons {...props} />,
        }}
      >
        <AppContainer />
      </PaperProvider>
    </Provider>
  )
}
