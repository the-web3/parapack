import { useMetamaskBridge } from '@common//bridge/metamaskRpc'
import Wallet from './wallet.mock.json';
let _webviewBridge: any = null;
import Web3 from 'web3';
import { getData } from '@common/utils/storage';
import { executeQuery, BLOCK_CHAIN_ID_MAP } from '@common/utils/sqlite';

//TODO TEMP Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(Wallet.eth.uri)
)

export const onBridgeMessage = async (event: any, webviewBridge: any) => {
  _webviewBridge = webviewBridge;
  let bridgeParamsJson = event.nativeEvent.data || '';
  const bridgeParams = JSON.parse(bridgeParamsJson);
  const { messageId } = bridgeParams || {}

  const [ wallet_uuid ] = await Promise.all([
    getData('wallet_uuid'),
  ]);
  //blockchain ID
  // TODO please ext it when need suport other EVM chains 
  const chainId = BLOCK_CHAIN_ID_MAP.Ethereum;

  try {
  const sqliteData = await executeQuery({
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
            resolve({account: accountData})
          } else {
            reject('Account not found.');
          }
        },
        (txObj) => {
          reject(`Error executing SQL query:${txObj}`);
        }
      );
    },
  }) as any;

  // TODO temp Wallet.eth.x
  const privateKey = sqliteData?.priv_key.replace('0x', '') ?? Wallet.eth.privateKey;
  const address = sqliteData?.address ?? Wallet.eth.address;

  const bridge = useMetamaskBridge({chainId, web3});

    await handleBridge(bridge, {
      ...bridgeParams,
      activeWallet: address,
      privateKey: privateKey
    });
  } catch (e) {
    injectJavaScript(errorParams(messageId, {
        code: -32603,
        message: 'User rejected provider access'
      })
    )
  }
}

const handleBridge = async (bridge: any, bridgeParams: any) => {
  const { messageId } = bridgeParams || {}
  const type = 'actionSucceeded';
  const payload = await bridge.manageBridgeMessage({ ...bridgeParams });
  const { error } = payload || {};
  if (error) {
    injectJavaScript(errorParams(messageId, error));
  } else {
    injectJavaScript({ messageId, type, payload });
  }
}

const errorParams = (messageId: string, error: any) => {
  return {
    messageId,
    type: 'actionFailed',
    payload: {
      error
    }
  }
}

const injectJavaScript = (params: any) => {
  const paramsJson = JSON.stringify(params);
  _webviewBridge.injectJavaScript(
    `(function() {
        window.WebViewBridge.onMessage('${paramsJson}','*');
         true;
     })()`);
}
