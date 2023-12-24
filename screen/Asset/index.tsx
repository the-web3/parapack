import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Tab, TabView, Text, makeStyles, useTheme } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import IconFont from '@assets/iconfont';
import { DeviceBalanceData, DeviceBalanceTokenList, getDeviceBalance } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { SUCCESS_CODE } from '@common/constants';
import { getData, storeData } from '@common/utils/storage';
import { showToast } from '@common/utils/platform';
import { useFocusEffect } from '@react-navigation/native';
import { CreateAddress } from 'savourlabs-wallet-sdk/wallet';
import { batchInsertOrUpdateAssetTable, updateWalletTable, addToken, getTableInfo } from '@common/wallet';
import BottomOverlay from '@components/BottomOverlay';
import { getFlush } from '@api/common';
import Empty from '@components/Empty';

type Props = {
  fullWidth?: boolean;
  navigation: any;
  route: any;
};

const CARD_LIST = [
  {
    icon: 'zhuanzhang',
    title: 'transfer',
    go: 'transferPayment',
  },
  {
    icon: 'erweima',
    title: 'receipt',
    go: 'collection',
  },
  {
    icon: 'zhuanzhang',
    title: 'purchase',
    go: null, //purchase
  },
  {
    icon: 'duihuanmaduihuan',
    title: 'flash',
    go: 'swap',
  },
];
const Asset = (props: Props) => {
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const { t } = useTranslation();
  const [priceShow, setPriceShow] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [walletInfo, setWalletInfo] = useState<DeviceBalanceData>();
  const [currentWallet, setCurrentWallet] = useState<DeviceBalanceTokenList>();

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  //
  const styles = useStyles(props);

  const getWalletInfo = async () => {
    const wallet_uuid = await getData('wallet_uuid');
    if (!wallet_uuid || wallet_uuid === '{}') {
      props?.navigation?.navigate('guide');
      return;
    }
    const device_id = await getUniqueId();
    const res = await getDeviceBalance({
      device_id,
    });
    console.log('getDeviceBalance', JSON.stringify(res));
    if (res?.data?.token_list?.length <= 0) {
      props?.navigation?.navigate('guide');
      return;
    }

    if (res.code === SUCCESS_CODE && res?.data) {
      setWalletInfo(res?.data);
      setNewWallet(res?.data, wallet_uuid);
    }
  };
  const setNewWallet = async (walletInfo, wallet_uuid) => {
    const currentWalletInfo = (walletInfo?.token_list || [])?.find((item) => item.wallet_uuid === wallet_uuid);
    if (currentWalletInfo) {
      setCurrentWallet(currentWalletInfo);
      storeData('wallet_uuid', wallet_uuid);
    } else {
      storeData('wallet_uuid', walletInfo?.token_list[0]?.wallet_uuid);
      setCurrentWallet(walletInfo?.token_list[0] || {});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFlush();
      getWalletInfo();
      getTableInfo();
    }, [])
  );
  // console.log(88888, JSON.stringify(currentWallet));
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.purpleBg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        {/* <View style={styles.topBar}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                // props?.navigation.navigate('tokenDetail');
                // props?.navigation.navigate('coinDetail');
                props?.navigation.navigate('settingScreen', {
                  wallet_uuid: currentWallet?.wallet_uuid,
                });
                // TODO: test
                // addToken({ chain: 'Ploygon', contract_addr: '', symbol: 'Ploygon', tokenName: 'Ploygon' });
                // addToken({ chain: 'Arbitrum', contract_addr: '', symbol: 'Arbi', tokenName: 'Arbi' });
                // //TODO: test
                // const account = CreateAddress({
                //   chain: 'btc',
                //   index: 0,
                //   network: 'mainnet',
                //   receiveOrChange: 0,
                //   seedHex:
                //     'd59419ac39d3b2baed209a61dc9de0bf85c5106cdda28513cf479deb1ce7de2fdeaeeb8943be173c0f539f6f5382a29cda69057db56c202aad94d6fa101c9633',
                // });
                // console.log(66666, account);
                // // TODO: test
                // batchInsertOrUpdateAssetTable({
                //   backup: false,
                //   device_id: 'a9caa5c8abac3bf2',
                //   mnemonic_code: '44db894501449e33910e3a1a2266e580',
                //   password: '1234567a',
                //   wallet_asset_cny: '0',
                //   wallet_asset_usd: '0',
                //   wallet_balance: [
                //     {
                //       address: '0x88fcbbc7E4e5F109cb835B70444DC7d8267bc30F',
                //       asset_cny: '0',
                //       asset_usd: '0',
                //       balance: '0',
                //       chain: 'Ethereum',
                //       contract_addr: '',
                //       index: 0,
                //       logo: '',
                //       privateKey: '0xbf979d60804aa3127c609ed8ac61706e9eba8ee5b05ef30df6b9ab7a513ed5e4',
                //       publicKey: '0x0321ff4d0210cd051f1b99cf20a581ea543716b266dcb8b447f2ed639eda313dc0',
                //       symbol: 'ETH',
                //     },
                //     {
                //       address: '14CfCpyRuDjhPKwCmDbsian9aTtiPvowE7',
                //       asset_cny: '0',
                //       asset_usd: '0',
                //       balance: '0',
                //       chain: 'BITCOIN',
                //       contract_addr: '',
                //       index: 0,
                //       logo: '',
                //       privateKey: 'c4deccc9e22a8a093fd8f7fa7f012d3ebbef7202819badc412765a28e821aa07',
                //       publicKey: '035e7fa26107794074fa082204f65be717ef4cd2085bdf971dbb8202597a67caa7',
                //       symbol: 'BTC',
                //     },
                //   ],
                //   wallet_name: 'S_6',
                //   wallet_uuid: '1ea80516-7134-400b-893e-9a545d25bfbc',
                // });
                // updateWalletTable('b692f18b-1b5a-4a61-ada7-a51017867d78', {
                //   key: 'is_del = ?',
                //   value: [1],
                // });
              }}
            >
              <Icon style={{ marginRight: 16 }} name="setting" size={24} color={theme.colors.black} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('scannerScreen');
              }}
            >
              <Icon name="scan1" size={24} color={theme.colors.black} />
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{ marginTop: 14, justifyContent: 'center', flexDirection: 'row' }}>
          <Text style={{ fontWeight: 500, color: '#333', fontSize: 16 }}>{t(`asset.myAssets`)}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardBetween}>
            <TouchableOpacity onPress={toggleOverlay}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.text}>{currentWallet?.wallet_name}</Text>
                <Icon name="caretdown" style={{ color: '#fff', marginLeft: 8 }} />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                // props?.navigation.navigate('tokenDetail');
                // props?.navigation.navigate('coinDetail');
                props?.navigation.navigate('settingScreen', {
                  wallet_uuid: currentWallet?.wallet_uuid,
                });
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.text}>详情</Text>
                <Icon name="right" style={{ color: '#fff', marginLeft: 8 }} />
              </View>
            </TouchableOpacity> */}
          </View>
          <View
            style={{
              ...styles.cardBetween,
              marginTop: 25,
            }}
          >
            <View style={styles.price}>
              <Text style={{ color: '#fff', fontSize: 40, lineHeight: 47 }}>
                ¥{priceShow ? (Number(currentWallet?.wallet_asset_cny) || 0)?.toFixed?.(4) : '******'}
              </Text>
              <IconFont
                name={priceShow ? 'eye-open' : 'eye-close'}
                style={{ marginLeft: 3 }}
                size={12}
                onPress={() => {
                  setPriceShow(!priceShow);
                }}
              />
            </View>
            {!currentWallet?.backup && (
              <TouchableOpacity
                onPress={() => {
                  props?.navigation.navigate('startBackup');
                }}
              >
                <View style={styles.button}>
                  <Icon name="pluscircleo" size={12} style={{ marginRight: 3, color: '#000' }} />
                  <Text style={{ lineHeight: 18, color: '#000' }}>{t(`asset.Backup`)}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.cardBottom}>
            {CARD_LIST.map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => {
                  if (item.go) {
                    props?.navigation.navigate('searchToken', {
                      go: item.go,
                    });
                  } else {
                    showToast('暂不支持此功能');
                  }
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <IconFont name={item.icon} style={{ marginRight: 6 }} size={12} />
                  <Text style={{ lineHeight: 16, color: '#000' }}>{t(`asset.${item.title}`)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32 }}>
            <View style={{ width: 180 }}>
              <TouchableOpacity activeOpacity={1}>
                <Tab
                  value={index}
                  onChange={(e) => {
                    setIndex(e);
                  }}
                  dense
                  indicatorStyle={{
                    backgroundColor: '#3B28CC',
                    height: 4,
                    borderRadius: 2,
                    width: 60,
                  }}
                  titleStyle={(active: boolean) => {
                    return { fontSize: 12, marginVertical: 8, color: active ? '#3B28CC' : '#AEAEAE' };
                  }}
                >
                  <Tab.Item>{t(`asset.Assets`)}</Tab.Item>
                  <Tab.Item>DeFi</Tab.Item>
                  <Tab.Item>NFT</Tab.Item>
                </Tab>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  props?.navigation.navigate('searchToken', {
                    go: 'tokenDetail',
                  });
                }}
              >
                <View style={styles.search}>
                  <Icon name="search1" color={'#5A5A5A'} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props?.navigation.navigate('addToken');
                }}
              >
                <View style={styles.add}>
                  <Icon name="plus" color={'#5A5A5A'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TabView value={index} onChange={setIndex} animationType="spring">
              <TabView.Item style={{ width: '100%' }}>
                <ScrollView
                  style={{ paddingHorizontal: 25 }}
                  contentContainerStyle={{ paddingBottom: 300 }}
                  showsVerticalScrollIndicator={false}
                >
                  {(currentWallet?.wallet_balance || []).map((item: any, index) => (
                    <TouchableOpacity
                      key={`${item.symbol}${item.contract_addr}${item.address}${index}`}
                      onPress={() => {
                        storeData('current_token_detail', JSON.stringify(item));
                        props?.navigation.navigate('tokenDetail');
                      }}
                    >
                      <View style={styles.assetList}>
                        <Avatar
                          rounded
                          source={{ uri: item.logo || 'https://randomuser.me/api/portraits/men/36.jpg' }}
                        />
                        <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <Text>{item.symbol}</Text>
                            <Text>{item.balance}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.listPrice}>{item.chain}</Text>
                            </View>
                            <View>
                              <Text style={{ color: '#999999' }}>¥{(Number(item.asset_cny) || 0)?.toFixed?.(4)}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <View>
                  <Empty />
                </View>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <View>
                  <Empty />
                </View>
              </TabView.Item>
            </TabView>
          </View>
        </View>
        <BottomOverlay
          visible={visible}
          title="选择钱包"
          after={
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('settingScreen', {
                  wallet_uuid: currentWallet?.wallet_uuid,
                });
              }}
            >
              <IconFont name="gengduoshezhi" />
            </TouchableOpacity>
          }
          onBackdropPress={toggleOverlay}
        >
          {(walletInfo?.token_list || []).map((item) => (
            <TouchableOpacity
              key={item.wallet_uuid}
              onPress={() => {
                setNewWallet(walletInfo, item.wallet_uuid);
                toggleOverlay();
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#F9F9F9',
                  paddingVertical: 10,
                  backgroundColor: item.wallet_uuid === currentWallet?.wallet_uuid ? 'rgba(249, 249, 249, 1)' : '#fff',
                  paddingHorizontal: 19,
                  borderRadius: 6,
                }}
              >
                <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
                <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <Text>{item.wallet_name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.listPrice}>¥ {item.wallet_asset_cny}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  {!item.backup && (
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        props?.navigation.navigate('startBackup');
                      }}
                      style={{ marginRight: 6 }}
                    >
                      <View style={styles.button}>
                        <Icon name="exclamationcircleo" size={12} style={{ marginRight: 3 }} color={'#3B2ACE'} />
                        <Text style={{ lineHeight: 18, color: '#3B2ACE' }}>未备份</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <IconFont name="zhongmingming" size={16} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ marginTop: 16 }}>
            <Button
              onPress={async () => {
                props?.navigation?.navigate('guide');
              }}
            >
              添加钱包
            </Button>
          </View>
        </BottomOverlay>
        {/* <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'center',
                position: 'relative',
                // paddingHorizontal: 32,
                paddingBottom: 12,
                // borderBottomWidth: 1,
                // borderBottomColor: '#E9E9E9',
              }}
            >
              <View style={{ position: 'absolute', left: 0, top: 6 }}>
                <Icon name="close" style={{ color: '#000', fontSize: 14 }} />
              </View>
              <Text style={{ color: '#000', fontSize: 14 }}>选择钱包</Text>
            </View>
            <View style={{ height: 300 }}>
              <ScrollView>
                {(walletInfo?.token_list || []).map((item) => (
                  <TouchableOpacity
                    key={item.wallet_uuid}
                    onPress={() => {
                      setNewWallet(walletInfo, item.wallet_uuid);
                      toggleOverlay();
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#F9F9F9',
                        paddingVertical: 10,
                        backgroundColor:
                          item.wallet_uuid === currentWallet?.wallet_uuid ? 'rgba(249, 249, 249, 1)' : '#fff',
                        paddingHorizontal: 19,
                        borderRadius: 6,
                      }}
                    >
                      <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
                      <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                          <Text>{item.wallet_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.listPrice}>¥ {item.wallet_asset_cny}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        {!item.backup && (
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              props?.navigation.navigate('startBackup');
                            }}
                            style={{ marginRight: 6 }}
                          >
                            <View style={styles.button}>
                              <Icon name="exclamationcircleo" size={12} style={{ marginRight: 3 }} color={'#3B2ACE'} />
                              <Text style={{ lineHeight: 18, color: '#3B2ACE' }}>未备份</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        <Icon name="edit" size={16} style={{ color: '#000', fontSize: 18 }} />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        </Overlay> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    gradient: {
      height: '100%',
    },
    price: { display: 'flex', flexDirection: 'row' },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginHorizontal: 22,
      paddingVertical: 12,
    },
    card: {
      // marginBottom: 26,
      height: 156,
      backgroundColor: '#3B28CC',
      borderRadius: 14,
      elevation: 8, // 阴影的浮动高度
      shadowColor: theme.colors.grey3, // 阴影颜色
      shadowOffset: { width: 4, height: 8 }, // 阴影偏移量
      shadowOpacity: 0.5, // 阴影的透明度
      shadowRadius: 18, // 阴影的模糊半径
      marginHorizontal: 22,
      marginVertical: 18,
      marginTop: 18,
      color: theme.colors.white,
      overflow: 'hidden',
      paddingVertical: 15,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 8,
      backgroundColor: '#EDEDED',
      borderRadius: 10,
    },
    cardBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 27,
    },
    text: { color: '#fff' },
    cardBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      paddingVertical: 12,
      justifyContent: 'space-around',
    },
    scrollContainer: {
      paddingTop: 16,
      // paddingHorizontal: 25,
      borderTopLeftRadius: 20, // 左上角边框半径
      borderTopRightRadius: 20, // 右上角边框半径
      borderBottomRightRadius: 0, // 右下角边框半径
      borderBottomLeftRadius: 0, // 左下角边框半径
      backgroundColor: '#fff',
      shadowColor: '#CED8F7',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
      height: '100%',
    },
    viewItem: {
      paddingHorizontal: 22,
      width: '100%',
      overflow: 'hidden',
    },
    listPrice: {
      color: '#999999',
      fontSize: 12,
    },
    green: {
      color: '#5BCC47',
      fontSize: 12,
    },
    img: {
      width: 156,
      height: 102,
      aspectRatio: 1,
      marginTop: 50,
    },
    assetList: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#F9F9F9',
      paddingVertical: 10,
    },
    add: {
      width: 24,
      height: 24,
      backgroundColor: '#F3F3F3',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
    },
    search: {
      width: 24,
      height: 24,
      backgroundColor: '#F3F3F3',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      marginRight: 6,
    },
  };
});
export default Asset;
