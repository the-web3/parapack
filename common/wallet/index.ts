import { SymbolSupportDatum, getSymbolSupport } from '@api/symbol';
import { addSymbolToken, createWallet } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { executeQuery } from '@common/utils/sqlite';
import { getData } from '@common/utils/storage';
import { getUniqueId } from 'react-native-device-info';
import { CreateAddress, EncodeMnemonic, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
import { v4 as uuidv4 } from 'uuid';

const initSqliteChainAsset = async (chainList: SymbolSupportDatum[] = []) => {
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
                }

                // 循环插入asset表数据
                for (let i = 0; i < chainList.length; i++) {
                    const chain = chainList[i];
                    for (let a = 0; a < chain.token.length; a++) {
                        const asset = chainList[i].token[a];
                        console.log(11111, asset);
                        tx.executeSql(
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
};
//
const initSqliteOther = async (privateWalletInfo) => {
    // const privateWalletInfo = {
    //     password: '1234567a',
    //     tokens: [
    //         {
    //             chain: 'Ethereum',
    //             symbol: 'ETH',
    //             contract_addr: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    //             index: 0,
    //             privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
    //             publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
    //             address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
    //         },
    //         {
    //             chain: 'Ethereum',
    //             symbol: 'ETH',
    //             contract_addr: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
    //             index: 0,
    //             privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
    //             publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
    //             address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
    //         },
    //         {
    //             chain: 'Ethereum',
    //             symbol: 'ETH',
    //             contract_addr: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    //             index: 0,
    //             privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
    //             publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
    //             address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
    //         },
    //         {
    //             chain: 'Ethereum',
    //             symbol: 'ETH',
    //             contract_addr: '',
    //             index: 0,
    //             privateKey: '0x764a9e2a0500fb8b171e791d0705ef1467ff984c5e5c5617461933360357d111',
    //             publicKey: '0x035d7d55fa6770506c36eb608ef42ed33515b5f09bd53d048b76a393146411c237',
    //             address: '0x7a41f4A684eBC598AdBafebE90Ce0e39BdbdcF1F',
    //         },
    //     ],
    //     mnemonic_code: 'c1ffc9effc7e885143ec8d3c389422bb',
    //     wallet_name: 'Amy_123',
    //     wallet_uuid: '3ea8cd7e-b47b-4b8b-a653-ce2426698576',
    //     device_id: '912d3e55e6d76283',
    // };
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
export const createImportWallet = async (params: {
    password: any;
    wallet_name: any;
    mnemonic?: string;
}): Promise<Boolean> => {
    try {
        const { password, wallet_name, mnemonic = '' } = params;
        //助记词编码
        const [device_id, mnemonic_code, symbolSupport] = await Promise.all([
            getUniqueId(),
            EncodeMnemonic({ mnemonic, language: 'english' }),
            getSymbolSupport({}),
        ]);

        const wallet_uuid = uuidv4();
        if (symbolSupport.code === SUCCESS_CODE) {
            initSqliteChainAsset(symbolSupport.data || []);

            const tokens = (symbolSupport.data || [])
                ?.filter((item) => !['TRON', 'BITCOIN'].includes(item.chainName))
                .reduce((total, supportChian) => {
                    if (supportChian.token.length > 0) {
                        const curTokens = supportChian.token
                            .filter((currentToken) => currentToken.tokenDefault)
                            .map((currentToken) => {
                                const seed = MnemonicToSeed({
                                    mnemonic,
                                    password,
                                });
                                const account = CreateAddress({
                                    chain: supportChian.symbol.toLowerCase(),
                                    seedHex: seed.toString('hex'),
                                    index: 0,
                                    receiveOrChange: 0,
                                    network: 'mainnet',
                                });
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
            const prevData = {
                password,
                tokens,
                mnemonic_code,
                wallet_name,
                wallet_uuid,
                device_id,
            };
            initSqliteOther(prevData);
            console.log(JSON.stringify(prevData));
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
            console.log(9999, res);
            // if(res.code === SUCCESS_CODE){

            // }
            return res.code === SUCCESS_CODE;
        }
    } catch (error) {
        console.log('error', error);
        return false;
    }
};

export const addToken = async (params: { chain: string; contract_addr: string; symbol: string }): Promise<Boolean> => {
    const currentWalletInfo = await getData('currentWallet');
    const { wallet_uuid } = JSON.parse(currentWalletInfo);
    const device_id = await getUniqueId();
    const seed = MnemonicToSeed({
        mnemonic: [
            'sea',
            'wrestle',
            'know',
            'wedding',
            'trigger',
            'chunk',
            'autumn',
            'museum',
            'destroy',
            'seven',
            'anger',
            'jazz',
        ].join(' '),
        password: '1234567a',
    });
    const account = CreateAddress({
        chain: params.symbol.toLowerCase(),
        seedHex: seed.toString('hex'),
        index: 0,
        receiveOrChange: 0,
        network: 'mainnet',
    });
    console.log(111111, account);
    try {
        const { address, publicKey, privateKey } = JSON.parse(account);
        const res = await addSymbolToken({
            device_id,
            wallet_uuid,
            chain: params.chain,
            symbol: params.symbol,
            contract_addr: params.contract_addr,
            address,
            index: 0,
        });
        if (res.code === SUCCESS_CODE) {
            executeQuery({
                query: `INSERT INTO account (wallet_id, address_index, address, pub_key, priv_key, is_del)
                VALUES ((SELECT id FROM wallet WHERE wallet_uuid = ?), ?, ?, ?, ?, ?)
                ON CONFLICT(wallet_id, address) DO UPDATE SET
                address_index = excluded.address_index,
                pub_key = excluded.pub_key,
                priv_key = excluded.priv_key,
                is_del = excluded.is_del`,
                params: [wallet_uuid, 0, address, publicKey, privateKey, 0],
            });
        }
        return res.code === SUCCESS_CODE;
    } catch (e) {
        return false;
    }
};
