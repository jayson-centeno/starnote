import React from 'react'
import { View, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import Screen from '../components/screen'
import globalStyle from '../globalStyle'
import Icon from '../components/Icon'
import { NoteType } from '../domain/enums'
import { withTheme, Theme, Card, Paragraph, Button } from 'react-native-paper'
import { observer, inject } from 'mobx-react'
import { STORES, NAVIGATION } from '../domain/constants'
import { IHomeState, IHomeProps } from '../domain/interfaces/components'
import NoteModel from '../domain/models/note'

@inject(STORES.NoteStore)
@observer
class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: any) {
    super(props)
    this.state = {
      showAddOptions: false,
    }
  }

  componentDidMount = () => {
    if (!this.props.noteStore.header.loaded) {
      this.props.noteStore.loadNotes()
      this.props.noteStore.header.loaded = true
    }
  }

  get Theme(): Theme {
    return this.props.theme
  }

  showAddOptionsClicked = () => {
    this.setState(() => {
      return {
        showAddOptions: !this.state.showAddOptions,
      }
    })
  }

  editClicked = (note: NoteModel) => {
    this.props.noteStore.edit(note)
    this.props.navigation.navigate(NAVIGATION.NOTE)
  }

  newNoteClicked = (type: NoteType): void => {
    this.props.noteStore.add(new NoteModel({ type: type, title: 'New Note' }))
    this.props.navigation.navigate(NAVIGATION.NOTE)
  }

  hideOptions(): void {
    this.setState(() => {
      return {
        showAddOptions: false,
      }
    })
  }

  renderHideShowOptions = (): React.ReactNode => {
    const noteOptions = {
      size: 25,
      color: this.Theme.colors.primary,
    }

    if (this.state.showAddOptions) {
      return (
        <View>
          <View
            style={[
              homeStyle.noteOptionList,
              globalStyle.centerContent,
              { backgroundColor: this.Theme.colors.background, borderColor: this.Theme.colors.primary },
            ]}
          >
            <TouchableOpacity onPress={() => this.newNoteClicked(NoteType.List)}>
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
            <TouchableOpacity onPress={() => this.newNoteClicked(NoteType.Note)}>
              <Icon name="description" size={noteOptions.size} color={noteOptions.color}></Icon>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    return null
  }

  renderNotes = (): React.ReactNode => {
    const { notes } = this.props.noteStore.header
    if (notes.length > 0) {
      console.log('renderNotes', notes.length)
      return notes.map(note => (
        <TouchableHighlight key={note.id} style={[homeStyle.surface]}>
          <Card onPress={() => this.editClicked(note)} elevation={3}>
            <Card.Title title={note.title} subtitle="Note" />
            <Card.Content>
              <Paragraph>{note.content}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Edit</Button>
            </Card.Actions>
          </Card>
        </TouchableHighlight>
      ))
    }

    return
  }

  renderAddOptions = (): React.ReactNode => {
    return (
      <View>
        <TouchableOpacity style={[homeStyle.addButton]} onPress={() => this.showAddOptionsClicked()}>
          <Icon name="add-circle" size={70} color="rgba(0,0,0,0.7)"></Icon>
        </TouchableOpacity>
        {this.renderHideShowOptions()}
      </View>
    )
  }

  render() {
    return (
      <Screen title="Star Notes" hideStatus={false}>
        <ScrollView style={[globalStyle.innerScreen, { position: 'relative' }]}>{this.renderNotes()}</ScrollView>
        {this.renderAddOptions()}
      </Screen>
    )
  }
}

var homeStyle = StyleSheet.create({
  surface: {
    marginBottom: 10,
    borderColor: '#aaa',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  noteOptionList: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  noteOptionNote: {
    position: 'absolute',
    bottom: 135,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
})

export default withTheme(Home)
