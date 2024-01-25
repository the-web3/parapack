import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Layout from '@components/Layout';
import { useTranslation } from 'react-i18next';
import http from '@common/utils/http';
import { getChainIdBalance } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { getData } from '@common/utils/storage';
import { toString } from 'lodash';
import BottomOverlay from '@components/BottomOverlay';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  buildTxForApproveTradeWithRouter,
  signAndSendTransaction,
  getTokenQuote,
  apiRequestUrl,
  getGasPriceToUSD,
  delay,
} from './func'
import { showToast } from '@common/utils/platform';
import { getSymbolSupport } from '@api/symbol';

type Props = {
  fullWidth?: boolean;
  navigation: any;
};

type TokenDetail = {
  address: string;
  assetCny: string;
  assetUsd: string;
  balance: string;
  chain: string;
  chainName: string;
  contract_addr: string;
  index: number;
  logo: string;
  symbol: string;
  chainId: number;
  chainContractAddr: string;
};

const initTokenDetail = {
  address: '',
  asset_cny: '',
  asset_usd: '',
  balance: '',
  chain: '',
  chainName: '',
  contract_addr: '',
  index: 0,
  logo: '',
  symbol: '',
  chainId: ''
};

const Swap = (props: Props) => {
  const { t } = useTranslation();
  const [tokenSelectWindowVisible, setTokenSelectWindowVisible] = useState(false);
  const [tokenList, setTokenList] = useState<TokenDetail[]>([]);
  const [tokenListState, setTokenListState] = useState<"pay" | "receive">("pay");
  const [payToken, setPayToken] = useState<TokenDetail>(initTokenDetail);
  const [receiveToken, setReceiveToken] = useState<TokenDetail>(initTokenDetail);
  const [showSwapWindow, setShowSwapWindow] = useState(false);
  const [gasFee, setGasFee] = useState(0);
  const [swapButtonState, setSwapButtonState] = useState({
    disabled: true,
    loading: false,
    text: '获取报价'
  });
  const [swapSignButtonLoading, setSwapSignButtonLoading] = useState(false)
  const [swapTransaction, setSwapTransaction] = useState<any>({});
  const [reqestLoading, setReqestLoading] = useState(false);
  const [money, setMoney] = useState<{
    buy: string;
    sell: string;
  }>({
    buy: '',
    sell: '',
  });
  const walletAddress = props.route?.params.selectedToken?.address;
  const walletChainId = props.route?.params.selectedToken?.chainId;

  /**
   * 申请批准交易的额度
   * @returns 
   */
  async function transactionForSignFun() {
    const transactionForSign = await buildTxForApproveTradeWithRouter(payToken.contract_addr, walletAddress, walletChainId);
    console.log("Transaction for approve: ", transactionForSign);
    const approveTxHash = await signAndSendTransaction(transactionForSign, walletAddress, walletChainId);
    console.log("Approve tx hash: ", approveTxHash);
  }

  function getDecimals(chainName: string, contract_addr: string, symbol: string) {
    let params: { chain: string; symbol: string; contract_addr?: string; } = {
      chain: chainName,
      contract_addr: contract_addr,
      symbol: symbol
    };
    if (contract_addr === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      delete params.contract_addr;
    }
    return getSymbolSupport(params).then(res => {
      return res?.data[0].token[0].contractUnit || 0;
    }).catch(error => {
      console.error(error);
      return 0;
    });
  }

  const handleSwap = async () => {
    setReqestLoading(true);
    const { address, chainId, chain } = props?.route?.params.selectedToken as TokenDetail;
    const tokenDecimals = await getDecimals(chain, payToken.contract_addr, payToken.symbol);
    const swapParams = {
      src: payToken.contract_addr, // The address of the token you want to swap from (USDC)
      dst: receiveToken.contract_addr, // The address of the token you want to swap to (USDT)
      amount: toString(money.sell * 10 ** tokenDecimals), // Amount of 1INCH to swap (in wei)
      from: address,
      slippage: 1, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
      disableEstimate: false, // Set to true to disable estimation of swap details
      allowPartialFill: false // Set to true to allow partial filling of the swap order
    };
    try {
      await getTokenQuote(
        payToken,
        receiveToken,
        money,
        setMoney,
        tokenDecimals
      )
      await delay(1000);
      await transactionForSignFun();
      await delay(1500);
      // handle too many request
      const swapTransaction = await buildTxForSwap(swapParams);
      getGasPriceToUSD(props?.route?.params.selectedToken.chain, swapTransaction.gas * swapTransaction.gasPrice).then(res => {
        setGasFee(res);
      }).catch(error => {
        console.error(error);
        setGasFee(0);
      });
      setSwapTransaction(swapTransaction);
      setReqestLoading(false);
      setShowSwapWindow(true);
      setReqestLoading(false);
    } catch (error) {
      console.error('获取失败', error);
      showToast('获取失败, 请稍后重试')
      setReqestLoading(false);
    }
    const swapTxHash = await signAndSendTransaction(swapTransaction, walletAddress, walletChainId);
    console.log("Swap tx hash: ", swapTxHash);
  };

  const toggleDialogTokenSelect = () => {
    setTokenSelectWindowVisible((visible) => {
      return !visible;
    });
  };

  const toggleDialogSwap = () => {
    setShowSwapWindow((visible) => {
      return !visible;
    });
  }

  async function reqTokenList() {
    const { address, chainId } = props?.route?.params.selectedToken as TokenDetail;
    const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);

    return getChainIdBalance({
      chain_id: toString(chainId),
      address: address,
      wallet_uuid: wallet_uuid,
      device_id: device_id,
    }).then(res => {
      if (res.data) {
        return res?.data || [];
      } else {
        return [];
      }
    }
    ).catch(error => {
      console.error(error);
      return [];
    });
  }

  async function openTokenList() {
    toggleDialogTokenSelect();
    reqTokenList().then(res => {
      setTokenList(res as TokenDetail[]);
    }).catch(error => {
      console.error(error);
      setTokenList([]);
    });
  }

  function payTokenSelected() {
    setTokenListState("pay");
    openTokenList();
  }

  function receiveTokenSelected() {
    setTokenListState("receive");
    openTokenList();
  }

  function tokenSelected(item: TokenDetail) {
    if (!item.contract_addr) {
      item.contract_addr = item.chainContractAddr
    }
    if (tokenListState === "pay") {
      setPayToken(item);
    } else {
      setReceiveToken(item);
    }
    toggleDialogTokenSelect();
  }

  function reverseTokenPosition() {
    setPayToken(receiveToken);
    setReceiveToken(payToken);
  }

  async function buildTxForSwap(swapParams: any) {
    const url = apiRequestUrl("/swap", swapParams, walletChainId);
    // Fetch the swap transaction details from the API
    return http.get("https://api.1inch.dev/swap/v5.2" + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'MlYjlwvbhbqP0hI5wZB2FIKoQaCUzZuz',
        Accept: 'application/json',
      }
    })
      .then((res) => res.tx).catch(error => {
        console.error(231, error);
        return {};
      })
  }

  async function editTokenAmount(amount: string, type: "buy" | "sell" = "buy") {
    if (type === "buy") {
      setMoney((prev) => {
        return {
          ...prev,
          buy: amount,
        };
      });
    } else {
      if (amount > payToken.balance) {
        setSwapButtonState({
          disabled: true,
          loading: false,
          text: '余额不足'
        });
      } else {
        setSwapButtonState({
          disabled: false,
          loading: false,
          text: '获取报价'
        });
      }
      setMoney((prev) => {
        return {
          ...prev,
          sell: amount,
        };
      });
    }
  }

  function signTransaction() {
    setSwapSignButtonLoading(true)
    signAndSendTransaction(swapTransaction, walletAddress, walletChainId).then(res => {
      setSwapSignButtonLoading(false)
      showToast('兑换成功')
      toggleDialogSwap();
      props.navigation.navigate('home', {
        tab: 'asset',
      });
    }).catch((err) => {
      setSwapSignButtonLoading(false)
      showToast('兑换失败, 请稍后重试')
      console.error(err);
    });
  }

  function handleSwapDisabled() {
    return (payToken.contract_addr === receiveToken.contract_addr) ||
      (payToken.contract_addr === '' ||
        receiveToken.contract_addr === '') ||
      swapButtonState.disabled
  }

  useEffect(() => {
    setPayToken(props?.route?.params.selectedToken);
    reqTokenList().then(res => {
      if (res.length > 0) {
        setReceiveToken(res[0]);
      }
    }).catch(error => {
      console.error(error);
      setTokenList([]);
    });
  }, [])

  return (
    <Layout>
      <SafeAreaView>
        <View>
          <Text>{payToken.chain || payToken.chainName}</Text>
        </View>
        <View style={{ backgroundColor: '#F5F5F5', borderRadius: 12, marginBottom: 20 }}>
          <View style={{ padding: 13 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#AEAEAE', fontSize: 12 }}>
                {/* {t('assetSwap.sellOut')} */}
                You pay
              </Text>
              <Text style={{ color: '#5D5D5D', fontSize: 12 }}>
                {t('assetSwap.balance')}
                ：{payToken.balance}</Text>
            </View>
            <TouchableWithoutFeedback onPress={payTokenSelected}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#F9F9F9',
                  paddingVertical: 10,
                }}
              >
                {
                  payToken.logo && <Avatar rounded source={{ uri: payToken.logo }} />
                }
                {/* <Avatar rounded source={{ uri: payToken.logo }} /> */}
                <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                    <View>
                      <Text>{payToken.symbol}</Text>
                      <Text
                        style={{
                          color: '#999999',
                          fontWeight: '500',
                          fontSize: 11,
                          lineHeight: 16,
                        }}
                      >
                        {payToken.chain || payToken.chainName}
                      </Text>
                    </View>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        // color: '#C8C8C8',
                        fontSize: 26,
                        lineHeight: 30,
                        fontWeight: 'bold',
                        minWidth: 100,
                        textAlign: 'right',
                      }}
                      // placeholderTextColor={'gray'}
                      onChangeText={(sell) => {
                        editTokenAmount(sell, "sell");
                      }}
                      placeholder="0.00"
                      value={money.sell}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View>
              <Text>~${((payToken.assetUsd / payToken.balance) * money.sell).toFixed(2)}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={reverseTokenPosition}>
            <View style={{ height: 3, backgroundColor: '#FFFFFF', position: 'relative' }}>
              <View
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: '#fff',
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  position: 'absolute',
                  left: '50%',
                  marginLeft: -13,
                  top: -13,
                }}
              >
                <Icon name="swap" size={14} />
              </View>
            </View>

          </TouchableWithoutFeedback>
          <View style={{ padding: 13 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#AEAEAE', fontSize: 12 }}>
                {/* {t('assetSwap.sellOut')} */}
                You receive
              </Text>
              <Text style={{ color: '#5D5D5D', fontSize: 12 }}>{
                t('assetSwap.balance')
              }：{receiveToken.balance}</Text>
            </View>
            <TouchableWithoutFeedback onPress={receiveTokenSelected}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#F9F9F9',
                  paddingVertical: 10,
                }}
              >
                {
                  receiveToken.logo && <Avatar rounded source={{ uri: receiveToken.logo }} />
                }
                {/* <Avatar rounded source={{ uri: receiveToken.logo }} /> */}
                <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                    <View>
                      <Text>{receiveToken.symbol}</Text>
                      <Text
                        style={{
                          color: '#999999',
                          fontWeight: '500',
                          fontSize: 11,
                          lineHeight: 16,
                        }}
                      >
                        {receiveToken.chainName}
                      </Text>
                    </View>
                    <TextInput
                      editable={false}
                      keyboardType="numeric"
                      style={{
                        fontSize: 26,
                        lineHeight: 30,
                        fontWeight: 'bold',
                        minWidth: 100,
                        textAlign: 'right',
                      }}
                      onChangeText={(buy) => {
                        editTokenAmount(buy, "buy");
                      }}
                      placeholder="0.00"
                      value={money.buy}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <Button
          onPress={handleSwap}
          disabled={handleSwapDisabled()}
        >
          {/* {t('assetSwap.exchange')} */}
          {swapButtonState.text}
        </Button>
        <BottomOverlay
          visible={tokenSelectWindowVisible}
          title={"选择币种"}
          onBackdropPress={toggleDialogTokenSelect}
        >
          <View>
            {
              tokenList.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      tokenSelected(item)
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                      {
                        item.logo && <Avatar rounded source={{ uri: item.logo }} />
                      }
                      {/* <Avatar rounded source={{ uri: item.logo }} /> */}
                      <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                          <View>
                            <Text>{item.symbol}</Text>
                            <Text
                              style={{
                                color: '#999999',
                                fontWeight: '500',
                                fontSize: 11,
                                lineHeight: 16,
                              }}
                            >
                              {item.chain}
                            </Text>
                          </View>
                          <Text>{item.balance}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
          </View>
        </BottomOverlay>
        <BottomOverlay
          visible={showSwapWindow}
          title={"兑换"}
          onBackdropPress={toggleDialogSwap}
        >
          <View
            style={{
              height: 300,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
              marginBottom: 14,
            }}
          >
            <View>
              <Text>
                {money.sell} {payToken.symbol}
              </Text>
              <Text>
                兑换
              </Text>
              <Text>
                {money.buy} {receiveToken.symbol}
              </Text>

              <Text>
                Network Fee ~$
                {gasFee}
              </Text>
            </View>
            <Button onPress={signTransaction} disabled={swapSignButtonLoading}>
              {swapSignButtonLoading ? '兑换中...' : '兑换'}
            </Button>
          </View>
        </BottomOverlay>
        <Spinner visible={reqestLoading} textContent='获取报价中' />
      </SafeAreaView>
    </Layout>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {};
});

export default Swap;
