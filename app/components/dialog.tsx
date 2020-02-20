import React from 'react'
import { Dialog, Paragraph, Portal, withTheme, Button } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

export default withTheme((props: any) => {
  const onDeletePressed = (value: boolean) => {
    if (value) {
      props.onDelete(true)
    } else {
      props.onDelete(false)
    }
  }

  return (
    <Portal>
      <Dialog dismissable={true} visible={props.visible}>
        <Dialog.Title>Alert</Dialog.Title>
        <Dialog.Content>
          <ScrollView>
            <Paragraph>Are you sure you want to delete and move this to recycle bin?</Paragraph>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button color="black" onPress={() => onDeletePressed(false)}>
            No
          </Button>
          <Button color="red" onPress={() => onDeletePressed(true)}>
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
})
