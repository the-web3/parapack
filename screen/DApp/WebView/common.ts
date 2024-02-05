import { useMetamaskBridge } from '@common//bridge/metamaskRpc';
import Wallet from './wallet.mock.json';
let _webviewBridge: any = null;
import Web3 from 'web3';
import { getData } from '@common/utils/storage';
import { executeQuery, BLOCK_CHAIN_ID_MAP } from '@common/utils/sqlite';
import { getWeb3RpcUrl } from '@api/symbol';

const getWallet = async (chainId: any) => {
  try {
    const wallet_uuid = await getData('wallet_uuid');
    console.warn('wallet_uuid:', wallet_uuid);

    //blockchain ID
    // TODO please ext it when need suport other EVM chains
    // const chainId = BLOCK_CHAIN_ID_MAP.Ethereum;
    const sqliteData = (await executeQuery({
      customExec: (tx, resolve, reject) => {
        tx.executeSql(
          `
        SELECT * 
        FROM account 
        WHERE wallet_id = (
          SELECT id
          FROM wallet
          WHERE wallet_uuid = ?
        ) AND block_chain_id = ?
      `,
          [wallet_uuid, chainId],
          async (txObj2, resultSet2) => {
            if (resultSet2.rows.length > 0) {
              const accountData = resultSet2.rows.item(0);
              resolve({ account: accountData });
            } else {
              // reject('Account not found.');
              resolve({ account: {} });
            }
          },
          (txObj) => {
            // reject(`Error executing SQL query:${txObj}`);
            resolve({ account: {} });
          }
        );
      },
    })) as any;
    return sqliteData;
  } catch (e) {
    return Promise.resolve({ account: {} });
  }
};
let testId: any = null;
export const onBridgeMessage = async (event: any, webviewBridge: any, propsData: any, setwebviewUri: any) => {
  _webviewBridge = webviewBridge;
  let bridgeParamsJson = event.nativeEvent.data || '';
  const url = event.nativeEvent.url;
  const bridgeParams = JSON.parse(bridgeParamsJson);
  const { messageId } = bridgeParams || {};
  console.warn('onBridgeMessage');
  console.warn('---->propsData', propsData);
  console.log('----> url', url);
  let chainId = testId || propsData?.chainId || 1;
  if (bridgeParams?.payload?.method === 'wallet_switchEthereumChain') {
    console.log('-----> bridgeParams', bridgeParams);
    const switChainid = bridgeParams?.payload?.params[0]['chainId'] || '';
    console.log('-----> switChainid', switChainid);
    if (switChainid) {
      testId = Number(switChainid);
      chainId = testId;
      const nodeRes: any = await getWeb3RpcUrl({ chainId: String(chainId) });
      if (nodeRes?.data?.length > 0 && nodeRes?.data?.[0]) {
        let tempUrl = '';
        if (propsData?.uri?.indexOf('uniswap') > -1) {
          // uniswap
          let chainName = '';
          switch (chainId) {
            case 1:
              chainName = 'mainnet';
              break;
            case 10:
              chainName = 'optimism';
              break;
            case 56:
              chainName = 'bnb';
              break;
            case 137:
              chainName = 'polygon';
              break;
            case 8453:
              chainName = 'base';
              break;
            case 42161:
              chainName = 'arbitrum';
              break;
            case 59144:
              chainName = 'linea';
              break;
            default:
              break;
          }
          tempUrl = `${propsData?.uri}/?chain=${chainName}`;
        } else {
          tempUrl = `${propsData?.uri}/?chainId=${chainId}`;
        }
        console.log('----> tempUrl', tempUrl);
        setwebviewUri(tempUrl);
      } else {
        const errmsg = `unsupport chainId: ${chainId} ${nodeRes}`;
        console.log('---->', errmsg);
        injectJavaScript(errorParams(messageId, errmsg));
      }
      return;
    }
    console.warn('_webviewBridge', _webviewBridge);
  }
  console.log('-----> chainId', chainId);
  const sqliteData = (await getWallet(BLOCK_CHAIN_ID_MAP.Ethereum)) ?? {};
  try {
    console.warn('sqliteData:', sqliteData);
    // TODO temp Wallet.eth.x
    const privateKey = sqliteData?.account?.priv_key.replace('0x', '');
    const address = sqliteData?.account?.address;
    console.warn('privateKey:', privateKey);
    console.warn('address:', address);
    //TODO TEMP Web3
    const nodeRes: any = await getWeb3RpcUrl({ chainId: String(chainId) });
    console.log('------> node:', nodeRes);
    if (nodeRes?.data?.length > 0) {
      //
    } else {
      const errmsg = `unsupport chainId: ${chainId} ${nodeRes}`;
      console.log(errmsg);
      throw errmsg;
    }
    const web3 = new Web3(new Web3.providers.HttpProvider(nodeRes.data[0]));
    const bridge = useMetamaskBridge({ chainId, web3 });
    await handleBridge(bridge, {
      ...bridgeParams,
      activeWallet: address,
      privateKey: privateKey,
    });
  } catch (e) {
    injectJavaScript(
      errorParams(messageId, {
        code: -32603,
        message: 'User rejected provider access',
      })
    );
  }
};

const handleBridge = async (bridge: any, bridgeParams: any) => {
  const { messageId } = bridgeParams || {};
  const type = 'actionSucceeded';
  const payload = await bridge.manageBridgeMessage({ ...bridgeParams });
  const { error } = payload || {};
  if (error) {
    injectJavaScript(errorParams(messageId, error));
  } else {
    injectJavaScript({ messageId, type, payload });
  }
};

const errorParams = (messageId: string, error: any) => {
  return {
    messageId,
    type: 'actionFailed',
    payload: {
      error,
    },
  };
};

const injectJavaScript = (params: any) => {
  const paramsJson = JSON.stringify(params);
  _webviewBridge.injectJavaScript(
    `(function() {
        window.WebViewBridge.onMessage('${paramsJson}','*');
         true;
     })()`
  );
};
