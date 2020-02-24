import React from 'react'
import { withTheme } from 'react-native-paper'
import { StyleSheet, View, Animated, Text } from 'react-native'
import { createDndContext } from 'react-native-easy-dnd'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'
import NoteItemModel from '../../domain/models/noteItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
const { Provider, Droppable, Draggable } = createDndContext()

export default withTheme((props: any) => {
  const renderDragable = () => {
    if (!props.items || props.items.length === 0) {
      return
    }

    return props.items.map((data: NoteItemModel, index: number) => {
      return (
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
      )
    })
  }

  const renderNonDraggable = () => {
    if (!props.items || props.items.length === 0) {
      return
    }

    return props.items.map((data: NoteItemModel, index: number) => {
      return (
        <TouchableOpacity
          onLongPress={() => {
            console.log('long pressed')
            props.switchToEditMode(true)
          }}
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
            paddingHorizontal: 10,
            marginLeft: -10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}
          key={index}
        >
          <View style={[{ flex: 2, paddingHorizontal: 5 }, globalStyle.leftContent]}>
            <Text style={[styles.textInput]}>{data.title}</Text>
          </View>
          <View style={[{ paddingBottom: 5 }, globalStyle.rightContent]}>
            <Icon name="radio-button-unchecked" color="#000" onPress={() => console.log('edit')}></Icon>
          </View>
        </TouchableOpacity>
      )
    })
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
    color: '#000',
    backgroundColor: 'transparent',
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    textAlignVertical: 'center',
  },
  listItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 0,
    margin: 0,
  },
})
