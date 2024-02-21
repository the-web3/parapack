/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { createContext, useCallback, useEffect, useRef } from 'react';
const Stack = createNativeStackNavigator();
import { ThemeProvider, createTheme, useThemeMode } from '@rneui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defineTheme } from './style/them';
import i18n, { getValidLan, t } from './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import menus from './routes';
import { loadMetamaskExt } from '@common/bridge/inject';
import { PrivateWalletStructure, TABLE_MAP, createTable, deleteTable, openDatabase } from '@common/utils/sqlite';
import { getSymbolSupport } from '@api/symbol';
import {
  batchInsertOrUpdateAssetTable,
  fixAccountTable,
  fixChainTable,
  getTableInfo,
  insertOrUpdateChainAssetTable,
  insertWalletAsset,
} from '@common/wallet';
import { getAddressBalance, getDeviceBalance } from '@api/wallet';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { getData, storeData } from '@common/utils/storage';
import { getFlush } from '@api/common';
const RESET_SQLITE_TAG = '2';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // 导入你的根Reducer

const store = createStore(rootReducer, thunk);

const App = () => {
  const { mode, setMode } = useThemeMode();
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  const initList = async () => {
    try {
      // insertWalletAsset({
      //   address: '0xEf8DfDFa8E48d57296dEf455eDe4aD1e60409d2d',
      //   asset_cny: 0,
      //   asset_usd: 0,
      //   balance: 0,
      //   chain: 'Ethereum',
      //   contract_addr: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      //   privateKey: '0xd1ece1ac2c43fa9492ebcb88c15e6d885eac70d89f0de7d8f64b8f1b9520253f',
      //   publicKey: '0x03fdd50354d0221e3ff9f583c757fa99052872d2f856b6e744e43e59d8f10e73f8',
      //   wallet_uuid: '32db0356-54c8-4e5f-927d-1979edc93132',
      //   symbol: 'USDT',
      // });
      const res = await getSymbolSupport({});
      // console.log(11111, res);
      // const res = await getAddressBalance({
      //   address: '0xA3AFA38476cF8b967e712dD878376030f52a841A',
      //   chain: 'Ethereum',
      //   contract_address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
      //   device_id: '912d3e55e6d76283',
      //   symbol: 'SHIB',
      //   wallet_uuid: '00f8f218-6256-43eb-a1cd-324623e1e0f8',
      // });
      if (res.data) {
        const chainList = res.data || [];
        // console.log(111111, JSON.stringify(res));
        insertOrUpdateChainAssetTable(chainList);
      }
    } catch (e) {}
  };

  const openSQL = useCallback(async () => {
    const open = await openDatabase();
    if (open) {
      // deleteTable('chain');
      // deleteTable('asset');
      getFlush();
      initList();
      const reset_table = await getData('reset_table');
      if (reset_table !== RESET_SQLITE_TAG) {
        Object.keys(TABLE_MAP).map((table_name) => {
          deleteTable(table_name);
        });
        storeData('reset_table', RESET_SQLITE_TAG);
      }
      Object.keys(TABLE_MAP).map((table_name) => {
        // deleteTable(table_name);
        createTable(table_name, {
          query: `CREATE TABLE ${table_name} (${TABLE_MAP[table_name as keyof typeof TABLE_MAP]})`,
        });
      });
      getTableInfo();
      // fixChainTable();
      // fixAccountTable();
    }
  }, []);

  useEffect(() => {
    openSQL();
    // load metamask extension
    loadMetamaskExt();
  }, [openSQL]);

  useEffect(() => {
    // init the color Theme
    getData('colorTheme').then((value) => {
      if (value !== '{}') {
        setMode(value as ThemeMode);
      } else {
        setMode(mode);
      }
    });
  }, []);

  const routeNameRef = useRef();
  const navigationRef = useRef();
  return (
    <Provider store={store}>
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
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = (navigationRef as any)?.current?.getCurrentRoute()?.name;
            }}
            onStateChange={() => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = (navigationRef as any)?.current?.getCurrentRoute()?.name;
              if (previousRouteName !== currentRouteName) {
                console.log(`Navigated from ${previousRouteName} to------> ${currentRouteName}`);
                routeNameRef.current = currentRouteName;
              }
            }}
          >
            <Stack.Navigator>
              {menus.map((menu) => {
                return (
                  <Stack.Screen
                    key={menu.name}
                    {...menu}
                    options={(props) => {
                      return {
                        ...menu.options,
                        title:
                          menu.options?.title && menu.options?.title !== ''
                            ? t(menu.options?.title)
                            : menu.options?.title,
                      };
                    }}
                  />
                );
              })}
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
