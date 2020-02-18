import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'

export default (props: any) => {
    return (
        <View>
            <View>
                <Text>Test</Text>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </View >
    )
}
