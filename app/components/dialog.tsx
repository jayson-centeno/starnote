import React from 'react';
import { Dialog, Paragraph } from 'react-native-paper';
import globalStyle from '../globalStyle';
import { ScrollView } from 'react-native-gesture-handler';

export default (props: any) => {
    return (
        <Dialog style={[globalStyle.bordered, globalStyle.centerContent, globalStyle.flex, globalStyle.pad0, globalStyle.margin0]} visible={props.visible}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content style={[{ padding: 0 }, globalStyle.bordered, globalStyle.flex]}>
                <ScrollView>
                    <Paragraph>This is simple dialog</Paragraph>
                </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
                {/* <Button onPress={this._hideDialog}>Done</Button> */}
            </Dialog.Actions>
        </Dialog>
    )
}