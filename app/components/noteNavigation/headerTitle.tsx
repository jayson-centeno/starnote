import React, { Component } from 'react'
import globalStyle from '../../globalStyle'
import { View, TextInput, TouchableNativeFeedback } from 'react-native'
import Icon from '../Icon'

interface IHeaderTitleProps {
  title: string
  navigation: any
}

interface IHeaderTitleState {
  isEditMode: boolean
  lastPress: number
}

export default class HeaderTitle extends Component<IHeaderTitleProps, IHeaderTitleState> {
  constructor(props: IHeaderTitleProps) {
    super(props)
    this.state = {
      isEditMode: false,
      lastPress: 0,
    }
  }

  editClicked = () => {
    var delta = new Date().getTime() - this.state.lastPress

    if (delta < 400) {
      this.setState(() => {
        return { isEditMode: true }
      })
    }

    this.setState(() => {
      return { lastPress: new Date().getTime() }
    })
  }

  backClicked = () => {
    this.props.navigation.navigate('Notes')
  }

  saveClicked = () => {
    this.setState(() => {
      return { isEditMode: false }
    })
  }

  renderInput = (title: string) => {
    return (
      <TextInput
        defaultValue={title}
        disableFullscreenUI={true}
        autoFocus={true}
        onBlur={() => this.saveClicked()}
        style={{
          height: 30,
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
    if (this.state.isEditMode) {
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
    const title = this.props.title

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
          <View style={{ marginRight: 5 }}>{this.renderInput(title)}</View>
        </View>
      </View>
    )
  }
}
