import React from 'react'
import { Theme, withTheme } from 'react-native-paper'
import { StyleSheet, View, Animated, Text, TextInput } from 'react-native'
import { createDndContext } from 'react-native-easy-dnd'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'
import NoteItemModel from '../../domain/models/noteItem'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
const { Provider, Droppable, Draggable } = createDndContext()

interface IListProps {
  theme: Theme
  items: Array<NoteItemModel>
  listEditMode: boolean
  onSelectItem: (data: NoteItemModel) => void
  onItemChecked: (data: NoteItemModel, value: boolean) => void
}

export default withTheme((props: IListProps) => {
  const renderDragable = (): React.ReactNode => {
    if (!props.items || props.items.length === 0) {
      return
    }

    return props.items.map((data: NoteItemModel, index: number) => (
      <View style={[globalStyle.relative]} key={index}>
        <Draggable payload={data}>
          {({ viewProps }) => {
            return (
              <Animated.View {...viewProps} style={[viewProps.style, styles.draggbleViewWrapper]}>
                <View style={[globalStyle.centerContent]}>
                  <Icon name="drag-handle" color={props.theme.colors.background}></Icon>
                </View>
                <View style={[styles.draggableTitle, globalStyle.leftContent]}>
                  <Text style={[styles.textInput]}>{data.title}</Text>
                </View>
              </Animated.View>
            )
          }}
        </Draggable>
        <Droppable
          onDrop={({ payload }) => {
            console.log('Draggable with the following payload was dropped', payload)
          }}
        >
          {({ active, viewProps }) => {
            return (
              <Animated.View
                {...viewProps}
                style={[
                  {
                    backgroundColor: active ? props.theme.colors.accent : 'transparent',
                  },
                  styles.dropItem,
                  viewProps.style,
                ]}
              ></Animated.View>
            )
          }}
        </Droppable>
      </View>
    ))
  }

  const renderNonDraggable = (): React.ReactNode => {
    if (!props.items || props.items.length === 0) {
      return
    }
    return props.items.map((data: NoteItemModel, index: number) => (
      <TouchableWithoutFeedback onPressIn={() => props.onSelectItem(data)} style={[styles.mainWrapper]} key={index}>
        <View style={[styles.inputWrapper, globalStyle.leftContent]}>
          <TextInput
            defaultValue={data.title}
            placeholderTextColor="#aaa"
            disableFullscreenUI={true}
            autoFocus={false}
            placeholder="Type your note here."
            onChangeText={value => (data.title = value)}
            style={[styles.textInput, data.checked ? styles.textInputChecked : {}]}
          />
        </View>
        <View style={[styles.iconWrapper, globalStyle.rightContent]}>
          <Icon
            name={data.checked ? 'check-circle' : 'radio-button-unchecked'}
            color={props.theme.colors.background}
            size={30}
            onPress={() => props.onItemChecked(data, !data.checked)}
          />
        </View>
      </TouchableWithoutFeedback>
    ))
  }

  if (props.listEditMode) {
    return <Provider>{renderDragable()}</Provider>
  } else {
    return <View>{renderNonDraggable()}</View>
  }
})

const styles = StyleSheet.create({
  dropItem: {
    position: 'absolute',
    width: '105%',
    height: '100%',
    marginLeft: -10,
  },
  mainWrapper: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: -10,
    width: '105%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  draggbleViewWrapper: {
    flexDirection: 'row',
    borderTopColor: 'red',
    borderBottomColor: 'red',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    marginLeft: -10,
    width: '105%',
  },
  inputWrapper: { flex: 2, paddingHorizontal: 5 },
  iconWrapper: { paddingBottom: 5 },
  draggableTitle: {
    flex: 2,
    paddingLeft: 0,
  },
  textInput: {
    fontSize: 16,
    paddingRight: 10,
    width: '100%',
  },
  textInputChecked: {
    textDecorationLine: 'line-through',
  },
  listItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 0,
    margin: 0,
  },
})
