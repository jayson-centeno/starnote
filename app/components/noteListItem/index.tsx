import React from 'react'
import { withTheme, Card, Caption, Paragraph, Title, Theme } from 'react-native-paper'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { truncate, unixDateTimeConverter } from '../../domain/helper'
import NoteModel from '../../domain/models/note'
import { NoteType } from '../../domain/enums'

interface INoteListemProps {
  note: NoteModel
  editClicked: (note: NoteModel) => void
  theme: Theme
}

export default withTheme((props: INoteListemProps) => {
  const renderContent = () => <Paragraph style={{ padding: 0, margin: 0 }}>{truncate(props.note.content!)}</Paragraph>
  const renderListItems = () => {
    if (props.note.items && props.note.items.length > 0) {
      return props.note.items.slice(0, 3).map(itm => (
        <Paragraph key={itm.rowIndex} style={[{ padding: 0, margin: 0 }, itm.checked ? style.textInputChecked : {}]}>
          {truncate(itm.title)}
        </Paragraph>
      ))
    }
    return
  }

  return (
    <TouchableOpacity key={props.note.id} style={[style.surface]}>
      <Card onPress={() => props.editClicked(props.note)} elevation={3} style={{ padding: 0, margin: 0 }}>
        <Title style={{ marginLeft: 15, paddingBottom: 0, marginBottom: 0 }}>{props.note.title} </Title>
        <Card.Content style={{ padding: 0, margin: 0 }}>
          {props.note.type == NoteType.Note ? renderContent() : renderListItems()}
        </Card.Content>
        <Card.Actions style={{ paddingTop: 10, paddingLeft: 0, margin: 0, paddingRight: 15 }}>
          <Caption
            style={{
              marginLeft: 15,
              paddingBottom: 0,
              paddingTop: 5,
              paddingRight: 15,
              borderTopColor: '#ccc',
              borderTopWidth: 1,
              flex: 1,
            }}
          >
            Created: {unixDateTimeConverter(props.note.createDate!)} | Modified:{' '}
            {unixDateTimeConverter(props.note.modifiedDate!)}
          </Caption>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  )
})

var style = StyleSheet.create({
  surface: {
    marginBottom: 10,
    borderColor: '#aaa',
  },
  textInputChecked: {
    textDecorationLine: 'line-through',
  },
})
