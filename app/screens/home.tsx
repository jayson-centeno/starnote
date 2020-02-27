import React from 'react'
import { View, StyleSheet } from 'react-native'
import Screen from '../components/screen'
import globalStyle from '../globalStyle'
import { NoteType } from '../domain/enums'
import { Theme, withTheme } from 'react-native-paper'
import { observer, inject } from 'mobx-react'
import { STORES } from '../domain/constants'
import { IHomeState, IHomeProps } from '../domain/interfaces/components'
import NoteModel from '../domain/models/note'
import HomeOptions from '../components/homeAddOptions'
import NoteItemModel from '../domain/models/noteItem'
import NoteCards from '../components/noteCards'

@inject(STORES.NoteStore)
@observer
class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount = async () => {
    await this.props.noteStore.loadNotes()
  }

  get Theme(): Theme {
    return this.props.theme
  }

  editClicked = async (note: NoteModel) => {
    const result = await this.props.noteStore.edit(note)
    if (result) {
      this.props.navigation.openDrawer()
      this.props.noteStore.header.showAddOption = false
    }
  }

  newNoteClicked = (type: NoteType): void => {
    this.props.noteStore.add(
      new NoteModel({
        type: type,
        title: '',
        rank: 0,
        items: type == NoteType.List ? new Array<NoteItemModel>(0) : undefined,
      })
    )
    this.props.noteStore.header.showAddOption = false
    this.props.navigation.openDrawer()
  }

  render() {
    const { notes } = this.props.noteStore.header
    return (
      <Screen title="Star Notes" hideStatus={false}>
        <View style={[globalStyle.innerScreen]}>
          <View style={[style.surface]}>
            <NoteCards
              theme={this.Theme}
              editClicked={(model: NoteModel) => this.editClicked(model)}
              notes={notes}
              cardView={this.props.noteStore.header.cardView}
            ></NoteCards>
          </View>
        </View>
        <HomeOptions
          showOption={this.props.noteStore.header.showAddOption}
          newNoteClicked={noteType => this.newNoteClicked(noteType)}
        />
      </Screen>
    )
  }
}

export default withTheme(Home)

var style = StyleSheet.create({
  surface: {
    marginBottom: 10,
  },
})
