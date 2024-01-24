import Web3 from 'web3';
import http from '../../../common/utils/http';
import {
    symbolGas,
} from '@api/wallet';
import { executeQuery } from '@common/utils/sqlite';
import { getUniqueId } from 'react-native-device-info';
import { getData } from '@common/utils/storage';
import { DeviceBalanceData, deleteWallet, getDeviceBalance, updateWallet } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { getWeb3RpcUrl } from '@api/symbol';

/**
 * buildTxForApproveTradeWithRouter
 * @param tokenAddress 
 * @param walletAddress 
 * @param chain_id 
 * @returns 
 */
export async function buildTxForApproveTradeWithRouter(tokenAddress: string, walletAddress: string, chain_id: string) {
    const url = apiRequestUrl("/approve/transaction", { tokenAddress }, chain_id);
    const web3RPCUrl = await getWeb3RpcUrlReq(chain_id)
    const web3 = new Web3(new Web3.providers.HttpProvider(web3RPCUrl));
    const baseUrl = "https://api.1inch.dev/swap/v5.2";
    const transaction = await http.get(baseUrl + url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'MlYjlwvbhbqP0hI5wZB2FIKoQaCUzZuz',
            Accept: 'application/json',
        }
    }).then((res) => res).catch((err) => {
        console.error(24, err);
    })
    const gasLimit = await web3.eth.estimateGas({
        ...transaction,
        from: walletAddress
    });

    console.log(141, gasLimit, transaction);

    return {
        ...transaction,
        gas: gasLimit
    };
}
/**
 * apiRequestUrl
 * @param methodName 
 * @param queryParams 
 * @param chainId 
 * @returns 
 */
export function apiRequestUrl(methodName: string, queryParams: any, chainId: string) {
    return '/' + chainId + methodName + "?" + new URLSearchParams(queryParams).toString();
}

/**
 * Sign and post a transaction, return its hash
 * @param transaction 
 * @param walletAddress 
 * @param chainId 
 * @returns 
 */
export async function signAndSendTransaction(transaction: any, walletAddress: string, chainId: string) {
    const web3RPCUrl = await getWeb3RpcUrlReq(chainId)
    const web3 = new Web3(new Web3.providers.HttpProvider(web3RPCUrl));
    const { privateKey } = await getPrivateKey()
    const { rawTransaction } = await web3.eth.accounts.signTransaction({
        ...transaction,
        from: walletAddress,  // Add the sender's address
    }, privateKey);

    return await broadCastRawTransaction(rawTransaction, chainId);
}

/**
 * Post raw transaction to the API and return transaction hash
 * @param rawTransaction 
 * @param chain_id 
 * @returns 
 */
export async function broadCastRawTransaction(rawTransaction: string, chain_id: string) {
    return http.post('https://api.1inch.dev/tx-gateway/v1.1/' + chain_id + '/broadcast',
        JSON.stringify({ rawTransaction }), {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'MlYjlwvbhbqP0hI5wZB2FIKoQaCUzZuz',
            Accept: 'application/json',
        }
    }).then((res) => {
        return res.transactionHash;
    }).catch((err) => {
        console.error(84, err);
    })
}
/**
 * getTokenQuote
 * @param payToken 
 * @param receiveToken 
 * @param money 
 * @returns 
 */
export function getTokenQuote(payToken: any, receiveToken: any, money: any, setMoney: any, tokenDecimals: number) {
    const url = apiRequestUrl("/quote", {
        fromTokenAddress: payToken.contract_addr,
        toTokenAddress: receiveToken.contract_addr,
        amount: String(money.sell * 10 ** tokenDecimals),
    }, payToken.chainId);
    console.log(109, url);

    // Fetch the swap transaction details from the API
    return http.get("https://api.1inch.dev/swap/v5.2" + url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: 'MlYjlwvbhbqP0hI5wZB2FIKoQaCUzZuz',
            Accept: 'application/json',
        }
    })
        .then((res) => {
            const num = handleDecimal(Web3.utils.fromWei(res.toAmount, 'ether'))
            setMoney((prev) => {
                return {
                    ...prev,
                    buy: num.toString(),
                };
            });
        }).catch((err) => {
            console.error(126, err);
        })
}

function handleDecimal(num: string) {
    // check if num is a number
    let result = parseFloat(Number(num).toFixed(6));
    return (0 < result && result < 0.000001) ? 0 : result;
}

export function getGasPriceToUSD(chainId: string, totalGas) {
    const totalGasWei = Number(Web3.utils.fromWei(handleDecimal(totalGas), 'ether'))
    return symbolGas({ chain: chainId }).then((res) => {
        if (res.code !== 200) return 0;
        const symbolRate = res.data.symbolRate;
        return (totalGasWei * symbolRate).toFixed(6)
    }).catch((err) => {
        console.error(err);
    })
}

export const delay = ms => new Promise(res => setTimeout(res, ms));

export async function getPrivateKey() {
    const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
    const res = await getDeviceBalance({
        device_id,
        wallet_uuid,
    });
    if (res.code === SUCCESS_CODE && res?.data) {
        const walletInfo = res?.data
        return await executeQuery({
            customExec: (tx, resolve) => {
                tx.executeSql(
                    `
              SELECT * 
              FROM account 
              WHERE wallet_id = (
                SELECT id
                FROM wallet
                WHERE wallet_uuid = ?
              )
              AND address = ?
          `,
                    [wallet_uuid, walletInfo?.token_list[0]?.wallet_balance[0]?.address],
                    (txObj, resultSet) => {
                        if (resultSet.rows.length > 0) {
                            // 获取私钥
                            const privateKey = resultSet.rows.item(0).priv_key;
                            resolve({ privateKey: privateKey });

                        } else {
                            console.log(
                                'No matching record found',
                                wallet_uuid,
                                walletInfo?.token_list[0]?.wallet_balance[0]?.address,
                                JSON.stringify(resultSet)
                            );
                            resolve({ privateKey: '' });
                        }
                    },
                    (txObj, error) => {
                        console.log('Error executing SQL query:', error);
                        resolve({ privateKey: '' });
                    }
                );
            },
        });
    }
}

function getWeb3RpcUrlReq(chainId) {
    return getWeb3RpcUrl({
        chainId: chainId
    }).then((res) => {
        if (res.data) {
            return res?.data[0] || "";
        }
        return ""
    }).catch(error => {
        console.error(206, error);
        return "";
    })
}
