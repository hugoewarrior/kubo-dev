import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Text, Button, useTheme, TextInput as RNTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer, TextInput } from '@kubo-dev/components';
import { signIn } from '@kubo-dev/kubo-auth'


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleContainer: {
        margin: 20
    },
    subtitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    centeredText: {
        textAlign: "center"
    },
    inputContainer: {
        width: "100%",
        rowGap: 10
    }
});

export const Login = () => {


    const theme = useTheme();
    const [user, setUser] = useState({ email: "", password: "" });
    const [showPw, setShowPw] = useState(true);
    const { navigate } = useNavigation();

    const login = async () => {
        try {
            //await signIn({ username: "user.test", password: "password123" })
            await signIn({ username: user.email, password: user.password });
            navigate("Home" as never);
        } catch (e) {
            console.log("error", e)
        }
    }

    return (
        <ScreenContainer useTopInset screenContainerStyle={{ backgroundColor: theme.colors.background }}>
            <View style={style.container}>
                <View style={style.titleContainer}>
                    <Text variant="titleLarge" style={style.centeredText}> Kubo </Text>
                    <View style={style.subtitleContainer}>
                        <Text variant="bodyMedium" style={style.centeredText}> Not an user yet?</Text>
                        <Button mode="text" onPress={() => console.log("rest")}>Create an account!</Button>
                    </View>
                </View>
                <View style={style.inputContainer}>
                    <TextInput
                        label="Email"
                        inputMode="email"
                        value={user.email}
                        onChangeText={(e) => setUser((l) => ({ ...l, email: e }))}
                        outlineColor='white'
                    />
                    <TextInput
                        label="Password"
                        value={user.password}
                        secureTextEntry={showPw}
                        onChangeText={(e) => setUser((l) => ({ ...l, password: e }))}
                        outlineColor='white'
                        right={<RNTextInput.Icon icon="eye" color={"white"} onPress={() => setShowPw((l) => !l)} />}
                    />

                </View>
            </View>
            <Button mode="contained" onPress={login}> Login</Button>
        </ScreenContainer >
    )
}
