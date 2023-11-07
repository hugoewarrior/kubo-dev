import React from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView
} from 'react-native';
import { useTheme } from 'react-native-paper';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
});

const LocalStatusBar = () => {
    const theme = useTheme()
    const backgroundColor = theme.colors.background
    return (
        <View style={[styles.statusBar, { backgroundColor }]}>
            <SafeAreaView>
                <StatusBar backgroundColor={backgroundColor} barStyle="light-content" />
            </SafeAreaView>
        </View>
    )
}

export default LocalStatusBar