import assert from "assert";
import {keccak256} from "@ethersproject/keccak256";
import {
  recoverPersonalSignature,
  personalSign as perSign,
  signTypedDataLegacy,
  signTypedData,
  signTypedData_v4,
  signTypedMessage
} from 'eth-sig-util';
import Web3 from 'web3';

interface MetamaskBridgeProps {
  web3: any;
  chainId: number
}

export const useMetamaskBridge = (props: MetamaskBridgeProps) => {

  const web3 = props.web3;
  const chainId = props.chainId;

  const manageBridgeMessage = async (params: any) => {
    const {type, payload, activeWallet,privateKey} = params || {};
    const {method} = payload || {};
    let r: any;
    if (type === 'eth_rpc_request') {
      switch (method) {
        case 'wallet_addEthereumChain':   { r = addEthereumChain();}             break;
        case 'metamask_getProviderState': { r =  getProviderState(activeWallet);}break;
        case 'eth_requestAccounts':
        case 'eth_accounts':              { r = accounts(activeWallet)}          break;
        case 'net_version':               { r = getNetVersion(); }               break;
        case 'eth_chainId':               { r = ethChainId(); }                  break;
        case 'web3_clientVersion':        { r = web3ClientVersion(); }           break;
        case 'eth_blockNumber':           { r = await getBlockNumber(); }        break;
        case 'eth_estimateGas':           { r = await getEstimateGas(payload); } break;
        case 'eth_gasPrice':              { r = await getGasPrice(); }           break;
        case 'eth_getCode':               { r = await getCode(payload); }        break;
        case 'eth_coinbase':              { r = await getCoinbase(activeWallet);}break;
        case 'net_listening':             { r = await getNetListening();}        break;
        case 'net_peerCount':             { r = await getNetPeerCount();}        break;
        case 'eth_protocolVersion':       { r = await getEthProtocolVersion();}  break;
        case 'eth_getBalance':            { r = await getEthBalance(payload);}   break;
        case 'eth_getBlockByNumber':      { r = await getBlockByNumber(payload);}break;
        case 'eth_getBlockByHash':        { r = await getBlockByHash(payload);}  break;
        case 'eth_getStorageAt':          { r = await getStorageAt(payload);}    break;
        case 'eth_getTransactionByBlockHashAndIndex': {r = await getTransactionByBlockHashAndIndex(payload);}     break;
        case 'eth_getTransactionByBlockNumberAndIndex': {r = await getTransactionByBlockNumberAndIndex(payload);} break;
        case 'eth_getTransactionByHash':  { r = await getTransactionByHash(payload);}                break;
        case 'eth_getTransactionCount':   { r = await getTransactionCount(payload);}                 break;
        case 'eth_getTransactionReceipt': { r = await getTransactionReceipt(payload);}               break;
        case 'eth_getUncleByBlockHashAndIndex': {r = await getUncleByBlockHashAndIndex(payload);}           break;
        case 'eth_getUncleByBlockNumberAndIndex': {r = await getUncleByBlockNumberAndIndex(payload);}       break;
        case 'eth_getBlockTransactionCountByHash': {r = await getBlockTransactionCountByHash(payload);}     break;
        case 'eth_getBlockTransactionCountByNumber': {r = await getBlockTransactionCountByNumber(payload);} break;
        case 'eth_getWork':               { r = await getWork();}           break;
        case 'eth_hashrate':              { r = await ethHashrate();}       break;
        case 'eth_mining':                { r = await ethMining();}         break;
        case 'eth_syncing':               { r = await ethSyncing();}        break;
        case 'eth_submitWork':            { r = await ethSubmitWork(payload);}     break;
        case 'web3_sha3':                 { r = await web3Sha3(payload);}   break;
        case 'eth_call':                  { r = await ethCall(payload);}    break;
        case 'personal_sign':             { r = await personalSign(payload, privateKey);}      break;
        case 'personal_ecRecover':        { r = await personalEcRecover(payload);} break;
        case 'eth_signTransaction':
        case 'eth_sendTransaction':       { r = await ethTransaction(payload, privateKey);}    break;
        case 'eth_sendRawTransaction':    { r = await ethRawTransaction(payload);} break;
        case 'eth_signTypedData':         { r = await ethSignTypedData(payload, privateKey);}  break;
        case 'eth_signTypedData_v3':      { r = await ethSignTypedDataV3(payload, privateKey);}break;
        case 'eth_signTypedData_v4':      { r = await ethSignTypedDataV4(payload, privateKey);}break;
        case 'eth_sign':                  { r = await ethSign(payload, privateKey);}           break;
        case 'eth_submitHashrate':
        case 'eth_uninstallFilter':
        case 'eth_getUncleCountByBlockHash':
        case 'eth_getUncleCountByBlockNumber':
        case 'eth_newBlockFilter':
        case 'eth_newFilter':
        case 'eth_newPendingTransactionFilter':
        case 'eth_getFilterChanges':
        case 'eth_getFilterLogs':
        case 'eth_getLogs':
        default:
          r = otherMethod(method);
      }
    }
    console.warn('bridge method:',method);
    console.warn('bridge result:',r);
    return r;
  }

  const addEthereumChain = () => {
    return handleData(chainId);
  }

  const getProviderState = (activeWallet: string) => {
    console.warn('getProviderState:', activeWallet);
    return handleData({
      accounts: accounts(activeWallet).data,
      networkVersion: getNetVersion().data,
      chainId,
      isUnlocked: false
    })
  }
  const accounts = (activeWallet: string) => {
    return handleData([activeWallet])
  }
  const getNetVersion = () => {
    return addEthereumChain();
  };
  const web3ClientVersion = () => handleData('MetaMask/v6.4.1');
  const ethChainId = () => {
    return addEthereumChain();
  };
  const getBlockNumber = async () => {
    const result = await web3.eth.getBlockNumber()
    return handleData(Web3.utils.toHex(result));
  }
  const getEstimateGas = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const result = await web3.eth.estimateGas(params[0])
    return handleData(Web3.utils.toHex(result));
  }
  const getGasPrice = async () => {
    const networkGasPrice = await web3.eth.getGasPrice();
    return handleData(Web3.utils.toHex(networkGasPrice));
  }
  const getCode = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const address = payload.params[0];
    const code = await web3.eth.getCode(address)
    return handleData(code);
  }
  const getCoinbase = (activeWallet: string) => {
    assert(activeWallet, 'No Wallet');
    return handleData(activeWallet);
  }
  const getNetListening = async () => {
    const result = await web3.eth.net.isListening();
    return handleData(result);
  }
  const getNetPeerCount = async () => {
    const result = await web3.eth.net.getPeerCount();
    return handleData(result);
  }
  const getEthProtocolVersion = async () => {
    const result = await web3.eth.getProtocolVersion();
    return handleData(result);
  }
  const getEthBalance = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const address = payload.params[0];
    const balance = await web3.eth.getBalance(address)
    return handleData(Web3.utils.toHex(balance));
  }
  const getBlockByNumber = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const blockHashOrBlockNumber = !isNaN(params[0]) ? +params[0] : params[0]
    const returnTransactionObjects = Boolean(params[1]);
    const block = await web3.eth.getBlock(blockHashOrBlockNumber, returnTransactionObjects);
    return handleData(block);
  }
  const getBlockByHash = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const block = await web3.eth.getBlock(params[0], Boolean(params[1]));
    return handleData(block);
  }
  const getStorageAt = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const storage = await web3.eth.getStorageAt(params[0], +params[1])
    return handleData(Web3.utils.toHex(storage));
  }
  const getTransactionByBlockHashAndIndex = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const transaction = await web3.eth.getTransactionFromBlock(params[0], +params[1])
    return handleData(transaction);
  }
  const getTransactionByBlockNumberAndIndex = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const blockHashOrBlockNumber = !isNaN(params[0]) ? +params[0] : params[0]
    const returnTransactionObjects = Boolean(params[1]);
    const transaction = await web3.eth.getTransactionFromBlock(blockHashOrBlockNumber, +returnTransactionObjects)
    return handleData(transaction);
  }
  const getTransactionByHash = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const result = await web3.eth.getTransaction(params[0])
    return handleData(result);
  }
  const getTransactionCount = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const result = await web3.eth.getTransactionCount(params[0], params[1]);
    return handleData(Web3.utils.toHex(result));
  }
  const getTransactionReceipt = async (payload: any) => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!');
    const result = await web3.eth.getTransactionReceipt(params[0]) || {};
    result.status = result.status === true ? '0x01': '0x00';
    return handleData(result);
  }
  const getUncleByBlockHashAndIndex = async (payload: any) => {
    assert(payload.params && payload.params[0] && payload.params[1], 'Invalid params!');
    const transaction = await web3.eth.getUncle(payload.params[0], +payload.params[1], !!+payload.params[2]);
    return handleData(transaction);
  }
  const getUncleByBlockNumberAndIndex = async (payload: any) => {
    assert(payload.params && payload.params[0] && payload.params[1], 'Invalid params!')
    const hashStringOrNumber = !isNaN(payload.params[0]) ? +payload.params[0] : payload.params[0];
    const transaction = await web3.eth.getUncle(hashStringOrNumber, +payload.params[1], !!+payload.params[2]);
    return handleData(transaction);
  }
  const getBlockTransactionCountByHash = async (payload: any) => {
    assert(payload.params && payload.params[0], 'Invalid params!');
    const result = await web3.eth.getBlockTransactionCount(payload.params[0])
    return handleData(Web3.utils.toHex(result));
  }
  const getBlockTransactionCountByNumber = async (payload: any) => {
    assert(payload.params && payload.params[0], 'Invalid params!');
    const blockHashOrBlockNumber = !isNaN(payload.params[0]) ? +payload.params[0] : payload.params[0];
    const result = await web3.eth.getBlockTransactionCount(blockHashOrBlockNumber)
    return handleData(Web3.utils.toHex(result));

  }
  const getWork = async () => {
    const result = await web3.eth.getWork()
    return handleData(result);
  }
  const ethHashrate = async () => {
    const result = await web3.eth.getHashRate()
    return handleData(Web3.utils.toHex(result));
  }
  const ethMining = async () => {
    const result = await web3.eth.isMining()
    return handleData(result);
  }
  const ethSyncing = async () => {
    const result = await web3.eth.isSyncing()
    return handleData(result);
  }
  const ethSubmitWork = async (payload: any) => {
    assert(payload.params && payload.params[0] && payload.params[1] && payload.params[2], 'Invalid params!')
    const {params = []} = payload || {};
    const result = await web3.eth.submitWork(params[0], params[1], params[2])
    return handleData(result);
  }
  const web3Sha3 = async (payload: any) => {
    const message = payload.indexOf('0x') === 0 ? payload.slice(2) : payload
    const result = keccak256(message);
    return handleData(Web3.utils.toHex(result));
  }
  const ethCall = async (payload: any) => {
    assert(payload.params && payload.params[0] && typeof payload.params[0] === 'object', 'Invalid params!')
    const {params = []} = payload || {};
    const result = await web3.eth.call(params[0], params[1])
    return handleData(result);
  }
  const personalEcRecover = (payload: any) => {
    const {params} = payload || {};
    const data = params[0];
    const sig = params[1];
    return recoverPersonalSignature({ data, sig });
  }

  const ethRawTransaction = async (payload: any) => {
    assert(payload.params && payload.params[0], 'Invalid params!')
    return new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(payload.params[0]).on('transactionHash', (hash: string) => {
        resolve({data:hash})
      }).on('error', (error: any) => {
        reject({error})
      })
    })
  }
  const personalSign = (payload: any, privateKey: string) => {
    const {params} = payload;
    const paramsData = params[0];
    const signature = perSign(Buffer.from(privateKey, 'hex'),{data: paramsData});
    return handleData(signature);
  }

  const ethSignTypedData = (payload: any, privateKey: string) => {
    const {params} = payload;
    const paramsData = params[0];
    const signature = signTypedDataLegacy(Buffer.from(privateKey, 'hex'), { data: paramsData })
    return handleData(signature);
  }
  const ethSignTypedDataV3 = (payload: any, privateKey: string) => {
    const {params} = payload;
    const paramsData = params[0];
    const signature = signTypedData(Buffer.from(privateKey, 'hex'), { data: paramsData })
    return handleData(signature);
  }
  const ethSignTypedDataV4 = (payload: any, privateKey: string) => {
    const {params} = payload;
    const paramsData = params[0];
    const signature = signTypedData_v4(Buffer.from(privateKey, 'hex'), { data: paramsData })
    return handleData(signature);
  }
  const ethSign = (payload: any, privateKey: string) => {
    const {params} = payload;
    const paramsData = params[0];
    const signature = signTypedMessage(Buffer.from(privateKey, 'hex'), { data: paramsData })
    return handleData(signature);
  }

  const ethTransaction = (payload: any, privateKey: string) => new Promise(async (resolve, reject) => {
    const {params = []} = payload || {};
    assert(params[0] && typeof params[0] === 'object' && params[0].from && params[0].to, 'Invalid params!')
    let { gasPrice,gas,value,from,to,data } = params[0];
    if (!gasPrice) {
      let networkGasPrice = await web3.eth.getGasPrice();
      gasPrice = web3.utils.toHex(networkGasPrice);
    }
    if (!gas) {
      gas = await web3.eth.estimateGas(params[0]);
    }
    gas = web3.utils.toHex(gas);
    let nonce = await web3.eth.getTransactionCount(from);
    nonce = web3.utils.toHex(nonce);

    const signPrams = {
      from, to, value, data, gas, gasPrice, nonce, chainId,
    };
    const signature = await web3.eth.accounts.signTransaction(signPrams, privateKey);
    console.warn('signature:',signature);
    web3.eth.sendSignedTransaction(
      signature?.rawTransaction?? {}
    ).on('transactionHash', (tx: string) => {
      resolve({data: tx});
    }).on("error", (error: any) => {
      reject({error})
    })
  })

  const otherMethod = (method: string) => {
    return {
      error: {
        message: `Unsupported rpc api: ${method}`
      }
    }
  }

  return {
    manageBridgeMessage
  }
}

const handleData = (data: any) => ({data});

