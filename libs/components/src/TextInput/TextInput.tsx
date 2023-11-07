import { TextInputProps, TextInput as RNTextInput } from 'react-native-paper'


const TextInput = (props: TextInputProps) => {
    return (
        <RNTextInput
            {...props}
            style={[props.style]}
            mode="outlined"
            autoCapitalize="none"
            autoComplete="off"
        />
    )
}

export default TextInput