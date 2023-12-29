import { SymbolSupportDatum, getSymbolSupport } from '@api/symbol';
import { addSymbolToken, createWallet, getAddressBalance, getDeviceBalance } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { PrivateWalletBalance, PrivateWalletStructure, TABLE_MAP, executeQuery } from '@common/utils/sqlite';
import { getData } from '@common/utils/storage';
import { getUniqueId } from 'react-native-device-info';
import { CreateAddress, DecodeMnemonic, EncodeMnemonic, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @param chainList
 */
export const insertOrUpdateChainAssetTable = async (chainList: SymbolSupportDatum[] = []) => {
    await executeQuery({
        customExec: (tx) => {
            tx.executeSql('BEGIN TRANSACTION');
            try {
                // 循环插入chain表数据
                for (let i = 0; i < chainList.length; i++) {
                    const chain = chainList[i];
                    tx.executeSql(
                        `INSERT INTO chain (chainName, symbol, hot, chainDefault, logo, active_logo, is_del)
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        ON CONFLICT(chainName) DO UPDATE SET
                        symbol = excluded.symbol,
                        hot = excluded.hot,
                        chainDefault = excluded.chainDefault,
                        logo = excluded.logo,
                        active_logo = excluded.active_logo,
                        is_del = excluded.is_del
                  `,
                        [chain.chainName, chain.symbol, chain.hot ? 1 : 0, chain.default ? 1 : 0, chain.logo, '', 0],
                        (txObj, resultSet) => {
                            if (resultSet.rowsAffected > 0) {
                                console.log('chain inserted successfully', JSON.stringify(resultSet));
                            } else {
                                console.log('Failed to insert chain data');
                            }
                        },
                        (txObj, error) => {
                            console.log(
                                'Error inserting chain data:',
                                txObj,
                                [chain.chainName, chain.symbol, chain.hot ? 1 : 0, chain.default ? 1 : 0, chain.logo, chain.logo, 0, 1],
                                error
                            );
                        }
                    );
                }

                // 循环插入asset表数据 chainName tokenName  contract_addr 联合唯一键
                for (let i = 0; i < chainList.length; i++) {
                    const chain = chainList[i];
                    for (let a = 0; a < chain.token.length; a++) {
                        const asset = chainList[i].token[a];
                        tx.executeSql(
                            `INSERT INTO asset (chain_id, chainListId, tokenName, tokenHot, tokenDefault, tokenLogo, activeTokenLogo, contract_addr, contractUnit, is_del)
                    VALUES ((SELECT id FROM chain WHERE chainName = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(chain_id, tokenName, contract_addr) DO UPDATE SET
                    chainListId = excluded.chainListId,
                    tokenHot = excluded.tokenHot,
                    tokenDefault = excluded.tokenDefault,
                    tokenLogo = excluded.tokenLogo,
                    activeTokenLogo = excluded.activeTokenLogo,
                    contractUnit = excluded.contractUnit,
                    is_del = excluded.is_del
                  `,
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
                                if (resultSet.rowsAffected > 0) {
                                    console.log('asset Data inserted successfully', resultSet);
                                } else {
                                    console.log('Failed to insert asset data');
                                }
                            },
                            (txObj, error) => {
                                console.log('Error inserting asset data:', txObj, error);
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
}) => {
    executeQuery({
        customExec: (tx) => {
            //walletAsset 表: wallet_id, asset_id 联合唯一键（不同钱包都有ETH） , asset表的三个联合唯一键去查 (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chain = ?) AND contract_addr = ?)
            tx.executeSql(
                `INSERT INTO walletAsset (wallet_id, asset_id, balance, asset_usd, asset_cny, is_del)
  VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND contract_addr = ?), ?, ?, ?, ?)
  ON CONFLICT(wallet_id, asset_id) DO UPDATE SET
  balance = excluded.balance,
  asset_usd = excluded.asset_usd,
  asset_cny = excluded.asset_cny,
  is_del = excluded.is_del`,
                [wallet_uuid, chain, contract_addr, balance, asset_usd, asset_cny, 0],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        console.log('walletAsset inserted successfully', JSON.stringify(resultSet));
                    } else {
                        console.log('walletAsset Failed to insert data');
                    }
                },
                (txObj, error) => {
                    console.log('walletAsset Error inserting data:', txObj);
                }
            );
            //account表 wallet_id, address 作为联合唯一键
            tx.executeSql(
                `INSERT INTO account (wallet_id, address_index, address, pub_key, priv_key, is_del)
                      VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), ?, ?, ?, ?, ?)
                      ON CONFLICT(wallet_id, address) DO UPDATE SET
                      address_index = excluded.address_index,
                      pub_key = excluded.pub_key,
                      priv_key = excluded.priv_key,
                      is_del = excluded.is_del`,
                [wallet_uuid, 0, address, publicKey, privateKey, 0],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        console.log('account inserted successfully', JSON.stringify(resultSet));
                    } else {
                        console.log('account Failed to insert data');
                    }
                },
                (txObj, error) => {
                    console.log('account Error inserting data:', txObj);
                }
            );
            //accountAsset表 address_id, asset_id 联合唯一, address_id 需要 wallet_id, address 作为联合唯一键
            tx.executeSql(
                `INSERT INTO accountAsset (address_id, asset_id, balance, asset_usd, asset_cny, is_del)
        VALUES ((SELECT id FROM account WHERE address = ?), (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND contract_addr = ?), ?, ?, ?, ?)
        ON CONFLICT(address_id, asset_id) DO UPDATE SET
        balance = excluded.balance,
        asset_usd = excluded.asset_usd,
        asset_cny = excluded.asset_cny,
        is_del = excluded.is_del`,
                [address, chain, contract_addr, balance, asset_usd, asset_cny, 0],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        console.log('accountAsset inserted successfully', JSON.stringify(resultSet));
                    } else {
                        console.log('accountAsset Failed to insert data');
                    }
                },
                (txObj, error) => {
                    console.log('accountAsset Error inserting data:', txObj);
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
                    `INSERT INTO wallet (chain_id, wallet_name, device_id, wallet_uuid, mnemonic_code, password, wallet_asset_usd, wallet_asset_cny, backup, has_submit, is_del)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(wallet_uuid) DO UPDATE SET
            chain_id = excluded.chain_id,
            wallet_name = excluded.wallet_name,
            device_id = excluded.device_id,
            mnemonic_code = excluded.mnemonic_code,
            password = excluded.password,
            wallet_asset_usd = excluded.wallet_asset_usd,
            wallet_asset_cny = excluded.wallet_asset_cny,
            backup = excluded.backup,
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
                        privateWalletInfo.wallet_asset_usd,
                        privateWalletInfo.wallet_asset_cny,
                        privateWalletInfo.backup ? 1 : 0,
                        submitted,
                        0,
                    ],
                    (txObj, resultSet) => {
                        if (resultSet.rowsAffected > 0) {
                            console.log('wallet inserted successfully', JSON.stringify(resultSet));
                        } else {
                            console.log('wallet Failed to insert data');
                        }
                    },
                    (txObj, error) => {
                        console.log('wallet Error inserting data:', txObj);
                    }
                );
                if (!privateWalletInfo.wallet_balance) return;
                for (let i = 0; i < privateWalletInfo.wallet_balance.length; i++) {
                    const walletAsset = privateWalletInfo.wallet_balance[i];
                    //walletAsset 表: wallet_id, asset_id 联合唯一键（不同钱包都有ETH） , asset表的三个联合唯一键去查 (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chain = ?) AND contract_addr = ?)
                    tx.executeSql(
                        `INSERT INTO walletAsset (wallet_id, asset_id, balance, asset_usd, asset_cny, is_del)
          VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND contract_addr = ?), ?, ?, ?, ?)
          ON CONFLICT(wallet_id, asset_id) DO UPDATE SET
          balance = excluded.balance,
          asset_usd = excluded.asset_usd,
          asset_cny = excluded.asset_cny,
          is_del = excluded.is_del`,
                        [
                            privateWalletInfo.wallet_uuid,
                            walletAsset.chain,
                            walletAsset.contract_addr,
                            walletAsset.balance,
                            walletAsset.asset_usd,
                            walletAsset.asset_cny,
                            0,
                        ],
                        (txObj, resultSet) => {
                            if (resultSet.rowsAffected > 0) {
                                console.log('walletAsset inserted successfully', JSON.stringify(resultSet));
                            } else {
                                console.log('walletAsset Failed to insert data');
                            }
                        },
                        (txObj, error) => {
                            console.log('walletAsset Error inserting data:', txObj);
                        }
                    );
                    //account表 wallet_id, address 作为联合唯一键
                    tx.executeSql(
                        `INSERT INTO account (wallet_id, address_index, address, pub_key, priv_key, is_del)
                              VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), ?, ?, ?, ?, ?)
                              ON CONFLICT(wallet_id, address) DO UPDATE SET
                              address_index = excluded.address_index,
                              pub_key = excluded.pub_key,
                              priv_key = excluded.priv_key,
                              is_del = excluded.is_del`,
                        [privateWalletInfo.wallet_uuid, 0, walletAsset.address, walletAsset.publicKey, walletAsset.privateKey, 0],
                        (txObj, resultSet) => {
                            if (resultSet.rowsAffected > 0) {
                                console.log('account inserted successfully', JSON.stringify(resultSet));
                            } else {
                                console.log('account Failed to insert data');
                            }
                        },
                        (txObj, error) => {
                            console.log('account Error inserting data:', txObj);
                        }
                    );
                    //accountAsset表 address_id, asset_id 联合唯一, address_id 需要 wallet_id, address 作为联合唯一键
                    tx.executeSql(
                        `INSERT INTO accountAsset (address_id, asset_id, balance, asset_usd, asset_cny, is_del)
                VALUES ((SELECT id FROM account WHERE address = ?), (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chainName = ?) AND contract_addr = ?), ?, ?, ?, ?)
                ON CONFLICT(address_id, asset_id) DO UPDATE SET
                balance = excluded.balance,
                asset_usd = excluded.asset_usd,
                asset_cny = excluded.asset_cny,
                is_del = excluded.is_del`,
                        [
                            walletAsset.address,
                            walletAsset.chain,
                            walletAsset.contract_addr,
                            walletAsset.balance,
                            walletAsset.asset_usd,
                            walletAsset.asset_cny,
                            0,
                        ],
                        (txObj, resultSet) => {
                            if (resultSet.rowsAffected > 0) {
                                console.log('accountAsset inserted successfully', JSON.stringify(resultSet));
                            } else {
                                console.log('accountAsset Failed to insert data');
                            }
                        },
                        (txObj, error) => {
                            console.log('accountAsset Error inserting data:', txObj);
                        }
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
        if (symbolSupport.code === SUCCESS_CODE) {
            console.log(`createImportWalletParams2 =====>`, device_id, mnemonic_code, JSON.stringify(symbolSupport));

            //存chain 和asset 表
            insertOrUpdateChainAssetTable(symbolSupport.data || []);

            const tokens = (symbolSupport.data || [])
                ?.filter((item) => ['Ethereum', 'Bitcoin'].includes(item.chainName) && item.default)
                .reduce((total: PrivateWalletBalance[], supportChian, index) => {
                    if (supportChian.token.length > 0) {
                        console.log(`createImportWalletParams3 =====>`, index, supportChian);

                        const seed = MnemonicToSeed({
                            mnemonic,
                            password,
                        });
                        const account = CreateAddress({
                            chain: supportChian.chainName,
                            seedHex: seed.toString('hex'),
                            index: 0,
                            receiveOrChange: 0,
                            network: 'mainnet',
                        });
                        const curTokens = supportChian.token
                            .filter((currentToken) => currentToken.tokenDefault)
                            .map((currentToken) => {
                                return {
                                    chain: supportChian.chainName,
                                    symbol: supportChian.symbol,
                                    contract_addr: currentToken.contractAddr,
                                    index: 0,
                                    ...JSON.parse(account),
                                };
                            });

                        return [...total, ...curTokens];
                    }
                    return [...total];
                }, []);
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
            console.log('createImportWalletRes===>', res);
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
    const sqliteData = await executeQuery({
        customExec: (tx, resolve, reject) => {
            return tx.executeSql(
                `SELECT * FROM wallet WHERE wallet_uuid = ? `,
                [wallet_uuid],
                (txObj, resultSet) => {
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
        const mnemonic = await DecodeMnemonic({ encrytMnemonic: sqliteData?.mnemonic_code, language: 'english' });
        const seed = MnemonicToSeed({
            mnemonic,
            password: sqliteData?.password,
        });
        const account = CreateAddress({
            chain: params.chain,
            seedHex: seed.toString('hex'),
            index: 0,
            receiveOrChange: 0,
            network: 'mainnet',
        });
        if (account) {
            try {
                const { address, publicKey, privateKey } = JSON.parse(account);
                const submitObj = {
                    device_id,
                    wallet_uuid,
                    chain: params.chain,
                    symbol: params.tokenName,
                    contract_addr: params.contract_addr,
                    address,
                    index: 0,
                };
                const res = await addSymbolToken(submitObj);
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
