import React, { Component } from 'react'
import globalStyle from '../../globalStyle'
import { View, TextInput, TouchableNativeFeedback, Keyboard } from 'react-native'
import Icon from '../Icon'
import { inject, observer } from 'mobx-react'
import { withTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper'
import { HeaderStore } from 'app/core/stores/headerStore'

interface IHeaderTitleProps {
  title: string
  navigation: any
  headerStore: HeaderStore
  theme: Theme
}

interface IHeaderTitleState {
  edit: boolean
  lastPress: number
}

@inject('headerStore')
@observer
class HeaderTitle extends Component<IHeaderTitleProps, IHeaderTitleState> {
  constructor(props: any) {
    super(props)

    Keyboard.addListener('keyboardDidHide', () => {
      this.saveRecord()
    })
  }

  backClicked = () => {
    this.props.navigation.navigate('Notes')
  }

  saveClicked = () => {
    Keyboard.dismiss()
    this.saveRecord()
  }

  saveRecord = () => {
    this.props.headerStore.header.edit = false
  }

  onFocus = () => {
    this.props.headerStore.header.edit = true
  }

  get title() {
    return this.props.headerStore.header.title
  }

  renderInput = (title: string) => {
    return (
      <TextInput
        defaultValue={title}
        onFocus={() => this.onFocus()}
        disableFullscreenUI={true}
        autoFocus={true}
        selectTextOnFocus={true}
        style={{
          height: 30,
          width: 280,
          color: '#fff',
          backgroundColor: '#000',
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 3,
          fontSize: 20,
        }}
      ></TextInput>
    )
  }

  renderUpdate = () => {
    if (this.props.headerStore.header.edit) {
      return (
        <TouchableNativeFeedback onPress={() => this.saveClicked()}>
          <Icon name="done" color="#ffff" />
        </TouchableNativeFeedback>
      )
    } else {
      return (
        <TouchableNativeFeedback onPress={() => this.backClicked()}>
          <Icon name="arrow-back" color="#ffff" />
        </TouchableNativeFeedback>
      )
    }
  }

  render() {
    return (
      <View
        style={{
          marginRight: 20,
          marginTop: 0,
          marginLeft: 10,
          marginBottom: 55,
        }}
      >
        <View style={[globalStyle.flexRow]}>
          <View
            style={{
              marginTop: 6,
              marginRight: 5,
            }}
          >
            {this.renderUpdate()}
          </View>
          <View style={{ marginRight: 5 }}>{this.renderInput(this.title)}</View>
        </View>
      </View>
    )
  }
}

export default withTheme(HeaderTitle)
