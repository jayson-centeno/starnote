import React from 'react'
import { ScrollView, BackHandler } from 'react-native'
import Screen from '../components/screen'
import globalStyle from '../globalStyle'
import { NoteType } from '../domain/enums'
import { withTheme, Theme } from 'react-native-paper'
import { observer, inject } from 'mobx-react'
import { STORES } from '../domain/constants'
import { IHomeState, IHomeProps } from '../domain/interfaces/components'
import NoteModel from '../domain/models/note'
import NoteListItem from '../components/noteListItem'
import HomeOptions from '../components/homeOptions'

@inject(STORES.NoteStore)
@observer
class Home extends React.Component<IHomeProps, IHomeState> {
  backHandler: any

  constructor(props: any) {
    super(props)
  }

  handleBackPress = async () => {
    return false
  }

  componentDidMount = async () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress.bind(this))
    this.props.noteStore.header.showAddOption = true
    await this.props.noteStore.loadNotes()
  }

  get Theme(): Theme {
    return this.props.theme
  }

  editClicked = (note: NoteModel) => {
    this.props.noteStore.edit(note)
    this.props.navigation.toggleDrawer()
    this.props.noteStore.header.showAddOption = false
  }

  newNoteClicked = (type: NoteType): void => {
    this.props.noteStore.add(new NoteModel({ type: type, title: '', rank: 0 }))
    this.props.noteStore.header.showAddOption = false
    this.props.navigation.toggleDrawer()
  }

  renderNotes = (): React.ReactNode => {
    const { notes } = this.props.noteStore.header
    if (notes.length > 0) {
      return notes.map((note: NoteModel) => (
        <NoteListItem key={note.id} note={note} editClicked={(model: NoteModel) => this.editClicked(model)} />
      ))
    }
    return
  }

  render() {
    return (
      <Screen title="Star Notes" hideStatus={false}>
        <ScrollView style={[globalStyle.innerScreen, { position: 'relative' }]}>{this.renderNotes()}</ScrollView>
        <HomeOptions
          showOption={this.props.noteStore.header.showAddOption}
          newNoteClicked={noteType => this.newNoteClicked(noteType)}
        />
      </Screen>
    )
  }
}

export default withTheme(Home)
