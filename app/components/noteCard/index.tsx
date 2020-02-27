import React from 'react'
import { withTheme, Card, Caption, Title, Theme, Paragraph } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { truncate, unixDateTimeConverter } from '../../domain/helper'
import NoteModel from '../../domain/models/note'
import { NoteType, CardView } from '../../domain/enums'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface INoteCardProps {
  note: NoteModel
  editClicked: (note: NoteModel) => void
  theme: Theme
  cardView: CardView
}

export default React.memo(
  withTheme((props: INoteCardProps) => {
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

    const { cardView } = props
    const cardWidthStyle = cardView == CardView.ListView ? { width: '100%' } : { width: 175 }

    return (
      <TouchableOpacity
        style={[style.card, cardWidthStyle]}
        onPress={() => props.editClicked(props.note)}
        activeOpacity={0.5}
      >
        <Card elevation={3} style={[style.cardInner]}>
          <Title style={style.cardTitle}>{props.note.title} </Title>
          <Card.Content style={style.cardContent}>
            {props.note.type == NoteType.Note ? renderContent() : renderListItems()}
          </Card.Content>
          <Card.Actions style={style.cardActions}>
            <Caption style={style.cardCaption}>
              Created: {unixDateTimeConverter(props.note.createDate!)} | Modified:{' '}
              {unixDateTimeConverter(props.note.modifiedDate!)}
            </Caption>
          </Card.Actions>
        </Card>
      </TouchableOpacity>
    )
  })
)

var style = StyleSheet.create({
  card: {},
  cardInner: {
    margin: 5,
  },
  cardActions: {
    paddingTop: 10,
    paddingLeft: 0,
    margin: 0,
    paddingRight: 0,
  },
  cardContent: { padding: 0, margin: 0 },
  cardTitle: { paddingHorizontal: 15, paddingBottom: 0, marginBottom: 0 },
  cardCaption: {
    paddingLeft: 15,
    paddingBottom: 0,
    paddingTop: 5,
    paddingRight: 5,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    flex: 1,
  },
  textInputChecked: {
    textDecorationLine: 'line-through',
  },
})
