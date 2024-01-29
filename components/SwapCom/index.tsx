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
import { set, toString } from 'lodash';
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
import { useNavigation } from '@react-navigation/native';
import { getWallet } from '@common/wallet';
import { BLOCK_CHAIN_ID_MAP } from '@common/utils/sqlite';
import SwapChainSelect from './SwapChainSelect';
import SwapTokenSelect from './SwapTokenSelect';
import SwapSetting from './SwapSetting';
import IconFont from '@assets/iconfont';

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

type ChainDetailType = {
    chainName: string;
    default: boolean;
    gasSymbol: string;
    hot: boolean;
    logo: string;
    token: TokenDetail[];
}

type SwapSettingFormType = {
    slippage: number;
}

const initTokenDetail = {
    address: '',
    assetCny: '',
    assetUsd: '',
    balance: '',
    chain: '',
    chainName: '',
    contract_addr: '',
    index: 0,
    logo: '',
    symbol: '',
    chainId: 0,
    chainContractAddr: '',
};

const initChainDetail = {
    chainName: '',
    default: false,
    gasSymbol: '',
    hot: false,
    logo: '',
    token: [],
}



const SwapCom = ({ initChainId, initChain }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [tokenSelectWindowVisible, setTokenSelectWindowVisible] = useState(false);
    const [chainSelectWindowVisible, setChainSelectWindowVisible] = useState(false);
    const [swapSettingWindowVisible, setSwapSettingWindowVisible] = useState(false);
    const [tokenList, setTokenList] = useState<TokenDetail[]>([]);
    const [tokenListState, setTokenListState] = useState<"pay" | "receive">("pay");
    const [payToken, setPayToken] = useState<TokenDetail>(initTokenDetail);
    const [receiveToken, setReceiveToken] = useState<TokenDetail>(initTokenDetail);
    const [showSwapWindow, setShowSwapWindow] = useState(false);
    const [chainList, setChainList] = useState<ChainDetailType[]>([initChainDetail]);
    const [gasFee, setGasFee] = useState(0);
    const [swapButtonState, setSwapButtonState] = useState({
        disabled: true,
        loading: false,
        text: '获取报价'
    });
    const [swapSignButtonLoading, setSwapSignButtonLoading] = useState(false)
    const [swapTransaction, setSwapTransaction] = useState<any>({});
    const [reqestLoading, setReqestLoading] = useState(false);
    const [swapSettingForm, setSwapSettingForm] = useState<SwapSettingFormType>({
        slippage: 1,
    });
    const [swapTransactionParams, setSwapTransactionParams] = useState<{
        chainId: string,
        chain: string,
    }>({
        chainId: initChainId,
        chain: initChain,
    });
    const [money, setMoney] = useState<{
        buy: string;
        sell: string;
    }>({
        buy: '',
        sell: '',
    });

    /** 
     * 申请批准交易的额度
     * @returns 
     */
    async function transactionForSignFun() {
        const transactionForSign = await buildTxForApproveTradeWithRouter(payToken.contract_addr, walletAddress, swapTransactionParams.chainId, swapTransactionParams.chain);
        console.log("Transaction for approve: ", transactionForSign);
        const approveTxHash = await signAndSendTransaction(transactionForSign, walletAddress, swapTransactionParams.chainId, swapTransactionParams.chain, payToken.symbol);
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
        console.log(154, params);

        return getSymbolSupport(params).then(res => {
            return res?.data[0].token[0].contractUnit || 0;
        }).catch(error => {
            console.error(146, error);
            return 0;
        });
    }

    const handleSwap = async () => {
        setReqestLoading(true);
        const tokenDecimals = await getDecimals(swapTransactionParams.chain, payToken.contract_addr, payToken.symbol);
        const swapParams = {
            src: payToken.contract_addr, // The address of the token you want to swap from (USDC)
            dst: receiveToken.contract_addr, // The address of the token you want to swap to (USDT)
            amount: toString(money.sell * 10 ** tokenDecimals), // Amount of 1INCH to swap (in wei)
            from: walletAddress,
            slippage: swapSettingForm.slippage, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
            disableEstimate: false, // Set to true to disable estimation of swap details
            allowPartialFill: false // Set to true to allow partial filling of the swap order
        };
        console.log(174, swapParams);

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
            getGasPriceToUSD(swapTransactionParams.chain, swapTransaction.gas * swapTransaction.gasPrice).then(res => {
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
            setReqestLoading(false);
            console.error('获取失败', error);
            if (error.message) {
                showToast(error.message)
            } else {
                showToast('获取失败, 请稍后重试')
            }
        }
        console.log(207, swapTransaction, walletAddress, swapTransactionParams.chainId);

    };

    const toggleDialogTokenSelect = () => {
        setTokenSelectWindowVisible((visible) => {
            return !visible;
        });
    };

    const toggleDialogChainSelect = () => {
        setChainSelectWindowVisible((visible) => {
            return !visible;
        });
    }

    const toggleDialogSwapSetting = () => {
        setSwapSettingWindowVisible((visible) => {
            return !visible;
        });
    }

    const toggleDialogSwap = () => {
        setShowSwapWindow((visible) => {
            return !visible;
        });
    }

    async function reqTokenList(address: string) {
        const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
        console.log(240, swapTransactionParams);
        const param = {
            chain_id: toString(swapTransactionParams.chainId),
            address: address,
            wallet_uuid: wallet_uuid,
            device_id: device_id,
        }
        console.log(241, param);


        return getChainIdBalance(param).then(res => {
            console.log(248, res);

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
        reqTokenList(walletAddress).then(res => {
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

    function chainSelected(item: ChainDetailType) {
        console.log(292, item);

        setSwapTransactionParams({
            chainId: item.chainId,
            chain: item.chainName,
        });
        setPayToken(item.token[0]);
        setReceiveToken(item.token[1]);
        toggleDialogChainSelect();
    }

    function changeSwapSettingForm(form: any) {
        setSwapSettingForm(form);
    }

    function swapSetting() {
        toggleDialogSwapSetting()
    }



    function reverseTokenPosition() {
        setPayToken(receiveToken);
        setReceiveToken(payToken);
    }

    async function buildTxForSwap(swapParams: any) {
        const url = apiRequestUrl("/swap", swapParams, swapTransactionParams.chainId);
        console.log(284, url);

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

    async function signTransaction() {
        setSwapSignButtonLoading(true)
        console.log(335, swapTransaction, walletAddress, swapTransactionParams.chainId);

        signAndSendTransaction(swapTransaction, walletAddress, swapTransactionParams.chainId, swapTransactionParams.chain, payToken.symbol).then(res => {
            console.log(370, res);
            setSwapSignButtonLoading(false)
            showToast('兑换成功')
            toggleDialogSwap();
            // navigation.navigate('home', {
            //     tab: 'asset',
            // });
        }).catch((err) => {
            setSwapSignButtonLoading(false)
            showToast('兑换失败, 请稍后重试')
            console.error(err);
        });
    }

    function handleSwapDisabled() {
        if (payToken?.balance < money.sell) return true
        return (payToken?.contract_addr === receiveToken?.contract_addr) ||
            (payToken?.contract_addr === '' ||
                receiveToken?.contract_addr === '') ||
            !payToken?.contract_addr ||
            !receiveToken?.contract_addr ||
            swapButtonState?.disabled
    }

    useEffect(() => {
        if (walletAddress) {
            reqTokenList(walletAddress).then(res => {
                if (res.length > 0) {
                    const defaultToken = res[0];
                    if (!defaultToken.contract_addr) {
                        defaultToken.contract_addr = defaultToken.chainContractAddr
                    }
                    setPayToken(defaultToken);
                }
            })
        }
    }, [swapTransactionParams.chainId])


    useEffect(() => {
        // setPayToken(props?.route?.params.selectedToken);
        async function initSwapData() {
            const sqliteData = (await getWallet(BLOCK_CHAIN_ID_MAP.Ethereum)) ?? {};
            const address = sqliteData?.account?.address;
            if (!address) navigation.navigate('guide')
            setWalletAddress(address);
            getSymbolSupport({}).then(res => {
                if (res.data) {
                    const chainList = res.data || [initChainDetail];
                    setChainList(chainList);
                }
            })
            reqTokenList(address).then(res => {
                if (res.length > 0) {
                    const defaultToken = res[0];
                    if (!defaultToken.contract_addr) {
                        defaultToken.contract_addr = defaultToken.chainContractAddr
                    }
                    setPayToken(res[0]);
                }
            })
        }
        initSwapData()
    }, [])

    return (
        <Layout>
            <SafeAreaView>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                    }}
                >
                    <TouchableWithoutFeedback onPress={toggleDialogChainSelect}>
                        <View
                            style={{
                                borderRadius: 12,
                                marginBottom: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text style={{ fontSize: 12 }}>
                                {swapTransactionParams.chain}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={swapSetting}>
                        <IconFont name="a-261" />
                    </TouchableWithoutFeedback>
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

                            {
                                !payToken?.contract_addr ?
                                    (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderBottomWidth: 1,
                                                borderColor: '#F9F9F9',
                                                paddingVertical: 10,
                                            }}
                                        >
                                            <Text>Select token</Text>
                                        </View>
                                    ) :
                                    (
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
                                    )
                            }
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
                            }：{receiveToken?.balance}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={receiveTokenSelected}>
                            {
                                !receiveToken?.contract_addr ?
                                    (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderBottomWidth: 1,
                                                borderColor: '#F9F9F9',
                                                paddingVertical: 10,
                                            }}
                                        >
                                            <Text>Select token</Text>
                                        </View>
                                    ) :
                                    (
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
                                                receiveToken?.logo && <Avatar rounded source={{ uri: receiveToken?.logo }} />
                                            }
                                            {/* <Avatar rounded source={{ uri: receiveToken.logo }} /> */}
                                            <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                                                    <View>
                                                        <Text>{receiveToken?.symbol}</Text>
                                                        <Text
                                                            style={{
                                                                color: '#999999',
                                                                fontWeight: '500',
                                                                fontSize: 11,
                                                                lineHeight: 16,
                                                            }}
                                                        >
                                                            {receiveToken?.chainName}
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
                                    )
                            }

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
                <SwapTokenSelect
                    tokenSelectWindowVisible={tokenSelectWindowVisible}
                    toggleDialogTokenSelect={toggleDialogTokenSelect}
                    tokenList={tokenList}
                    tokenSelected={tokenSelected}
                />
                <SwapChainSelect
                    chainSelectWindowVisible={chainSelectWindowVisible}
                    toggleDialogChainSelect={toggleDialogChainSelect}
                    chainList={chainList}
                    chainSelected={chainSelected}
                />
                <SwapSetting
                    swapSettingWindowVisible={swapSettingWindowVisible}
                    toggleDialogSwapSetting={toggleDialogSwapSetting}
                    swapSettingForm={swapSettingForm}
                    changeSwapSettingForm={changeSwapSettingForm}
                />
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
                                {money.sell} {payToken?.symbol}
                            </Text>
                            <Text>
                                兑换
                            </Text>
                            <Text>
                                {money.buy} {receiveToken?.symbol}
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

export default SwapCom;
