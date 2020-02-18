import { DefaultTheme } from 'react-native-paper'

export const NAVIGATION = {
  HOME: 'Home',
  LOGIN: 'Login',
}

export const THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    backdrop: '#000',
    background: '#333',
    accent: 'yellow',
  },
}
