/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
const Stack = createNativeStackNavigator();
import { ThemeProvider, createTheme } from '@rneui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defineTheme } from './style/them';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import menus from './routes';
import Toast from 'react-native-toast-message';
import { TABLE_MAP, createTable, openDatabase } from '@common/utils/sqlite';
// import { getCommonHealth } from '@api/common';
// import { getAddressBalanceParams } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { CreateAddress, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
// eslint-disable-next-line no-undef
function App(): JSX.Element {
  const mode = useColorScheme() || 'light';
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  const openSQL = async () => {
    const open = await openDatabase();
    if (open) {
      Object.keys(TABLE_MAP).map((tabe_name) => {
        createTable(tabe_name, {
          query: `CREATE TABLE ${tabe_name} (${TABLE_MAP[tabe_name as keyof typeof TABLE_MAP]})`,
        });
      });
      // const res = await executeQuery(`SELECT * FROM asset`);
      // console.log(9999, res?.rows?.item(0));
    }
  };
  // const getInitialData = async () => {
  //   try {
  //     // const res = await getCommonHealth();
  //     // const res = await getAddressBalanceParams({
  //     //   device_id: 'string',
  //     //   wallet_uuid: 'string',
  //     //   index: 0,
  //     //   chain: 'string',
  //     //   symbol: 'string',
  //     //   network: 'string',
  //     //   address: 'string',
  //     //   contract_address: 'string',
  //     // });
  //     const res = await getUniqueId();
  //     console.log(9999, res);
  //   } catch (e) {
  //     console.log(66666, e);
  //   }
  // };

  useEffect(() => {
    // openSQL();
    // getInitialData();
    // const mnemonic = 'word';
    // const params_1 = {
    //   mnemonic: mnemonic,
    //   password: '',
    // };
    // const seed = MnemonicToSeed(params_1);
    // console.log(seed);
    // const account = CreateAddress({
    //   chain: 'eth',
    //   seedHex: seed.toString('hex'),
    //   index: '0',
    // });
    // console.log(account);
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
