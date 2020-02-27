import React from 'react'
import { withTheme } from 'react-native-paper'
import NoteModel from '../../domain/models/note'
import NoteCard from '../noteCard'
import { FlatList } from 'react-native'
import { CardView } from '../../domain/enums'

export default React.memo(
  withTheme((props: any) => {
    const colummns = props.cardView == CardView.ListView ? 1 : 2
    return (
      <FlatList
        numColumns={colummns}
        horizontal={false}
        data={props.notes.slice()}
        keyExtractor={(item: any) => item.id.toString()}
        key={colummns}
        // onEndReached={data => console.log(data)}
        // onEndReachedThreshold={10}
        renderItem={({ item }: any) => (
          <NoteCard
            cardView={props.cardView}
            note={item}
            key={item.id}
            editClicked={(model: NoteModel) => props.editClicked(model)}
          />
        )}
      />
    )
  })
)
