import React from 'react'
import { View, Text, Button } from 'react-native';
import { signOut } from '@kubo-dev/kubo-auth'

const HomeScreen = () => {
    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title='Logout' onPress={signOut} />
        </View>
    )
}

export default HomeScreen