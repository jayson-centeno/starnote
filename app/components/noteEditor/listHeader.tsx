import React from 'react'
import { withTheme } from 'react-native-paper'
import { StyleSheet, View, Animated, Text } from 'react-native'
import { createDndContext } from 'react-native-easy-dnd'
import Icon from '../Icon'
import globalStyle from '../../globalStyle'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
const { Provider, Droppable, Draggable } = createDndContext()

export default withTheme((props: any) => {
  const getdata = () => {
    return [1, 2, 3, 4, 5].map((data, index) => {
      return (
        <View style={{ position: 'relative', backgroundColor: '#fff' }} key={index}>
          <Draggable payload={data}>
            {({ viewProps }) => {
              return (
                <Animated.View
                  {...viewProps}
                  style={[
                    viewProps.style,
                    { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
                  ]}
                >
                  <View style={[globalStyle.centerContent]}>
                    <Icon name="drag-handle" color="#000"></Icon>
                  </View>
                  <View style={[{ flex: 2, paddingLeft: 0 }, globalStyle.leftContent]}>
                    <Text style={[styles.textInput]}>{index.toString()}</Text>
                  </View>
                  <View style={[globalStyle.centerContent]}>
                    <Icon name="check-circle" color="#000"></Icon>
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
                      backgroundColor: active ? '#ddd' : 'transparent',
                    },
                    styles.dropItem,
                    viewProps.style,
                  ]}
                >
                  <Animated.View {...viewProps} style={[viewProps.style]}></Animated.View>
                </Animated.View>
              )
            }}
          </Droppable>
        </View>
      )
    })
  }

  const getNonDraggableData = () => {
    return [1, 2, 3, 4, 5].map((data, index) => {
      return (
        <TouchableOpacity
          onLongPress={() => {
            console.log('long pressed')
            props.switchToEditMode(true)
          }}
          style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
          key={index}
        >
          <View style={[globalStyle.centerContent]}>
            <Icon name="drag-handle" color="#000"></Icon>
          </View>
          <View style={[{ flex: 2, paddingLeft: 0 }, globalStyle.leftContent]}>
            <Text style={[styles.textInput]}>{index.toString()}</Text>
          </View>
          <View style={[globalStyle.centerContent]}>
            <Icon name="check-circle" color="#000"></Icon>
          </View>
        </TouchableOpacity>
      )
    })
  }

  if (props.listEditMode) {
    return <Provider>{getdata()}</Provider>
  } else {
    return <View>{getNonDraggableData()}</View>
  }
})

const styles = StyleSheet.create({
  dropItem: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textInput: {
    color: '#000',
    backgroundColor: 'transparent',
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 18,
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
