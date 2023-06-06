/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { useColorScheme } from 'react-native';
const Stack = createNativeStackNavigator();
import { ThemeProvider, createTheme } from '@rneui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defineTheme } from './style/them';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import menus from './routes';

function App(): JSX.Element {
  const mode = useColorScheme() || 'light';
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <NavigationContainer
          theme={
            mode === 'dark'
              ? {
                  dark: true,
                  colors: DarkTheme.colors,
                }
              : {
                  dark: false,
                  colors: DefaultTheme.colors,
                }
          }
        >
          <Stack.Navigator>
            {menus.map((menu) => (
              <Stack.Screen key={menu.name} {...menu} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
