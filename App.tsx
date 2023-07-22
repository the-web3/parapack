/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
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
import { openDatabase } from '@common/utils/sqlite';
import { loadMetamaskExt } from "@common/bridge/inject";

function App(): JSX.Element {
  const mode = useColorScheme() || 'light';
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  // const openSQL = () => {
  //   const open = DB.isOpen();
  //   if (!open) {
  //     DB.openSqlite()
  //       .then((res) => {
  //         console.log('数据库已打开', res);
  //         setTableData();
  //       })
  //       .catch((error) => {
  //         console.log('数据库开启失败', error);
  //       });
  //   } else {
  //     setTableData();
  //   }
  // };
  useEffect(() => {
    // openDatabase();
    // load metamask extension
    loadMetamaskExt();

  }, []);

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
