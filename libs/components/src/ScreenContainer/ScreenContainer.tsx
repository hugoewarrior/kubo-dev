import React, { useMemo } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleProp,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: 'transparent',
    },
});

export type ScreenContainerProps =
    {
        testID?: string;
        children?: React.ReactNode;
        style?: StyleProp<ViewStyle>;
        screenContainerStyle?: StyleProp<ViewStyle>;
        useTopInset?: boolean;
        useBottomInset?: boolean;
        useHorizontalInset?: boolean;
    }


const ScreenContainer = ({
    testID,
    children,
    style,
    screenContainerStyle,
    useTopInset = false,
    useBottomInset = true,
    useHorizontalInset = true,
}: ScreenContainerProps) => {
    // It can automatically adjust either its position or bottom padding based on the position of the keyboard.
    const content = useMemo(
        () => (
            <KeyboardAvoidingView
                testID="keyboardAvoid"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[styles.root, style]}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 100}
            >
                {children}
            </KeyboardAvoidingView>
        ),
        [children, style]
    );

    const { bottom, top } = useSafeAreaInsets();
    const containerStyle = useMemo(
        () => [
            styles.root,
            styles.container,
            screenContainerStyle,
            {
                paddingTop: useTopInset ? top || 16 : undefined,
                paddingBottom: useBottomInset ? bottom || 16 : undefined,
            },
            useHorizontalInset ? undefined : { paddingHorizontal: 0 },
        ],
        [
            bottom,
            screenContainerStyle,
            top,
            useBottomInset,
            useTopInset,
            useHorizontalInset,
        ]
    );

    return (
        <View testID={testID} style={containerStyle}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {content}
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ScreenContainer;
