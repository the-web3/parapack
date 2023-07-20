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
import { TABLE_MAP, createTable, deleteTable, executeQuery, openDatabase } from '@common/utils/sqlite';
// import { getCommonHealth } from '@api/common';
// import { getAddressBalanceParams } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { CreateAddress, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
import { getSymbolSupport } from '@api/symbol';
// eslint-disable-next-line no-undef
function App(): JSX.Element {
  const mode = useColorScheme() || 'light';
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  const initList = async () => {
    const res = await getSymbolSupport({});
    if (res.data) {
      const chainList = res.data || [];
      await executeQuery({
        customExec: (tx) => {
          tx.executeSql('BEGIN TRANSACTION');
          try {
            // 循环插入chain表数据
            for (let i = 0; i < chainList.length; i++) {
              const chain = chainList[i];
              tx.executeSql(
                `INSERT INTO chain (name, chain, symbol, logo, active_logo, is_del, support)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(name) DO UPDATE SET
                  chain = excluded.chain,
                  symbol = excluded.symbol,
                  logo = excluded.logo,
                  active_logo = excluded.active_logo,
                  is_del = excluded.is_del,
                  support = excluded.support
              `,
                [chain.chainName, chain.chainName, chain.symbol, chain.logo, chain.logo, 0, 1]
              );
              // tx.executeSql(
              //   `INSERT OR REPLACE INTO chain (name, chain, symbol, logo, active_logo, is_del, support)
              //   VALUES (?, ?, ?, ?, ?, ?, ?)`,
              //   [chain.chainName, chain.chainName, chain.symbol, chain.logo, chain.logo, 0, 1]
              // );
            }

            // 循环插入asset表数据
            for (let i = 0; i < chainList.length; i++) {
              const chain = chainList[i];
              for (let a = 0; a < chain.token.length; a++) {
                const asset = chainList[i].token[a];
                console.log(11111, asset);
                tx.executeSql(
                  //   `
                  //   INSERT OR REPLACE INTO asset (chain_id, name, logo, active_logo, contract_addr, unit, is_del)
                  // VALUES ((SELECT id FROM chain WHERE chain = ?), ?, ?, ?, ?, ?, ?)`,
                  `  INSERT INTO asset (chain_id, name, logo, active_logo, contract_addr, unit, is_del)
                VALUES ((SELECT id FROM chain WHERE chain = ?), ?, ?, ?, ?, ?, ?)
                ON CONFLICT(name) DO UPDATE SET
                chain_id = excluded.chain_id,
                logo = excluded.logo,
                active_logo = excluded.active_logo,
                contract_addr = excluded.contract_addr,
                unit = excluded.unit,
                is_del = excluded.is_del
              `,
                  [chain.chainName, asset.tokenName, '', '', asset.contractAddr, asset.contractUnit, 0],
                  (txObj, resultSet) => {
                    if (resultSet.insertId) {
                      console.log('Data inserted successfully');
                    } else {
                      console.log('Failed to insert data');
                    }
                  },
                  (txObj, error) => {
                    console.log('Error inserting data:', error);
                  }
                );
              }
            }

            // 提交事务
            tx.executeSql('COMMIT');
          } catch (error) {
            // 回滚事务
            tx.executeSql('ROLLBACK');
            console.error('Error inserting data:', error);
          }
        },
      });
      executeQuery({
        customExec: (tx) => {
          tx.executeSql(
            'SELECT * FROM asset',
            [],
            (txObj, resultSet) => {
              // 处理查询结果
              const rows = resultSet.rows;
              const data = [];

              for (let i = 0; i < rows.length; i++) {
                const row = rows.item(i);
                // 处理每一行数据
                data.push(row);
              }

              console.log('Chain table data:', data);
            },
            (txObj, error) => {
              console.log('Error querying data:', error);
            }
          );
        },
      });
    }
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
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
          index: 0,
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
          index: 0,
          privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
          publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
          address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
        },
        {
          chain: 'Ethereum',
          symbol: 'ETH',
          contract_addr: '',
          index: 0,
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
    //   const walletInfo = {
    //     chain_id: id,//chain的ID
    //     wallet_name,// 钱包名称
    //     device_id, // 设备ID
    //     wallet_uuid,// 钱包ID
    //     mnemonic_code: base.AesEncrypt(mnemonic_code, password),// 助记词编码
    //     password,// 密码
    //     asset_usd: 0,  //资产usd
    //     asset_cny: 0, //资产人民币
    //     has_submit: 0, //是否提交
    //     is_del: 0, //是否删除 0：正常；1:删除
    // }
    executeQuery({
      customExec: (tx) => {
        tx.executeSql('BEGIN TRANSACTION');
        try {
          tx.executeSql(
            `INSERT INTO wallet (chain_id, wallet_name, device_id, wallet_uuid, mnemonic_code, password, asset_usd, asset_cny, has_submit, is_del)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(wallet_uuid) DO UPDATE SET
            chain_id = excluded.chain_id,
            wallet_name = excluded.wallet_name,
            device_id = excluded.device_id,
            mnemonic_code = excluded.mnemonic_code,
            password = excluded.password,
            asset_usd = excluded.asset_usd,
            asset_cny = excluded.asset_cny,
            has_submit = excluded.has_submit,
            is_del = excluded.is_del;
          `,
            [
              0,
              privateWalletInfo.wallet_name,
              privateWalletInfo.device_id,
              privateWalletInfo.wallet_uuid,
              privateWalletInfo.mnemonic_code,
              privateWalletInfo.password,
              0,
              0,
              1,
              0,
            ],
            (txObj, resultSet) => {
              if (resultSet.insertId) {
                console.log('wallet inserted successfully', JSON.stringify(resultSet));
              } else {
                console.log('Failed to insert data');
              }
            },
            (txObj, error) => {
              console.log('Error inserting data:', error);
            }
          );

          for (let i = 0; i < privateWalletInfo.tokens.length; i++) {
            const walletAsset = privateWalletInfo.tokens[i];
            tx.executeSql(
              `INSERT INTO walletAsset (wallet_id, asset_id, balance, asset_usd, asset_cny, is_del)
          VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chain = ?) AND contract_addr = ?), ?, ?, ?, ?)
          ON CONFLICT(wallet_id, asset_id) DO UPDATE SET
          balance = excluded.balance,
          asset_usd = excluded.asset_usd,
          asset_cny = excluded.asset_cny,
          is_del = excluded.is_del`,
              [privateWalletInfo.wallet_uuid, walletAsset.chain, walletAsset.contract_addr, 0, 0, 0, 0]
            );
            tx.executeSql(
              `INSERT INTO account (wallet_id, address_index, address, pub_key, priv_key, is_del)
              VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), ?, ?, ?, ?, ?)
              ON CONFLICT(wallet_id, address) DO UPDATE SET
              address_index = excluded.address_index,
              pub_key = excluded.pub_key,
              priv_key = excluded.priv_key,
              is_del = excluded.is_del`,
              [privateWalletInfo.wallet_uuid, 0, walletAsset.address, walletAsset.publicKey, walletAsset.privateKey, 0]
            );
            tx.executeSql(
              `INSERT INTO accountAsset (address_id, asset_id, balance, asset_usd, asset_cny, is_del)
                VALUES ((SELECT id FROM account WHERE address = ?), (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chain = ?) AND contract_addr = ?), ?, ?, ?, ?)
                ON CONFLICT(address_id, asset_id) DO UPDATE SET
                balance = excluded.balance,
                asset_usd = excluded.asset_usd,
                asset_cny = excluded.asset_cny,
                is_del = excluded.is_del`,
              [walletAsset.address, walletAsset.chain, walletAsset.contract_addr, 0, 0, 0, 0]
            );
          }

          // 提交事务
          tx.executeSql('COMMIT');
        } catch (error) {
          // 回滚事务
          tx.executeSql('ROLLBACK');
          console.error('Error inserting data:', error);
        }
      },
    });
  };
  const openSQL = async () => {
    const open = await openDatabase();
    if (open) {
      // initList();
      // initWalletToken();
      // deleteTable('accountAsset');
      Object.keys(TABLE_MAP).map((tabe_name) => {
        // deleteTable(tabe_name);
        createTable(tabe_name, {
          query: `CREATE TABLE ${tabe_name} (${TABLE_MAP[tabe_name as keyof typeof TABLE_MAP]})`,
        });
      });
      executeQuery({
        customExec: (tx) => {
          tx.executeSql(
            'SELECT * FROM account',
            [],
            (txObj, resultSet) => {
              // 处理查询结果
              const rows = resultSet.rows;
              const data = [];

              for (let i = 0; i < rows.length; i++) {
                const row = rows.item(i);
                // 处理每一行数据
                data.push(row);
              }

              console.log('Chain table data:', data);
            },
            (txObj, error) => {
              console.log('Error querying data:', error);
            }
          );
        },
      });
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
    openSQL();
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
