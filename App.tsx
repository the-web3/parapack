/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  // StyleSheet, View,
  useColorScheme,
} from 'react-native';
const Stack = createNativeStackNavigator();
import { ThemeProvider, createTheme } from '@rneui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defineTheme } from './style/them';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import menus from './routes';
import Toast from 'react-native-toast-message';
// const CustomHeader = () => {
//   return <View style={{ height: 1, backgroundColor: 'transparent' }} />;
// };
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
          <Stack.Navigator
          // screenOptions={{
          //   headerShown: true,
          //   header: () => <CustomHeader />, // 使用自定义组件作为导航栏
          // }}
          >
            {menus.map((menu) => (
              <Stack.Screen key={menu.name} {...menu} />
            ))}
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </I18nextProvider>
  );
}
// const styles = StyleSheet.create({
//   header: {
//     borderBottomWidth: 0,
//     // 添加其他标题栏样式
//   },
// });
export default App;
