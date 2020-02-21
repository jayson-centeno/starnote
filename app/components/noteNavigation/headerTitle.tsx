import React, { Component } from 'react'
import globalStyle from '../../globalStyle'
import { View, TextInput, Keyboard, BackHandler } from 'react-native'
import Icon from '../Icon'
import { inject, observer } from 'mobx-react'
import { withTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper'
import { NoteStore } from '../../domain/stores/noteStore'
import { STORES, NAVIGATION } from '../../domain/constants'

interface IHeaderTitleProps {
  title: string
  navigation: any
  noteStore?: NoteStore
  theme: Theme
}

interface IHeaderTitleState {
  edit: boolean
  lastPress: number
}

@inject(STORES.NoteStore)
@observer
class HeaderTitle extends Component<IHeaderTitleProps, IHeaderTitleState> {
  backHandler: any

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this))
  }

  handleBackPress = async () => {
    await this.saveRecord()
    this.props.navigation.navigate(NAVIGATION.NOTES)
    return true
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  backClicked = async () => {
    Keyboard.dismiss()
    await this.saveRecord()
    this.props.navigation.navigate(NAVIGATION.NOTES)
  }

  saveRecord = async () => {
    await this.props.noteStore!.save()
  }

  onFocus = (): void => {
    // this.props.noteStore!.header.isEditing = true
  }

  get title(): string {
    return this.props.noteStore!.header.noteModel.title
  }

  changeTitle(value: string): void {
    this.props.noteStore!.header.noteModel.title = value
  }

  renderInput = (title: string): React.ReactNode => {
    var style = {
      height: 30,
      width: 280,
      color: this.props.theme.colors.accent,
      backgroundColor: '#000',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 3,
      fontSize: 20,
    }

    return (
      <TextInput
        defaultValue={title}
        onFocus={() => this.onFocus()}
        disableFullscreenUI={true}
        autoFocus={true}
        selectTextOnFocus={false}
        onChangeText={value => this.changeTitle(value)}
        style={style}
      ></TextInput>
    )
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
          <View style={{ marginRight: 5, paddingTop: 8 }}>
            <Icon
              name="arrow-back"
              size={24}
              color={this.props.theme.colors.accent}
              onPress={() => this.backClicked()}
            />
          </View>
          <View style={{ marginRight: 5 }}>{this.renderInput(this.title)}</View>
        </View>
      </View>
    )
  }
}

export default withTheme(HeaderTitle)
