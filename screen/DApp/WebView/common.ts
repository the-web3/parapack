import { useMetamaskBridge } from '@common//bridge/metamaskRpc'
import Wallet from './wallet.mock.json';
let _webviewBridge: any = null;
import Web3 from 'web3';

//TODO TEMP Web3
const web3 = new Web3(
  new Web3.providers.HttpProvider(Wallet.eth.uri)
)

export const onBridgeMessage = async (event: any, webviewBridge: any) => {
  _webviewBridge = webviewBridge;
  let bridgeParamsJson = event.nativeEvent.data || '';
  const bridgeParams = JSON.parse(bridgeParamsJson);
  const { messageId } = bridgeParams || {}
  const bridge = useMetamaskBridge({chainId: Wallet.eth.chainId, web3});
  try {
    await handleBridge(bridge, {
      ...bridgeParams,
      activeWallet: Wallet.eth.address,
      privateKey: Wallet.eth.privateKey
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
