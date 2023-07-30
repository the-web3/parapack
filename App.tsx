/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
const Stack = createNativeStackNavigator();
import { ThemeProvider, createTheme } from '@rneui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defineTheme } from './style/them';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import menus from './routes';
import { PrivateWalletStructure, TABLE_MAP, createTable, deleteTable, openDatabase } from '@common/utils/sqlite';
// import { getCommonHealth } from '@api/common';
import { getSymbolSupport } from '@api/symbol';
import {
  batchInsertOrUpdateAssetTable,
  getTableInfo,
  insertOrUpdateChainAssetTable,
  insertWalletAsset,
} from '@common/wallet';
import { getAddressBalance, getDeviceBalance } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
// eslint-disable-next-line no-undef
function App(): JSX.Element {
  const mode = useColorScheme() || 'light';
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  const initList = async () => {
    try {
      const res = await getSymbolSupport({});
      // const res = await getAddressBalance({
      //   address: '0xA3AFA38476cF8b967e712dD878376030f52a841A',
      //   chain: 'Ethereum',
      //   contract_address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      //   device_id: '912d3e55e6d76283',
      //   symbol: 'SHIB',
      //   wallet_uuid: '00f8f218-6256-43eb-a1cd-324623e1e0f8',
      // });
      console.log(99999, JSON.stringify(res));
      if (res.data) {
        const chainList = res.data || [];
        insertOrUpdateChainAssetTable(chainList);
      }
    } catch (e) {}
  };
  const initWalletToken = async () => {
    const privateWalletInfo = {
      password: '1234567a',
      tokens: [
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          index: 0,
          backup: false,
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
          index: 0,
          backup: false,
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          index: 0,
          backup: false,
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '',
          index: 0,
          backup: false,
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
      ],
      mnemonic_code: 'c1ffc9effc7e885143ec8d3c389422bb',
      wallet_name: 'Amy_123',
      wallet_uuid: '3ea8cd7e-b47b-4b8b-a653-ce2426698576',
      device_id: '912d3e55e6d76283',
    };
    const { password, mnemonic_code, device_id, tokens } = privateWalletInfo;
    const walletRes = await getDeviceBalance({
      wallet_uuid: '3ea8cd7e-b47b-4b8b-a653-ce2426698576',
      device_id: '912d3e55e6d76283',
    });
    console.log('walletRes', JSON.stringify(walletRes));
    if (walletRes.code === SUCCESS_CODE) {
      const { token_list = [] } = walletRes.data || {};
      const { wallet_balance = [], ...restWalletInfo } = token_list[0] || {};
      const privateWallet = {
        ...restWalletInfo,
        mnemonic_code,
        device_id,
        password,
        wallet_balance: tokens.map((item) => {
          const matchToken = wallet_balance.find(
            (info) => info.contract_addr === item.contract_addr && info.address === item.address
          );
          return {
            ...item,
            ...matchToken,
          };
        }),
      };
      batchInsertOrUpdateAssetTable(privateWallet as PrivateWalletStructure);
    }
  };

  const openSQL = useCallback(async () => {
    const open = await openDatabase();
    if (open) {
      // initList();
      // initWalletToken();
      // deleteTable('asset');
      Object.keys(TABLE_MAP).map((table_name) => {
        // deleteTable(table_name);
        createTable(table_name, {
          query: `CREATE TABLE ${table_name} (${TABLE_MAP[table_name as keyof typeof TABLE_MAP]})`,
        });
      });
      getTableInfo();
    }
  }, []);

  useEffect(() => {
    openSQL();
  }, [openSQL]);

  return (
    <RootSiblingParent>
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
    </RootSiblingParent>
  );
}
// const styles = StyleSheet.create({
//   header: {
//     borderBottomWidth: 0,
//     // 添加其他标题栏样式
//   },
// });
export default App;
