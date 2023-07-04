
let _webviewBridge = null;

export const onBridgeMessage = async (event, webviewBridge, params, option) => {
    _webviewBridge = webviewBridge;
    const {activeWalletObj, activeWallet, chain,title} = params || {};

    let bridgeParamsJson = event.nativeEvent.data || '';
    const bridgeParams = JSON.parse(bridgeParamsJson);
    const {messageId} = bridgeParams || {}
    try {
        const type = 'actionSucceeded';
        if (chain === CHAIN_TYPE.ETH) {
             const ethBridge = new ETHBridge({chain, activeWalletObj, activeWallet});
             await handleBridge(ethBridge,bridgeParams);
         }
    } catch (e) {
        injectJavaScript(errorParams(messageId, {
                code: -32603,
                message: 'User rejected provider access'
            })
        )
    }
}

const handleBridge = async (bridge,bridgeParams) => {
    const {messageId} = bridgeParams || {}
    const type = 'actionSucceeded';
    const payload = await bridge.manageBridgeMessage({...bridgeParams});
    const {error} = payload || {};
    if (error) {
        injectJavaScript(errorParams(messageId,error));
    }else {
        injectJavaScript({messageId, type, payload});
    }
}

const errorParams = (messageId, error) => {
    return {
        messageId,
        type: 'actionFailed',
        payload: {
            error
        }
    }
}

const injectJavaScript = (params) => {
    const paramsJson = JSON.stringify(params);
    _webviewBridge.injectJavaScript(
        `(function() {
        window.WebViewBridge.onMessage('${paramsJson}','*');
         true;
     })()`);
}
