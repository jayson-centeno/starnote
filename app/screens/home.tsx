import React from 'react'
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Screen from '../components/screen'
import globalStyle from '../globalStyle'
import Icon from '../components/Icon'
import { NoteType } from '../core/enums/appEnum'
import { Theme } from 'react-native-paper'
import { observer, inject } from 'mobx-react'
import { withTheme } from 'react-native-paper'

type IHomeState = {
  showAdd: boolean
  screenWidth: number
  screenHeight: number
}

@inject('headerStore')
@observer
class Home extends React.Component<any, IHomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      showAdd: false,
      screenWidth: Math.round(Dimensions.get('window').width),
      screenHeight: Math.round(Dimensions.get('window').height),
    }

    console.log(this.props.headerStore.header.showCalc)
  }

  // componentDidMount = () => {
  //   Dimensions.addEventListener('change', e => {
  //     this.setState(() => {
  //       return {
  //         screenWidth: e.window.width,
  //         screenHeight: e.window.height,
  //       }
  //     })
  //   })
  // }

  get Theme(): Theme {
    return this.props.theme
  }

  addClicked = () => {
    this.setState(() => {
      return {
        showAdd: !this.state.showAdd,
      }
    })
  }

  addNoteClicked = (type: NoteType) => {
    this.props.navigation.navigate('Note', {
      edit: true,
      add: false,
      type: type,
      title: 'New Note',
    })
  }

  hideOptions() {
    this.setState(() => {
      return {
        showAdd: false,
      }
    })
  }

  renderHideShowOptions = () => {
    const noteOptions = {
      size: 40,
      color: this.Theme.colors.primary,
    }

    if (this.state.showAdd) {
      return (
        <View>
          <View
            style={[
              homeStyle.noteOptionList,
              globalStyle.centerContent,
              { backgroundColor: this.Theme.colors.background, borderColor: this.Theme.colors.primary },
            ]}
          >
            <TouchableOpacity onPress={() => this.addNoteClicked(NoteType.List)}>
              <Icon name="format-list-bulleted" size={noteOptions.size} color={noteOptions.color}></Icon>
            </TouchableOpacity>
          </View>
          <View
            style={[
              homeStyle.noteOptionNote,
              globalStyle.centerContent,
              { backgroundColor: this.Theme.colors.background, borderColor: this.Theme.colors.primary },
            ]}
          >
            <TouchableOpacity onPress={() => this.addNoteClicked(NoteType.Note)}>
              <Icon name="description" size={noteOptions.size} color={noteOptions.color}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return null
  }

  render() {
    const dynamicStyle = {
      marginTop: this.state.screenHeight * 0.1,
    }

    return (
      <Screen title="Star Notes" hideStatus={false}>
        <View style={[globalStyle.innerScreen, { position: 'relative' }]}>
          <View style={[globalStyle.centerContent, dynamicStyle]}>
            <TouchableOpacity onPress={() => this.addClicked()} onBlur={() => this.addClicked()}>
              <Icon name="add-circle" size={100} color={this.Theme.colors.backdrop}></Icon>
            </TouchableOpacity>
            {this.renderHideShowOptions()}
          </View>
        </View>
      </Screen>
    )
  }
}

var homeStyle = StyleSheet.create({
  noteOptionList: {
    position: 'absolute',
    top: -75,
    left: 60,
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
  },
  noteOptionNote: {
    position: 'absolute',
    top: -75,
    right: 60,
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 1,
  },
})

export default withTheme(Home)
