import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Overlay, Tab, TabView, Text, makeStyles, useTheme } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import IconFont from '@assets/iconfont';
import { DeviceBalanceData, getDeviceBalance } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { SUCCESS_CODE } from '@common/constants';
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
    go: null,
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

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  //
  const styles = useStyles(props);
  const getWalletInfo = async () => {
    const device_id = await getUniqueId();
    const res = await getDeviceBalance({
      device_id,
      // wallet_uuid: props?.route?.params?.wallet_uuid,
    });
    console.log(99999, JSON.stringify(res));
    if (res.code === SUCCESS_CODE && res?.data) {
      setWalletInfo(res?.data);
      //TODO: 展示列表
    }
  };
  const currentWallet = React.useMemo(() => {
    return walletInfo?.token_list?.find((item) => item.wallet_uuid === props?.route?.params?.wallet_uuid);
  }, [props?.route?.params?.wallet_uuid, walletInfo?.token_list]);

  useEffect(() => {
    getWalletInfo();
  }, []);

  console.log(111111, JSON.stringify(currentWallet));
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.purpleBg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.topBar}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="scan1" style={{ marginRight: 21 }} size={24} color={theme.colors.black} />
            <Icon name="creditcard" size={24} color={theme.colors.black} />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardBetween}>
            <TouchableOpacity onPress={toggleOverlay}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.text}>{currentWallet?.wallet_name}</Text>
                <Icon name="caretdown" style={{ color: '#fff', marginLeft: 8 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('tokenDetail');
                // props?.navigation.navigate('coinDetail');
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={styles.text}>详情</Text>
                <Icon name="right" style={{ color: '#fff', marginLeft: 8 }} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.cardBetween,
              marginTop: 25,
            }}
          >
            <View style={styles.price}>
              <Text style={{ color: '#fff', fontSize: 40, lineHeight: 47 }}>
                ¥{priceShow ? currentWallet.wallet_asset_cny || 0 : '******'}
              </Text>
              <Icon
                name="eyeo"
                size={12}
                color="#fff"
                style={{ marginLeft: 3 }}
                onPress={() => {
                  setPriceShow(!priceShow);
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('startBackup');
              }}
            >
              <View style={styles.button}>
                <Icon name="pluscircleo" size={12} style={{ marginRight: 3, color: '#000' }} />
                <Text style={{ lineHeight: 18, color: '#000' }}>去备份</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardBottom}>
            {CARD_LIST.map((item) => (
              <TouchableOpacity
                key={item.title}
                onPress={() => {
                  // props?.navigation.navigate('tokenDetail');
                  if (item.go) {
                    props?.navigation.navigate(item.go);
                  } else {
                    Toast.show({
                      type: 'error', // 类型：success、error、info
                      text1: '暂不支持此功能', // 标题
                      // text2: '提示内容', // 内容
                      position: 'top', // 位置：top、bottom
                      visibilityTime: 2000, // 可见时间（毫秒）
                      autoHide: true, // 自动隐藏
                    });
                  }
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <IconFont name={item.icon} style={{ marginRight: 6 }} size={12} />
                  {/* <Icon name={item.icon} size={15} style={{ marginRight: 6, color: '#000' }} /> */}
                  <Text style={{ lineHeight: 16, color: '#000' }}>{t(`asset.${item.title}`)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32 }}>
            <View style={{ flex: 1 }}>
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
                  }}
                  titleStyle={(active: boolean) => {
                    return { fontSize: 12, marginVertical: 8, color: active ? '#3B28CC' : '#AEAEAE' };
                  }}
                >
                  <Tab.Item>资产</Tab.Item>
                  <Tab.Item>DeFi</Tab.Item>
                  <Tab.Item>NFT</Tab.Item>
                </Tab>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  props?.navigation.navigate('addToken');
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
                <ScrollView style={{ paddingHorizontal: 25 }} contentContainerStyle={{ paddingBottom: 300 }}>
                  {(currentWallet?.wallet_balance || []).map((item: any) => (
                    <TouchableOpacity
                      key={`${item.symbol}${item.contract_addr}`}
                      onPress={() => {
                        props?.navigation.navigate('tokenDetail', {
                          address: item.address,
                          contract_addr: item.contract_addr,
                          chain: item.symbol, //TODO
                          index: item.index,
                          network: 'mainnet',
                          symbol: item.symbol,
                          wallet_uuid: props?.route?.params?.wallet_uuid,
                        });
                        // props?.navigation.navigate('coinDetail');
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
                            <Text>{item.asset_usd}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={styles.listPrice}>{item.contract_addr}</Text>
                            </View>
                            <View>
                              <Text style={{ color: '#999999' }}>¥{item.asset_cny}</Text>
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
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                      <Image
                        // source={BASE_URI}
                        source={require('@assets/images/emptyRecord.png')}
                        style={styles.img}
                        // containerStyle={styles.item}
                        PlaceholderContent={<ActivityIndicator />}
                      />
                    </View>
                    <Text style={{ fontSize: 10, marginTop: 18, marginBottom: 28, color: '#AEAEAE' }}>暂无数据</Text>
                  </View>
                </View>
              </TabView.Item>
              <TabView.Item style={{ width: '100%' }}>
                <View>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                      <Image
                        // source={BASE_URI}
                        source={require('@assets/images/emptyRecord.png')}
                        style={styles.img}
                        // containerStyle={styles.item}
                        PlaceholderContent={<ActivityIndicator />}
                      />
                    </View>
                    <Text style={{ fontSize: 10, marginTop: 18, marginBottom: 28, color: '#AEAEAE' }}>暂无数据</Text>
                  </View>
                </View>
              </TabView.Item>
            </TabView>
          </View>
        </View>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            backgroundColor: 'white',
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
                <Icon name="close" />
              </View>
              <Text>选择钱包</Text>
            </View>
            <View style={{ height: 300 }}>
              <ScrollView>
                {(walletInfo?.token_list || []).map((item, index) => (
                  <TouchableOpacity
                    key={item.wallet_uuid}
                    onPress={() => {
                      props?.navigation.replace('asset', {
                        wallet_uuid: 'c11b420e-50e3-4723-8d0f-0cb3dca8849f',
                      });
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#F9F9F9',
                        paddingVertical: 10,
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
                      {index !== 0 && (
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            onPress={() => {
                              props?.navigation.navigate('startBackup');
                            }}
                            style={{ marginRight: 6 }}
                          >
                            <View style={styles.button}>
                              <Icon name="exclamationcircleo" size={12} style={{ marginRight: 3 }} color={'#3B2ACE'} />
                              <Text style={{ lineHeight: 18, color: '#3B2ACE' }}>未备份</Text>
                            </View>
                          </TouchableOpacity>
                          <Icon name="edit" size={16} />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        </Overlay>
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
