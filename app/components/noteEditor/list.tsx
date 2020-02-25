import React from 'react'
import { withTheme } from 'react-native-paper'
import { StyleSheet, View, Animated, Text, TextInput } from 'react-native'
import { createDndContext } from 'react-native-easy-dnd'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'
import NoteItemModel from '../../domain/models/noteItem'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
const { Provider, Droppable, Draggable } = createDndContext()

export default withTheme((props: any) => {
  const renderDragable = () => {
    if (!props.items || props.items.length === 0) {
      return
    }

    return props.items.map((data: NoteItemModel, index: number) => (
      <View style={{ position: 'relative' }} key={index}>
        <Draggable payload={data}>
          {({ viewProps }) => {
            return (
              <Animated.View
                {...viewProps}
                style={[
                  viewProps.style,
                  {
                    flexDirection: 'row',
                    borderTopColor: props.theme.colors.backgroundColor,
                    borderTopWidth: 1,
                    borderBottomColor: props.theme.colors.backgroundColor,
                    borderBottomWidth: 1,
                    paddingVertical: 5,
                    paddingLeft: 10,
                    marginLeft: -10,
                    width: '105%',
                  },
                ]}
              >
                <View style={[globalStyle.centerContent]}>
                  <Icon name="drag-handle" color="#000"></Icon>
                </View>
                <View style={[{ flex: 2, paddingLeft: 0 }, globalStyle.leftContent]}>
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

  const renderNonDraggable = () => {
    if (!props.items || props.items.length === 0) {
      return
    }
    return props.items.map((data: NoteItemModel, index: number) => (
      <TouchableWithoutFeedback
        onPressIn={() => props.onSelectItem(data)}
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
          paddingHorizontal: 10,
          marginLeft: -10,
          width: '105%',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}
        key={index}
      >
        <View style={[{ flex: 2, paddingHorizontal: 5 }, globalStyle.leftContent]}>
          <TextInput
            defaultValue={data.title}
            placeholderTextColor="#aaa"
            disableFullscreenUI={true}
            autoFocus={true}
            placeholder="Type your note here."
            onChangeText={value => (data.title = value)}
            style={[styles.textInput, data.checked ? styles.textInputChecked : {}]}
          />
        </View>
        <View style={[{ paddingBottom: 5 }, globalStyle.rightContent]}>
          <Icon
            name={data.checked ? 'check-circle' : 'radio-button-unchecked'}
            color="#000"
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
