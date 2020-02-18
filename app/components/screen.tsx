import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { withTheme } from 'react-native-paper'

export default withTheme((props: any) => {
  const { children } = props
  return (
    <View style={[styles.screen]}>
      <StatusBar hidden={false} barStyle="default" />
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 24,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ceba69',
  },
  paddingWOutSubTitle: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  paddingWSubTitle: {
    paddingTop: 12,
  },
  title: {
    flexWrap: 'wrap',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 44,
    fontWeight: '600',
    letterSpacing: 8,
  },
  subTitle: {
    flexWrap: 'wrap',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 8,
    paddingBottom: 12,
  },
})
