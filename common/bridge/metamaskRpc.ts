import assert from "assert";
import keccak256 from "../common/utils/keccak256";
import {recoverPersonalSignature} from 'eth-sig-util';

export default class MetamaskBridge {
  constructor() {
    this.web3 = null;
  }
  addHexPrefix = (data: any) => {
    return data.indexOf('0x') === 0 ? data : '0x' + data
  }
  manageBridgeMessage = async params => {
    const {type, payload, activeWallet, chain} = params || {};

    const {method} = payload || {};
    let resultPayload = {};
    if (type === 'eth_rpc_request') {
      switch (method) {
        case 'wallet_addEthereumChain': {
          resultPayload = this.wallet_addEthereumChain();
        }
          break;
        case 'metamask_getProviderState': {
          resultPayload =  this.getProviderState(payload);
        }
          break;
        case 'eth_requestAccounts':
        case 'eth_accounts': {
          resultPayload = this.getAccounts({activeWallet, chain})
        }
          break;
        case 'net_version': {
          resultPayload = this.getNetVersion();
        }
          break;
        case 'eth_chainId': {
          resultPayload = this.ethChainId();
        }
          break;
        case 'web3_clientVersion': {
          resultPayload = this.web3ClientVersion();
        }
          break;
        case 'eth_blockNumber': {
          resultPayload = await this.getBlockNumber();
        }
          break;
        case 'eth_estimateGas': {
          resultPayload = await this.getEstimateGas(payload);
        }
          break;
        case 'eth_gasPrice': {
          resultPayload = await this.getGasPrice();
        }
          break;
        case 'eth_getCode': {
          resultPayload = await this.getCode(payload);
        }
          break;
        case 'eth_coinbase': {
          resultPayload = await this.getCoinbase(payload, activeWallet);
        }
          break;
        case 'net_listening': {
          resultPayload = await this.getNetListening(payload);
        }
          break;
        case 'net_peerCount': {
          resultPayload = await this.getNetPeerCount(payload);
        }
          break;
        case 'eth_protocolVersion': {
          resultPayload = await this.getEthProtocolVersion(payload);
        }
          break;
        case 'eth_getBalance': {
          resultPayload = await this.getEthBalance(payload);
        }
          break;
        case 'eth_getBlockByNumber': {
          resultPayload = await this.getBlockByNumber(payload);
        }
          break;
        case 'eth_getBlockByHash': {
          resultPayload = await this.getBlockByHash(payload);
        }
          break;
        case 'eth_getStorageAt': {
          resultPayload = await this.getStorageAt(payload);
        }
          break;
        case 'eth_getTransactionByBlockHashAndIndex': {
          resultPayload = await this.getTransactionByBlockHashAndIndex(payload);
        }
          break;
        case 'eth_getTransactionByBlockNumberAndIndex': {
          resultPayload = await this.getTransactionByBlockNumberAndIndex(payload);
        }
          break;
        case 'eth_getTransactionByHash': {
          resultPayload = await this.getTransactionByHash(payload);
        }
          break;
        case 'eth_getTransactionCount': {
          resultPayload = await this.getTransactionCount(payload);
        }
          break;
        case 'eth_getTransactionReceipt': {
          resultPayload = await this.getTransactionReceipt(payload);
        }
          break;
        case 'eth_getUncleByBlockHashAndIndex': {
          resultPayload = await this.getUncleByBlockHashAndIndex(payload);
        }
          break;
        case 'eth_getUncleByBlockNumberAndIndex': {
          resultPayload = await this.getUncleByBlockNumberAndIndex(payload);
        }
          break;
        case 'eth_getBlockTransactionCountByHash': {
          resultPayload = await this.getBlockTransactionCountByHash(payload);
        }
          break;
        case 'eth_getBlockTransactionCountByNumber': {
          resultPayload = await this.getBlockTransactionCountByNumber(payload);
        }
          break;
        case 'eth_getWork': {
          resultPayload = await this.getWork(payload);
        }
          break;
        case 'eth_hashrate': {
          resultPayload = await this.ethHashrate(payload);
        }
          break;
        case 'eth_mining': {
          resultPayload = await this.ethMining(payload);
        }
          break;
        case 'eth_syncing': {
          resultPayload = await this.ethSyncing(payload);
        }
          break;
        case 'eth_submitWork': {
          resultPayload = await this.ethSubmitWork(payload);
        }
          break;
        case 'web3_sha3': {
          resultPayload = await this.web3Sha3(payload);
        }
          break;
        case 'eth_call': {
          resultPayload = await this.ethCall(payload);
        }
          break;
        case 'personal_sign': {
          resultPayload = await this.personalSign(payload);
        }
          break;
        case 'personal_ecRecover': {
          resultPayload = await this.personalEcRecover(payload);
        }
          break;
        case 'eth_signTransaction':
        case 'eth_sendTransaction': {
          resultPayload = await this.ethTransaction(payload);
        }
          break;
        case 'eth_sendRawTransaction': {
          resultPayload = await this.ethRawTransaction(payload);
        }
          break;
        case 'eth_signTypedData': {
          resultPayload = await this.ethSignTypedData(payload);
        }
          break;
        case 'eth_signTypedData_v3': {
          resultPayload = await this.ethSignTypedDataV3(payload);
        }
          break;
        case 'eth_signTypedData_v4': {
          resultPayload = await this.ethSignTypedDataV4(payload);
        }
          break;
        case 'eth_sign': {
          resultPayload = await this.ethSign(payload);
        }
          break;
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
          resultPayload = this.default(method);
      }
    }
    return resultPayload;
  }

  wallet_addEthereumChain = () => {

  }

  getProviderState = (payload) => {

  }
  getAccounts = () => {
  }
  getNetVersion = () => {
  };
  web3ClientVersion = () => ({data: 'MetaMask/v6.4.1'});
  ethChainId = () => {
  };
  getBlockNumber = async () => {
    const result = await this.web3.eth.getBlockNumber()
    return handleData('0x' + (+result).toString('16'));
  }
  getEstimateGas = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const result = await this.web3.eth.estimateGas(params[0])
    return handleData('0x' + (+result).toString('16'));
  }
  getGasPrice = async () => {
    const networkGasPrice = await this.web3.eth.getGasPrice()
    return handleData(this.web3.utils.toHex(networkGasPrice));
  }
  getCode = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const address = payload.params[0];
    const code = await this.web3.eth.getCode(address)
    return handleData(code);
  }
  getCoinbase = (payload, activeWallet) => {
    assert(activeWallet.address, 'No Wallet');
    return handleData(activeWallet.address);
  }
  getNetListening = async () => {
    const result = await this.web3.eth.net.isListening()
    return handleData(result);
  }
  getNetPeerCount = async () => {
    const result = await this.web3.eth.net.getPeerCount()
    return handleData(result);
  }
  getEthProtocolVersion = async () => {
    const result = await this.web3.eth.getProtocolVersion()
    return handleData(result);
  }
  getEthBalance = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const address = payload.params[0];
    const balance = await this.web3.eth.getBalance(address)
    return handleData('0x' + (+balance).toString('16'));
  }
  getBlockByNumber = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const blockHashOrBlockNumber = !isNaN(params[0]) ? +params[0] : params[0]
    const returnTransactionObjects = Boolean(params[1]);
    const block = await this.web3.eth.getBlock(blockHashOrBlockNumber, returnTransactionObjects);
    return handleData(block);
  }
  getBlockByHash = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const block = await this.web3.eth.getBlock(params[0], Boolean(params[1]));
    return handleData(block);
  }
  getStorageAt = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const storage = await this.web3.eth.getStorageAt(params[0], +params[1])
    return handleData('0x' + (+storage).toString('16'));
  }
  getTransactionByBlockHashAndIndex = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const transaction = await this.web3.eth.getTransactionFromBlock(params[0], +params[1])
    return handleData(transaction);
  }
  getTransactionByBlockNumberAndIndex = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const blockHashOrBlockNumber = !isNaN(params[0]) ? +params[0] : params[0]
    const returnTransactionObjects = Boolean(params[1]);
    const transaction = await this.web3.eth.getTransactionFromBlock(blockHashOrBlockNumber, +returnTransactionObjects)
    return handleData(transaction);
  }
  getTransactionByHash = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const result = await this.web3.eth.getTransaction(params[0])
    return handleData(result);
  }
  getTransactionCount = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!')
    const result = await this.web3.eth.getTransactionCount(params[0], params[1]);
    return handleData('0x' + (+result).toString('16'));
  }
  getTransactionReceipt = async payload => {
    const {params = []} = payload || {};
    assert(params[0], 'Invalid params!');
    const result = await this.web3.eth.getTransactionReceipt(params[0]) || {};
    result.status = result.status === true ? '0x01': '0x00';
    return handleData(result);
  }
  getUncleByBlockHashAndIndex = async payload => {
    assert(payload.params && payload.params[0] && payload.params[1], 'Invalid params!');
    const transaction = await this.web3.eth.getUncle(payload.params[0], +payload.params[1], !!+payload.params[2]);
    return transaction
  }
  getUncleByBlockNumberAndIndex = async payload => {
    assert(payload.params && payload.params[0] && payload.params[1], 'Invalid params!')
    const hashStringOrNumber = !isNaN(payload.params[0]) ? +payload.params[0] : payload.params[0];
    const transaction = await this.web3.eth.getUncle(hashStringOrNumber, +payload.params[1], !!+payload.params[2]);
    return transaction
  }
  getBlockTransactionCountByHash = async payload => {
    assert(payload.params && payload.params[0], 'Invalid params!');
    const result = await this.web3.eth.getBlockTransactionCount(payload.params[0])
    return '0x' + (+result).toString('16')
  }
  getBlockTransactionCountByNumber = async payload => {
    assert(payload.params && payload.params[0], 'Invalid params!');
    const blockHashOrBlockNumber = !isNaN(payload.params[0]) ? +payload.params[0] : payload.params[0];
    const result = await web3.eth.getBlockTransactionCount(blockHashOrBlockNumber)
    return '0x' + (+result).toString('16')

  }
  getWork = async () => {
    const result = await this.web3.eth.getWork()
    return handleData(result);
  }
  ethHashrate = async () => {
    const result = await this.web3.eth.getHashrate()
    return handleData('0x' + (+result).toString('16'));
  }
  ethMining = async () => {
    const result = await this.web3.eth.isMining()
    return handleData(result);
  }
  ethSyncing = async () => {
    const result = await this.web3.eth.isSyncing()
    return handleData(result);
  }
  ethSubmitWork = async payload => {
    assert(payload.params && payload.params[0] && payload.params[1] && payload.params[2], 'Invalid params!')
    const {params = []} = payload || {};
    const result = await this.web3.eth.submitWork(params[0], params[1], params[2])
    return handleData(result);
  }
  web3Sha3 = async payload => {
    const message = payload.indexOf('0x') === 0 ? payload.slice(2) : payload
    const result = keccak256(message);
    return handleData('0x' + result.toString('hex'));
  }
  ethCall = async payload => {
    assert(payload.params && payload.params[0] && typeof payload.params[0] === 'object', 'Invalid params!')
    const {params = []} = payload || {};
    const result = await this.web3.eth.call(params[0], params[1])
    return handleData(result);
  }
  personalEcRecover = payload => {
    const {params} = payload || {};
    const data = params[0];
    const sig = params[1];
    return recoverPersonalSignature({ data, sig });
  }

  ethRawTransaction = async payload => {
    assert(payload.params && payload.params[0], 'Invalid params!')
    return new Promise((resolve, reject) => {
      web3.eth.sendSignedTransaction(payload.params[0]).on('transactionHash', (hash) => {
        resolve(hash)
      }).on('error', (error) => {
        reject(error)
      })
    })
  }
  personalSign = () => {}
  ethTransaction = () => {}
  ethSignTypedData = () => {}
  ethSignTypedDataV3 = () => {}
  ethSignTypedDataV4 = () => {}
  ethSign = () => {}

  default = method => {
    return {
      error: {
        message: `Unsupported rpc api: ${method}`
      }
    }
  }

  removeHexPrefix = (data) => {
    return data.indexOf('0x') === 0 ? data.slice(2): data
  }

}


const handleData = data => ({data});

