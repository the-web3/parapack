import { SymbolSupportDatum, getSymbolSupport } from '@api/symbol';
import { addSymbolToken, createWallet, getAddressBalance, getDeviceBalance } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import {
  BLOCK_CHAIN_ID_MAP,
  PrivateWalletBalance,
  PrivateWalletStructure,
  TABLE_MAP,
  executeQuery,
} from '@common/utils/sqlite';
import { getData } from '@common/utils/storage';
import { getUniqueId } from 'react-native-device-info';
import { CreateAddress, DecodeMnemonic, EncodeMnemonic, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
import { v4 as uuidv4 } from 'uuid';
export const SUPPORT_CHAIN_NAME = [
  'Ethereum',
  'BITCOIN',
  // 'ZKSync',
  'Optimism',
  // 'Avax-C',
  // 'Ethereum Classic',
  // 'BSC',
  // 'HECO',
  'Polygon',
  //'Polkadot', //DOT
  'Arbitrum', //arbi
  'SOL',
  'TRON',
];
/**
 *
 * @param chainList
 */
export const insertOrUpdateChainAssetTable = (chainList: SymbolSupportDatum[] = []) => {
  executeQuery({
    customExec: (tx) => {
      tx.executeSql('BEGIN TRANSACTION');
      try {
        // 循环插入chain表数据
        for (let i = 0; i < chainList.length; i++) {
          const chain = chainList[i];
          tx.executeSql(`SELECT id FROM chain WHERE chainName = ?`, [chain.chainName], (txObj, resultSet) => {
            if (resultSet.rows.length === 0) {
              tx.executeSql(
                `
            INSERT INTO chain (chainName, symbol, hot, chainDefault, logo, active_logo, is_del, block_chain_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `,
                [
                  chain.chainName,
                  chain.symbol,
                  chain.hot ? 1 : 0,
                  chain.default ? 1 : 0,
                  chain.logo,
                  '',
                  0,
                  BLOCK_CHAIN_ID_MAP?.[chain.chainName as keyof typeof BLOCK_CHAIN_ID_MAP],
                ],
                (txObj, resultSet) => {
                  if (resultSet.rowsAffected > 0) {
                    console.log(`chain ${chain.chainName} inserted successfully`);
                  } else {
                    console.log(`chain ${chain.chainName} inserted Failed`);
                  }
                }
              );
            } else {
              // 如果插入操作失败（唯一约束冲突），则执行更新操作
              const chainId = resultSet.rows.item(0).id;
              tx.executeSql(
                `UPDATE chain SET symbol = ?, hot = ?, chainDefault = ?, logo = ?, active_logo = ?, is_del = ?, block_chain_id = ? WHERE id = ?`,
                [
                  chain.symbol,
                  chain.hot ? 1 : 0,
                  chain.default ? 1 : 0,
                  chain.logo,
                  '',
                  0,
                  BLOCK_CHAIN_ID_MAP?.[chain.chainName as keyof typeof BLOCK_CHAIN_ID_MAP],
                  chainId,
                ],
                (txObj, resultSet) => {
                  if (resultSet.rowsAffected > 0) {
                    console.log(`chain ${chain.chainName} update successfully`);
                  } else {
                    console.log(`chain ${chain.chainName} update Failed`);
                  }
                },
                (txObj, error) => {
                  console.log(`Error update chain data:`, error);
                }
              );
            }
          });
        }

        // 循环插入asset表数据 chainName tokenName contract_addr 联合唯一键
        for (let i = 0; i < chainList.length; i++) {
          const chain = chainList[i];
          for (let a = 0; a < chain.token.length; a++) {
            const asset = chainList[i].token[a];
            tx.executeSql(
              `SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND tokenName = ? AND contract_addr = ?`,
              [chain.chainName, asset.tokenName, asset.contractAddr],
              (txObj, resultSet) => {
                // 如果查询结果为空，表示表中不存在相同的记录，执行插入操作
                if (resultSet.rows.length === 0) {
                  tx.executeSql(
                    `INSERT INTO asset (chain_id, chainListId, tokenName, tokenHot, tokenDefault, tokenLogo, activeTokenLogo, contract_addr, contractUnit, is_del)
                                  VALUES ((SELECT id FROM chain WHERE chainName = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                      chain.chainName,
                      asset.chainListId,
                      asset.tokenName,
                      asset.tokenHot ? 1 : 0,
                      asset.tokenDefault ? 1 : 0,
                      asset.tokenLogo,
                      asset.tokenLogo,
                      asset.contractAddr,
                      asset.contractUnit,
                      0,
                    ],
                    (txObj, resultSet) => {
                      if (resultSet.insertId) {
                        console.log('Asset Data inserted successfully');
                      } else {
                        console.log('Failed to insert asset data');
                      }
                    },
                    (txObj, error) => {
                      console.log('Error inserting asset data:', error);
                    }
                  );
                } else {
                  // 如果查询结果不为空，表示表中已经存在相同的记录，执行更新操作
                  const assetId = resultSet.rows.item(0).id;
                  tx.executeSql(
                    `UPDATE asset SET chainListId = ?, tokenHot = ?, tokenDefault = ?, tokenLogo = ?, activeTokenLogo = ?, contractUnit = ?, is_del = ? WHERE id = ?`,
                    [
                      asset.chainListId,
                      asset.tokenHot ? 1 : 0,
                      asset.tokenDefault ? 1 : 0,
                      asset.tokenLogo,
                      asset.tokenLogo,
                      asset.contractUnit,
                      0,
                      assetId,
                    ],
                    (txObj, resultSet) => {
                      if (resultSet.rowsAffected > 0) {
                        console.log('Asset Data updated successfully');
                      } else {
                        console.log('Failed to update asset data');
                      }
                    },
                    (txObj, error) => {
                      console.log('Error updating asset data:', error);
                    }
                  );
                }
              },
              (txObj, error) => {
                console.log('Error querying asset data:', error);
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
};

/**
 * walletAsset 表
 * account表
 * accountAsset表
 */
export const insertWalletAsset = ({
  wallet_uuid,
  chain,
  contract_addr,
  balance,
  asset_usd,
  asset_cny,
  address,
  publicKey,
  privateKey,
  symbol,
}: {
  wallet_uuid: string;
  chain: string;
  contract_addr: string;
  balance: string;
  asset_usd: string;
  asset_cny: string;
  address: string;
  publicKey: string;
  privateKey: string;
  symbol: string;
}) => {
  executeQuery({
    customExec: async (tx) => {
      tx.executeSql(
        `SELECT id AS wallet_id FROM wallet WHERE wallet_uuid = ?`,
        [wallet_uuid],
        (txObj, resultSet) => {
          if (resultSet.rows.length === 0) {
            // 如果查询结果为空，表示表中不存在对应的 wallet 记录，不执行任何操作
            console.log('Wallet data not found');
          } else {
            // 如果查询结果不为空，获取 wallet_id 的值
            const wallet_id = resultSet.rows.item(0).wallet_id;
            //1、account表 wallet_id, address 作为联合唯一键
            tx.executeSql(
              `SELECT * FROM account WHERE wallet_id = ? AND address = ?`,
              [wallet_id, address],
              (txObj, resultSet) => {
                if (resultSet.rows.length > 0) {
                  //account表 wallet_id, address 作为联合唯一键
                  const address_id = resultSet.rows.item(0).id;
                  tx.executeSql(
                    `UPDATE account SET address_index = ?, address = ?, pub_key = ?, priv_key = ?, is_del = ?, block_chain_id = ? WHERE id = ? AND wallet_id = ?`,
                    [
                      0,
                      address,
                      publicKey,
                      privateKey,
                      0,
                      address_id,
                      wallet_id,
                      BLOCK_CHAIN_ID_MAP?.[chain as keyof typeof BLOCK_CHAIN_ID_MAP],
                    ],
                    (txObj, resultSet) => {
                      if (resultSet.rowsAffected > 0) {
                        console.log('account Data updated successfully');
                      } else {
                        console.log('Failed to update account data');
                      }
                    },
                    (txObj, error) => {
                      console.log('Error updating account data:', JSON.stringify(txObj));
                    }
                  );
                } else {
                  //account表 wallet_id, address 作为联合唯一键
                  tx.executeSql(
                    `INSERT INTO account (wallet_id, address_index, address, pub_key, priv_key, is_del, block_chain_id)
                                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                      wallet_id,
                      0,
                      address,
                      publicKey,
                      privateKey,
                      0,
                      BLOCK_CHAIN_ID_MAP?.[chain as keyof typeof BLOCK_CHAIN_ID_MAP],
                    ],
                    (txObj, resultSet) => {
                      if (resultSet.rowsAffected > 0) {
                        console.log('Account Data inserted  successfully', JSON.stringify(resultSet));
                      } else {
                        console.log('Failed to insert Account data');
                      }
                    },
                    (txObj, error) => {
                      console.log('Error inserting Account data:', JSON.stringify(txObj));
                    }
                  );
                }
                tx.executeSql(
                  `SELECT id AS asset_id FROM asset
                        WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND contract_addr = ?AND tokenName = ?`,
                  [chain, contract_addr, symbol],
                  (txObj, resultSet) => {
                    if (resultSet.rows.length === 0) {
                      // 如果查询结果为空，表示表中不存在对应的 asset 记录，不执行任何操作
                      console.log('Asset data not found');
                    } else {
                      // 如果查询结果不为空，获取 asset_id 的值
                      const asset_id = resultSet.rows.item(0).asset_id;
                      //2、walletAsset 表: wallet_id, asset_id 联合唯一键（不同钱包都有ETH） , asset表的三个联合唯一键去查 (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chain = ?) AND contract_addr = ?)
                      tx.executeSql(
                        `SELECT * FROM walletAsset WHERE wallet_id = ? AND asset_id = ?`,
                        [wallet_id, asset_id],
                        (txObj, resultSet) => {
                          if (resultSet.rows.length > 0) {
                            // 存在对应数据，执行更新操作
                            tx.executeSql(
                              `UPDATE walletAsset SET balance = ?, asset_usd = ?, asset_cny = ?, is_del = ? WHERE wallet_id = ? AND asset_id = ?`,
                              [balance, asset_usd, asset_cny, 0, wallet_id, asset_id],
                              (txObj, resultSet) => {
                                if (resultSet.rowsAffected > 0) {
                                  console.log('WalletAsset Data updated successfully');
                                } else {
                                  console.log('Failed to update WalletAsset data');
                                }
                              },
                              (txObj, error) => {
                                console.log('Error updating WalletAsset data:', error);
                              }
                            );
                          } else {
                            // 不存在对应数据，执行插入操作
                            tx.executeSql(
                              `INSERT INTO walletAsset (wallet_id, asset_id, balance, asset_usd, asset_cny, is_del) VALUES (?, ?, ?, ?, ?, ?)`,
                              [wallet_id, asset_id, balance, asset_usd, asset_cny, 0],
                              (txObj, resultSet) => {
                                if (resultSet.rowsAffected > 0) {
                                  console.log('WalletAsset Data inserted successfully');
                                } else {
                                  console.log('Failed to insert WalletAsset data');
                                }
                              },
                              (txObj, error) => {
                                console.log('Error inserting WalletAsset data:', error);
                              }
                            );
                          }
                        },
                        (txObj, error) => {
                          console.log('Error querying WalletAsset data:', error);
                        }
                      );
                      //3、accountAsset表 address_id, asset_id 联合唯一, address_id 需要 wallet_id, address 作为联合唯一键
                      tx.executeSql(
                        `SELECT * FROM account WHERE wallet_id = ? AND address = ?`,
                        [wallet_id, address],
                        (txObj, resultSet) => {
                          if (resultSet.rows.length > 0) {
                            const address_id = resultSet.rows.item(0).id;
                            tx.executeSql(
                              `SELECT * FROM accountAsset WHERE address_id = ? AND asset_id = ?`,
                              [address_id, asset_id],
                              (txObj, resultSet) => {
                                if (resultSet.rows.length > 0) {
                                  // 如果已存在记录，则执行更新操作
                                  tx.executeSql(
                                    `UPDATE accountAsset SET balance = ?, asset_usd = ?, asset_cny = ?, is_del = ? WHERE address_id = ? AND asset_id = ?`,
                                    [balance, asset_usd, asset_cny, 0, address_id, asset_id],
                                    (txObj, resultSet) => {
                                      if (resultSet.rowsAffected > 0) {
                                        console.log('accountAsset update success');
                                      } else {
                                        console.log('accountAsset update fail');
                                      }
                                    },
                                    (txObj, error) => {
                                      console.log('accountAsset update fail:', JSON.stringify(txObj));
                                    }
                                  );
                                } else {
                                  // 如果不存在记录，则执行插入操作
                                  tx.executeSql(
                                    `INSERT INTO accountAsset (address_id, asset_id, balance, asset_usd, asset_cny, is_del)
                                                                   VALUES (?, (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND contract_addr = ?), ?, ?, ?, ?)`,
                                    [address_id, chain, contract_addr, balance, asset_usd, asset_cny, 0],
                                    (txObj, resultSet) => {
                                      if (resultSet.rowsAffected > 0) {
                                        console.log('accountAsset insert success');
                                      } else {
                                        console.log('accountAsset insert fail');
                                      }
                                    },
                                    (txObj, error) => {
                                      console.log('accountAsset insert fail:', JSON.stringify(txObj));
                                    }
                                  );
                                }
                              },
                              (txObj, error) => {
                                console.log('accountAsset search:', JSON.stringify(txObj));
                              }
                            );
                          }
                        }
                      );
                    }
                  },
                  (txObj, error) => {
                    console.log('Error querying asset data:', JSON.stringify(txObj));
                  }
                );
              },
              (txObj, error) => {
                console.log('Error inserting or updating Account data:', JSON.stringify(txObj));
              }
            );
          }
        },
        (txObj, error) => {
          console.log('Error querying wallet data:', error);
        }
      );
    },
  });
};

/**
 *
 * @param privateWalletInfo
 */
export const batchInsertOrUpdateAssetTable = async (
  privateWalletInfo: PrivateWalletStructure,
  submitted?: number = 1
) => {
  console.log(888888, privateWalletInfo);
  executeQuery({
    customExec: (tx) => {
      tx.executeSql('BEGIN TRANSACTION');
      try {
        //wallet表 增加 backup
        tx.executeSql(
          `SELECT * FROM wallet WHERE wallet_uuid = ?`,
          [privateWalletInfo.wallet_uuid],
          (txObj, resultSet) => {
            if (resultSet.rows.length === 0) {
              // 如果查询结果为空，表示表中不存在对应的钱包信息，执行插入操作
              tx.executeSql(
                `INSERT INTO wallet (wallet_name, device_id, wallet_uuid, mnemonic_code, password, wallet_asset_usd, wallet_asset_cny, backup, has_submit, is_del)
                     VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  privateWalletInfo.wallet_name,
                  privateWalletInfo.device_id,
                  privateWalletInfo.wallet_uuid,
                  privateWalletInfo.mnemonic_code,
                  privateWalletInfo.password,
                  privateWalletInfo.wallet_asset_usd,
                  privateWalletInfo.wallet_asset_cny,
                  privateWalletInfo.backup ? 1 : 0,
                  submitted,
                  0,
                ],
                (txObj, resultSet) => {
                  if (resultSet.rowsAffected > 0) {
                    console.log('Wallet inserted successfully', JSON.stringify(resultSet));
                  } else {
                    console.log('Failed to insert Wallet data');
                  }
                },
                (txObj, error) => {
                  console.log('Error inserting Wallet data:', error);
                }
              );
            } else {
              // 如果查询结果不为空，表示表中存在对应的钱包信息，执行更新操作
              tx.executeSql(
                `UPDATE wallet SET
                     wallet_name = ?,
                     device_id = ?,
                     mnemonic_code = ?,
                     password = ?,
                     wallet_asset_usd = ?,
                     wallet_asset_cny = ?,
                     backup = ?,
                     has_submit = ?,
                     is_del = ?
                     WHERE wallet_uuid = ?`,
                [
                  privateWalletInfo.wallet_name,
                  privateWalletInfo.device_id,
                  privateWalletInfo.mnemonic_code,
                  privateWalletInfo.password,
                  privateWalletInfo.wallet_asset_usd,
                  privateWalletInfo.wallet_asset_cny,
                  privateWalletInfo.backup ? 1 : 0,
                  submitted,
                  0,
                  privateWalletInfo.wallet_uuid,
                ],
                (txObj, resultSet) => {
                  if (resultSet.rowsAffected > 0) {
                    console.log('Wallet updated successfully', JSON.stringify(resultSet));
                  } else {
                    console.log('Failed to update Wallet data');
                  }
                },
                (txObj, error) => {
                  console.log('Error updating Wallet data:', txObj);
                }
              );
            }
          },
          (txObj, error) => {
            console.log('Error querying Wallet data:', error);
          }
        );
        if (!privateWalletInfo.wallet_balance) return;
        for (let i = 0; i < privateWalletInfo.wallet_balance.length; i++) {
          const walletAsset = privateWalletInfo.wallet_balance[i];
          insertWalletAsset({
            wallet_uuid: privateWalletInfo.wallet_uuid,
            address: walletAsset.address,
            publicKey: walletAsset.publicKey,
            privateKey: walletAsset.privateKey,
            chain: walletAsset.chain,
            contract_addr: walletAsset.contract_addr,
            balance: walletAsset.balance || '0',
            asset_usd: walletAsset.asset_usd || '0',
            asset_cny: walletAsset.asset_cny || '0',
            symbol: walletAsset.symbol,
          });
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
/**
 * create or import wallet
 * @param params
 * @returns
 */
export const createImportWallet = async (params: {
  password: any;
  wallet_name: any;
  mnemonic?: string;
}): Promise<{
  success: boolean;
  wallet_uuid: string;
}> => {
  try {
    console.log(`createImportWalletParams1=====>`, params);
    const { password, wallet_name, mnemonic = '' } = params;
    //助记词编码
    const [device_id, mnemonic_code, symbolSupport] = await Promise.all([
      getUniqueId(),
      EncodeMnemonic({ mnemonic, language: 'english' }),
      getSymbolSupport({}),
    ]);
    const wallet_uuid = uuidv4();
    if (symbolSupport?.code === SUCCESS_CODE) {
      console.log(`createImportWalletParams2 =====>`, device_id, mnemonic_code, JSON.stringify(symbolSupport));

      //存chain 和asset 表
      insertOrUpdateChainAssetTable(symbolSupport?.data || []);

      const tokens = (symbolSupport?.data || [])
        // ?.filter((item) => SUPPORT_CHAIN_NAME.includes(item.chainName) && item.default)
        .reduce((total: PrivateWalletBalance[], supportChian, index) => {
          if (supportChian.token.length > 0) {
            console.log(`createImportWalletParams3 =====>`, index, supportChian);

            const seed = MnemonicToSeed({
              mnemonic,
              password: '',
            });
            let account = CreateAddress({
              chain: supportChian.symbol.toLowerCase(),
              seedHex: seed.toString('hex'),
              index: 0,
              receiveOrChange: 0,
              network: 'mainnet',
            });
            if (typeof account === 'string') {
              account = JSON.parse(account);
            }
            console.log('account====>', account, typeof account);
            const curTokens = supportChian.token
              .filter((currentToken) => currentToken.tokenDefault)
              .map((currentToken) => {
                return {
                  chain: supportChian.chainName,
                  symbol: currentToken.tokenName,
                  contract_addr: currentToken.contractAddr,
                  index: 0,
                  ...account,
                };
              });

            return [...total, ...curTokens];
          }
          return [...total];
        }, []);
      console.log('tokens====>', tokens);
      const res = await createWallet({
        password,
        tokens: tokens.map(({ chain, symbol, contract_addr, index, address }: any) => {
          return {
            chain,
            symbol,
            contract_addr,
            index,
            address,
          };
        }),
        mnemonic_code,
        wallet_name,
        wallet_uuid,
        device_id,
      });
      console.log('createImportWalletRes===>', res, {
        password,
        tokens: tokens.map(({ chain, symbol, contract_addr, index, address }: any) => {
          return {
            chain,
            symbol,
            contract_addr,
            index,
            address,
          };
        }),
        mnemonic_code,
        wallet_name,
        wallet_uuid,
        device_id,
      });
      if (res.code === SUCCESS_CODE) {
        const walletRes = await getDeviceBalance({
          device_id,
          wallet_uuid,
        });
        if (walletRes.code === SUCCESS_CODE) {
          const { token_list = [] } = walletRes.data || {};
          const { wallet_balance = [], ...restWalletInfo } = token_list[0] || {};
          const privateWallet = {
            ...restWalletInfo,
            mnemonic_code,
            device_id,
            password,
            wallet_balance: wallet_balance.map((item) => {
              const matchToken = tokens.find(
                (info) => info.contract_addr === item.contract_addr && info.address === item.address
              );
              return {
                ...matchToken,
                ...item,
              };
            }),
          };
          console.log(`privateWallet =====>`, privateWallet);

          batchInsertOrUpdateAssetTable(privateWallet as PrivateWalletStructure);
        }
      } else {
        const unSubmitPrivateWallet = {
          backup: false,
          mnemonic_code,
          device_id,
          password,
          wallet_asset_cny: '0',
          wallet_asset_usd: '0',
          wallet_balance: tokens.map((item) => {
            return {
              ...item,
              asset_cny: '0',
              asset_usd: '0',
              balance: '0',
              index: 0,
              logo: '',
            };
          }),
          wallet_name,
          wallet_uuid,
        };
        batchInsertOrUpdateAssetTable(unSubmitPrivateWallet as PrivateWalletStructure, 0);
      }
      return {
        success: res.code === SUCCESS_CODE,
        wallet_uuid,
      };
    }
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
      wallet_uuid: '',
    };
  }
  return {
    success: false,
    wallet_uuid: '',
  };
};

/**
 *
 * @param params
 * @returns
 */
export const addToken = async (params: {
  chain: string;
  contract_addr: string;
  symbol: string;
  tokenName: string;
}): Promise<Boolean> => {
  const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
  //find wallet info
  const sqliteData = await executeQuery({
    customExec: (tx, resolve, reject) => {
      return tx.executeSql(
        `SELECT * FROM wallet WHERE wallet_uuid = ? `,
        [wallet_uuid],
        (txObj, resultSet) => {
          // console.log(222222, txObj, resultSet);
          if (resultSet.rows.length > 0) {
            const walletData = resultSet.rows.item(0);
            resolve(walletData);
          } else {
            reject('Wallet not found.');
          }
        },
        (txObj, error) => {
          reject('Wallet Found Error.');
        }
      );
    },
  });
  if (sqliteData) {
    //find walletID all token
    const mnemonic = await DecodeMnemonic({ encrytMnemonic: sqliteData?.mnemonic_code, language: 'english' });
    const seed = await MnemonicToSeed({
      mnemonic,
      password: '',
    });
    console.log(44444, params, {
      chain: params.symbol.toLowerCase(),
      seedHex: seed.toString('hex'),
      index: 0,
      receiveOrChange: 0,
      network: 'mainnet',
    });
    const account = CreateAddress({
      chain: params.symbol.toLowerCase(),
      seedHex: seed.toString('hex'),
      index: 0,
      receiveOrChange: 0,
      network: 'mainnet',
    });
    if (account) {
      try {
        const { address, publicKey, privateKey } = typeof account === 'string' ? JSON.parse(account) : account;
        const submitObj = {
          device_id,
          wallet_uuid,
          chain: params.chain,
          symbol: params.tokenName,
          contract_addr: params.contract_addr,
          address,
          index: 0,
        };
        console.log(555555, account, params, submitObj);
        const res = await addSymbolToken(submitObj);
        console.log(66666, res);
        if (res.code === SUCCESS_CODE) {
          const balanceRes = await getAddressBalance({
            device_id,
            wallet_uuid,
            chain: params.chain,
            symbol: params.tokenName,
            contract_address: params.contract_addr,
            address,
          });
          console.log(
            'getAddressBalance',
            balanceRes,
            {
              device_id,
              wallet_uuid,
              chain: params.chain,
              symbol: params.tokenName,
              contract_address: params.contract_addr,
              address,
            },
            {
              wallet_uuid,
              address,
              publicKey,
              privateKey,
              chain: params.chain,
              contract_addr: params.contract_addr,
              balance: balanceRes?.data?.balance || 0,
              asset_usd: balanceRes?.data?.asset_usd || 0,
              asset_cny: balanceRes?.data?.asset_cny || 0,
              symbol: params.tokenName,
            }
          );
          if (balanceRes.data) {
            insertWalletAsset({
              wallet_uuid,
              address,
              publicKey,
              privateKey,
              chain: params.chain,
              contract_addr: params.contract_addr,
              balance: balanceRes.data.balance || 0,
              asset_usd: balanceRes.data.asset_usd || 0,
              asset_cny: balanceRes.data.asset_cny || 0,
              symbol: params.tokenName,
            });
          }
        }
        return res.code === SUCCESS_CODE;
      } catch (e) {
        console.log(8888, e);
        return false;
      }
    }
  }
  // return false;
};

/**
 * getTableInfo
 * @param showTable
 */

export const getTableInfo = (showTable?: string[]) => {
  Object.keys(TABLE_MAP)
    .filter((item) => (showTable || Object.keys(TABLE_MAP)).includes(item))
    .map((table_name) => {
      executeQuery({
        customExec: (tx) => {
          tx.executeSql(
            `SELECT * FROM ${table_name}`,
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

              console.log(`${table_name} table data:`, data);
            },
            (txObj, error) => {
              console.log(`Error querying ${table_name} data:`, error);
            }
          );
        },
      });
    });
};

export const fixChainTable = () => {
  executeQuery({
    customExec: (tx) => {
      tx.executeSql(
        `ALTER TABLE chain ADD COLUMN block_chain_id BIGINT;`,
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

          console.log(`chain table data:`, data);
        },
        (txObj, error) => {
          console.log(`Error querying chain data:`, txObj);
        }
      );
    },
  });
};
export const fixAccountTable = () => {
  executeQuery({
    customExec: (tx) => {
      tx.executeSql(
        `ALTER TABLE account ADD COLUMN block_chain_id BIGINT;`,
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

          console.log(`account table data:`, data);
        },
        (txObj, error) => {
          console.log(`Error querying account data:`, txObj);
        }
      );
    },
  });
};

export const updateWalletTable = (
  wallet_uuid,
  {
    key,
    value,
  }: {
    key: string;
    value: any[];
  }
) => {
  executeQuery({
    customExec: (tx) => {
      tx.executeSql(
        `UPDATE wallet SET
    ${key}
     WHERE wallet_uuid = ?`,
        [...value, wallet_uuid],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('Wallet updated successfully', JSON.stringify(resultSet));
          } else {
            console.log('Failed to update Wallet data');
          }
        },
        (txObj, error) => {
          console.log('Error updating Wallet data:', txObj);
        }
      );
    },
  });
};
