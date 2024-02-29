import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import http from '@common/utils/http';
import { getChainIdBalance, get1InchKey } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { getData, storeData } from '@common/utils/storage';
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
    getChainLogo
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
import { useFocusEffect } from '@react-navigation/native';
import { useTheme, Colors } from '@rneui/themed';
import { CustomColors } from 'style/them';

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



const SwapCom = ({ pageStyle, initChainId, initChain }: {
    pageStyle?: 'grey' | 'white', initChainId: string, initChain: string
}) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const theme = useTheme();
    const styles = useStyles(theme.theme);
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
    const [authorizationKey, setAuthorizationKey] = useState<string>('');
    const [gasFee, setGasFee] = useState(0);
    const [swapButtonState, setSwapButtonState] = useState({
        disabled: true,
        loading: false,
        text: t('swap.predExRes')
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
        logo?: string
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
    async function transactionForSignFun(approveAmount: string) {
        const transactionForSign = await buildTxForApproveTradeWithRouter(payToken.contract_addr, walletAddress, swapTransactionParams.chainId, swapTransactionParams.chain, approveAmount, authorizationKey);
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
        const receiveTokenDecimals = await getDecimals(swapTransactionParams.chain, receiveToken.contract_addr, receiveToken.symbol);
        const swapParams = {
            src: payToken.contract_addr, // The address of the token you want to swap from (USDC)
            dst: receiveToken.contract_addr, // The address of the token you want to swap to (USDT)
            amount: toString(money.sell * 10 ** tokenDecimals), // Amount of 1INCH to swap (in wei)
            from: walletAddress,
            slippage: swapSettingForm.slippage, // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
            disableEstimate: false, // Set to true to disable estimation of swap details
            allowPartialFill: false // Set to true to allow partial filling of the swap order
        };

        try {
            await getTokenQuote(
                payToken,
                receiveToken,
                money,
                setMoney,
                tokenDecimals,
                receiveTokenDecimals,
                authorizationKey
            )
            await delay(1000);
            await transactionForSignFun(toString(money.sell * 10 ** tokenDecimals));
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
                showToast(t("swap.failRetry"))
            }
        }
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
        setMoney({
            buy: "",
            sell: ""
        })
        toggleDialogTokenSelect();
    }

    function chainSelected(item: ChainDetailType) {
        console.log(292, item);

        setSwapTransactionParams({
            chainId: item.chainId,
            chain: item.chainName,
            logo: item.logo
        });
        setPayToken(item.token[0]);
        setReceiveToken(item.token[1]);
        setMoney({
            buy: "",
            sell: ""
        })
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
        setMoney({
            buy: "",
            sell: ""
        })
    }

    async function buildTxForSwap(swapParams: any) {
        const url = apiRequestUrl("/swap", swapParams, swapTransactionParams.chainId);
        console.log(284, url);

        // Fetch the swap transaction details from the API
        return http.get("https://api.1inch.dev/swap/v5.2" + url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authorizationKey,
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
            if (Number(amount) > Number(payToken.balance)) {
                setSwapButtonState({
                    disabled: true,
                    loading: false,
                    text: t("swap.insufBal")
                });
            } else {
                setSwapButtonState({
                    disabled: false,
                    loading: false,
                    text: t("swap.predExRes")
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
        signAndSendTransaction(swapTransaction, walletAddress, swapTransactionParams.chainId, swapTransactionParams.chain, payToken.symbol).then(res => {
            setSwapSignButtonLoading(false)
            showToast(t("swap.exchSuc"))
            toggleDialogSwap();
            navigation.navigate('home', { tab: 'asset' });
        }).catch((err) => {
            setSwapSignButtonLoading(false)
            showToast(t("swap.exchFailRetry"))
            console.error(err);
        });
    }

    function handleSwapDisabled() {
        if (Number(money.sell) <= 0) return true;
        if (Number(payToken?.balance) < Number(money.sell)) return true
        return (payToken?.contract_addr === receiveToken?.contract_addr) ||
            (payToken?.contract_addr === '' ||
                receiveToken?.contract_addr === '') ||
            !payToken?.contract_addr ||
            !receiveToken?.contract_addr ||
            swapButtonState?.disabled
    }

    function request1inchKey() {
        get1InchKey({}).then(res => {
            if (res.code === 200) {
                setAuthorizationKey(res.data.key)
            }
        })
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

    // setPayToken(props?.route?.params.selectedToken);
    async function initSwapData() {
        const sqliteData = (await getWallet(BLOCK_CHAIN_ID_MAP.Ethereum)) ?? {};

        const address = sqliteData?.account?.address;
        if (!address) return navigation.navigate('guide')
        request1inchKey()
        setWalletAddress(address);
        getSymbolSupport({}).then(res => {
            if (res.data) {
                const chainList = res.data || [initChainDetail];
                const logo = getChainLogo(swapTransactionParams.chainId, chainList)
                setSwapTransactionParams({
                    ...swapTransactionParams,
                    logo: logo
                })
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

    useFocusEffect(
        React.useCallback(() => {
            initSwapData()
        }, [])
    )

    return (
        <View style={{}}>
            <View style={styles.headerRow}>
                <TouchableWithoutFeedback onPress={toggleDialogChainSelect}>
                    <View style={styles.chainSelectContainer}>
                        <View style={styles.chainLogo}>
                            {swapTransactionParams.logo && (
                                <Avatar
                                    containerStyle={styles.chainLogo}
                                    rounded
                                    source={{ uri: swapTransactionParams.logo }}
                                />
                            )}
                        </View>

                        <Text style={styles.chainText}>
                            {swapTransactionParams.chain}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={swapSetting}>
                    <View style={styles.settingsIcon}>
                        <IconFont size={14} name="a-261" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.tokenSection}>
                <View>
                    <View style={styles.tokenLabelText}>
                        <Text style={styles.tokenLabelText}>{t("swap.from")}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={payTokenSelected}>
                        <View style={[styles.tokenTouchable,
                        {
                            backgroundColor: pageStyle === 'grey' ? theme.theme.colors.backgroundGrey : theme.theme.colors.backgroundWhite,
                        }]}>
                            <View style={styles.tokenImage}>
                                {!payToken?.contract_addr ? (
                                    <Text>Select token</Text>
                                ) : (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Avatar
                                            containerStyle={styles.tokenImage}
                                            rounded
                                            source={{ uri: payToken?.logo }}
                                        />
                                        <Text style={styles.tokenSymbolText}>{payToken.symbol}</Text>
                                    </View>
                                )}
                                <IconFont style={{ marginHorizontal: 14 }} name='swap-select' size={10} />
                            </View>
                            <View style={styles.flexOne}>
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.tokenInputStyle}
                                    placeholderTextColor={theme.theme.colors.grey3}
                                    onChangeText={(sell) => {
                                        editTokenAmount(sell, "sell");
                                    }}
                                    placeholder="0.00"
                                    value={money.sell}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.balanceText}>
                            {t('swap.availableBalance')}: {payToken.balance} {payToken.symbol}
                        </Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={reverseTokenPosition}>
                    <View style={styles.swapIconContainer}>
                        <IconFont name="xingzhuangjiehe1" size={24} />
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <View style={styles.tokenLabelText}>
                        <Text style={styles.tokenLabelText}>{t("swap.to")}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={receiveTokenSelected}>
                        <View style={[styles.tokenTouchable,
                        {
                            backgroundColor: pageStyle === 'grey' ? theme.theme.colors.backgroundGrey : theme.theme.colors.backgroundWhite,
                        }]}>
                            <View style={styles.tokenImage}>
                                {!receiveToken?.contract_addr ? (
                                    <Text>Select token</Text>
                                ) : (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Avatar
                                            containerStyle={styles.tokenImage}
                                            rounded
                                            source={{ uri: receiveToken?.logo }}
                                        />
                                        <Text style={styles.tokenSymbolText}>{receiveToken?.symbol}</Text>
                                    </View>
                                )}
                                <IconFont style={{ marginHorizontal: 14 }} name='swap-select' size={10} />
                            </View>
                            <View style={styles.flexOne}>
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.tokenInputStyle}
                                    placeholderTextColor={'#999999'}
                                    onChangeText={(buy) => {
                                        editTokenAmount(buy, "buy");
                                    }}
                                    placeholder="0.00"
                                    value={money.buy}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Button
                style={{ marginTop: 26 }}
                onPress={handleSwap}
                disabled={handleSwapDisabled()}
                disabledStyle={{
                    backgroundColor: theme.theme.colors.disabled,
                }}
            >
                <Text style={styles.swapButtonText}>
                    {swapButtonState.text}
                </Text>
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
                maxHeight={400}
                visible={showSwapWindow}
                title={t("swap.confExch")}
                onBackdropPress={toggleDialogSwap}
            >
                <View
                    style={styles.bottomOverlayContainer}
                >
                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ width: 34, height: 34 }}>
                            <Avatar size={34} rounded source={{ uri: payToken?.logo }} />
                        </View>
                        <Text style={styles.smallGrayText}>{t("swap.exchange")}</Text>
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 9,
                                fontWeight: '500'
                            }}
                        >
                            {money.sell} {payToken?.symbol}
                        </Text>
                    </View>
                    <View>
                        <IconFont size={18} name="swap-to" />
                    </View>
                    <View
                        style={{
                            alignItems: 'center'
                        }}
                    >
                        <View style={{ width: 34, height: 34 }}>
                            <Avatar size={34} rounded source={{ uri: receiveToken?.logo }} />
                        </View>
                        <Text style={styles.smallGrayText}>{t("swap.received")}</Text>
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 9,
                                fontWeight: '500'
                            }}
                        >
                            {money.buy} {receiveToken?.symbol}
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 16
                }}>
                    <View style={{ paddingTop: 20 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.grayText}>{t("swap.transFee")}</Text>
                            <Text
                                style={styles.blackText}
                            >
                                ${gasFee}
                            </Text>
                        </View>
                        <View style={{ borderTopWidth: 1, borderColor: '#F7F7F7', marginTop: 20 }}></View>
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.grayText}>{t("swap.exchRate")}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={[styles.blackText, { marginRight: 5 }]}
                                >
                                    1{payToken?.symbol} ≈ {Number(money?.buy) / Number(money?.sell)}{receiveToken?.symbol}
                                </Text>
                                <IconFont size={9} name="swap-swap" />
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 30,
                        paddingHorizontal: 8,
                        marginBottom: 32
                    }}
                >
                    <View style={{ flex: 1, borderRadius: 10, backgroundColor: 'red' }}>
                        <Button buttonStyle={styles.cancelButton} onPress={toggleDialogSwap}>
                            <Text style={styles.cancelButtonText}>
                                {t("swap.back")}
                            </Text>
                        </Button>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'blue', borderRadius: 10, marginLeft: 8 }}>
                        <Button onPress={signTransaction} disabled={swapSignButtonLoading}>
                            <Text style={styles.confirmButtonText}>
                                {swapSignButtonLoading ? `${t("swap.exchInProg")}...` : t("swap.exchange")}
                            </Text>
                        </Button>
                    </View>
                </View>
            </BottomOverlay>
            <Spinner visible={reqestLoading} />
        </View>
    );
};

const useStyles = makeStyles((theme: CustomTheme<CustomColors>, props) => {
    return {
        viewContainer: {},
        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 6,
        },
        chainSelectContainer: {
            display: 'flex',
            alignContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
        },
        chainLogo: {
            width: 20,
            height: 20,
        },
        chainText: {
            fontSize: 14,
            color: theme.colors.grey3,
            paddingLeft: 5,
        },
        settingsIcon: {
            width: 32,
            flexDirection: 'row-reverse',
        },
        tokenSection: {
            marginTop: 26,
        },
        tokenLabelText: {
            color: theme.colors.grey0,
            fontSize: 14,
            paddingLeft: 8,
        },
        tokenTouchable: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 9,
            padding: 15,
            marginTop: 10,
        },
        tokenImageContainer: {
            height: 3,
            backgroundColor: '#fff',
            position: 'relative'
        },
        tokenImage: {
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        tokenSymbolText: {
            color: theme.colors.grey0,
            marginLeft: 10,
        },
        tokenInputStyle: {
            color: theme.colors.grey0,
            fontSize: 14,
            lineHeight: 16,
            minWidth: 150,
            textAlign: 'left',
        },
        balanceText: {
            color: theme.colors.grey2,
            fontSize: 12,
            marginTop: 8,
        },
        swapIconContainer: {
            paddingVertical: 10,
            alignItems: 'center',
        },
        swapButtonStyle: {
            marginTop: 26,
        },
        swapButtonText: {
            paddingVertical: 8,
            fontSize: 14,
            color: theme.colors.white,
        },
        bottomOverlayContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 46,
            marginTop: 32,
        },
        avatarContainer: {
            width: 34,
            height: 34,
        },
        smallGrayText: {
            fontSize: 12,
            color: '#999999',
            marginTop: 10,
        },
        mediumBlackText: {
            fontSize: 14,
            marginTop: 9,
            fontWeight: '500',
        },
        horizontalLine: {
            borderTopWidth: 1,
            borderColor: '#F7F7F7',
            marginTop: 20,
        },
        infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        grayText: {
            fontSize: 14,
            color: '#AAAAAA',
            fontWeight: '500',
        },
        blackText: {
            fontSize: 14,
            color: '#333333',
            fontWeight: '500',
        },
        exchangeRateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        overlayButtonContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            paddingHorizontal: 8,
            marginBottom: 32,
        },
        cancelButton: {
            backgroundColor: '#F5F5F5',
            paddingVertical: 8,
            borderRadius: 10,
        },
        cancelButtonText: {
            color: '#000000',
        },
        confirmButton: {
            backgroundColor: 'blue',
            borderRadius: 10,
            marginLeft: 8,
        },
        confirmButtonText: {
            color: 'white',
        },
        flexOne: {
            flex: 1,
        },

        // Add more styles if necessary
    };
});

export default SwapCom;
