import { MD3LightTheme } from 'react-native-paper';


export const lightTheme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
    surfaceVariant: "white",
    background: "#051127",
    onSurface: "white"
  },
};

