import React from 'react'
import { Theme, Dialog, Paragraph, Portal, withTheme, Button } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'

interface IDeleteDialogProps {
  deleteDismissed: () => void
  visible: boolean
  onDelete: (value: boolean) => void
  theme: Theme
}

export default withTheme((props: IDeleteDialogProps) => {
  const onDeletePressed = (value: boolean) => props.onDelete(value)

  return (
    <Portal>
      <Dialog visible={props.visible} dismissable={true} onDismiss={() => props.deleteDismissed()}>
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
