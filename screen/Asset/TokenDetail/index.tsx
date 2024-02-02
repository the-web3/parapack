import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { Button, Image, Tab, TabView, Text, makeStyles } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Layout from '@components/LayoutNormal';
import { AddressBalanceParams, TransferRecordParams, getAddressBalance, transferRecord } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { getSymbolKline } from '@api/symbol';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';
import { getActivity } from '@api/home';
import { getData } from '@common/utils/storage';
import { useTranslation } from 'react-i18next';
import Empty from '@components/Empty';
type Props = {
  fullWidth?: boolean;
  navigation: any;
  route: any;
};

const chartConfig = {
  backgroundColor: '#F5F5FF',
  backgroundGradientFrom: '#F5F5FF',
  backgroundGradientTo: '#F5F5FF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(171, 159, 241, ${opacity})`,
  style: {},
  yLabelsOffset: 0,
  // propsForDots: { opacity: 0 },
  labelColor: (opacity = 1) => `#C8C8C8`,
};
const TokenDetail = (props: Props) => {
  const { t } = useTranslation();
  const [activity, setActivity] = useState<Record<string, any>>({});
  const [index, setIndex] = useState(0);
  const [kLine, setKLine] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [symbolPrice, setSymbolPrice] = useState('0');
  const [addressBalance, setAddressBalance] = useState<any>();
  const [tokenInfo, setTokenInfo] = useState<Record<string, any>>({});
  const [record, setRecord] = useState<any>({
    [-1]: {
      loading: false,
      data: {},
    },
    0: {
      loading: false,
      data: {},
    },
    1: {
      loading: false,
      data: {},
    },
  });
  const styles = useStyles(props);
  const { width } = Dimensions.get('window');

  const initData = useCallback(async () => {
    const { contract_addr: contract_address, ...rest } = tokenInfo?.tokenDetail || {};
    const res = await getAddressBalance({
      wallet_uuid: tokenInfo?.wallet_uuid,
      device_id: tokenInfo?.device_id,
      ...rest,
      contract_address,
    } as AddressBalanceParams);
    if (res.data) {
      setAddressBalance(res.data || {});
    }
  }, [tokenInfo]);

  const initKLine = useCallback(async () => {
    const res = await getSymbolKline({
      symbol: tokenInfo?.tokenDetail?.symbol as string,
    });

    if (res.data) {
      const currentKLine = (res.data.kline || []).filter((item, index) => index < 10);
      const priceList = currentKLine.map((item) => Number(item.price));
      setKLine({
        labels: currentKLine.map((item) => moment(item.time).format('ss')) as string[],
        datasets: [
          {
            data: priceList as number[],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // 设置折线颜色
          },
        ],
      });
      setSymbolPrice(priceList[priceList?.length - 1]);
    }
  }, [tokenInfo]);

  const getTransferRecord = useCallback(
    async (type: number) => {
      setRecord((prev: any) => {
        return {
          ...prev,
          [type]: {
            ...prev[type],
            loading: true,
          },
        };
      });
      const { chain, contract_addr: contractAddr, symbol, address } = tokenInfo?.tokenDetail || {};
      const params: TransferRecordParams = {
        chain,
        contractAddr,
        symbol,
        ownerAddr: address,
        pageNum: 1,
        pageSize: 100,
      };
      if (type !== -1) {
        params.type = type;
      }
      const res = await transferRecord(params);
      if (res.data) {
        setRecord((prev: any) => {
          return {
            ...prev,
            [type]: {
              ...prev[type],
              loading: false,
              ...res.data,
            },
          };
        });
      } else {
        setRecord((prev: any) => {
          return {
            ...prev,
            [type]: {
              ...prev[type],
              loading: false,
            },
          };
        });
      }
    },
    [tokenInfo]
  );

  const initActivity = useCallback(async () => {
    const { symbol } = tokenInfo?.tokenDetail || {};
    const res = await getActivity({
      pageNum: '1',
      pageSize: '1',
      status: 1,
      symbol,
    });
  }, [tokenInfo]);

  const initInfo = async () => {
    const [device_id, wallet_uuid, current_token_detail] = await Promise.all([
      getUniqueId(),
      getData('wallet_uuid'),
      getData('current_token_detail'),
    ]);
    const current_token_detail_obj = JSON.parse(current_token_detail);
    props.navigation?.setOptions({
      title: `${current_token_detail_obj?.symbol} ${t(`asset.details`)}`,
    });
    setTokenInfo({
      device_id,
      wallet_uuid,
      tokenDetail: current_token_detail_obj,
    });
  };

  useEffect(() => {
    if (JSON.stringify(tokenInfo) !== '{}') {
      initData();
      initKLine();
      getTransferRecord(-1);
      initActivity();
    }
  }, [getTransferRecord, initActivity, initData, initKLine, tokenInfo]);

  useEffect(() => {
    initInfo();
  }, [props.navigation]);

  const handleChange = (e: number) => {
    setIndex(e);
    getTransferRecord(e - 1);
  };

  const rqDatas = React.useCallback(async () => {
    try {
      if (tokenInfo?.tokenDetail?.symbol) {
        const activityRes = await getActivity({
          pageNum: '1',
          pageSize: '10',
          status: 1,
          symbol: tokenInfo?.tokenDetail?.symbol,
        });
        setActivity(activityRes.data);
      }
    } catch (e) { }
  }, [tokenInfo?.tokenDetail?.symbol]);

  useEffect(() => {
    // 在组件挂载或标题更新时执行
    rqDatas();
  }, [rqDatas]);

  return (
    <Layout
      containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
      fixedChildren={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            paddingHorizontal: 21,
            paddingVertical: 13,
          }}
        >
          <Button
            onPress={() => {
              props?.navigation.navigate('transferPayment');
            }}
            buttonStyle={{
              // backgroundColor: '#8B7FEA',
              alignItems: 'baseline',
              display: 'flex',
              paddingHorizontal: 21,
            }}
          >
            <Icon name={'creditcard'} color={'#fff'} /> {t(`asset.send`)}
          </Button>
          <Button
            onPress={() => {
              props?.navigation.navigate('collection');
            }}
            buttonStyle={{
              backgroundColor: '#2667FF',
              alignItems: 'baseline',
              display: 'flex',
              paddingHorizontal: 21,
            }}
          >
            <Icon name={'qrcode'} color={'#fff'} /> {t(`asset.receive`)}
          </Button>
          <Button
            onPress={() => {
              props?.navigation.navigate('searchToken', {
                go: 'swap',
              });
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#252525',
              overflow: 'hidden',
              alignItems: 'baseline',
              display: 'flex',
              paddingHorizontal: 23,
            }}
          >
            <Icon name="swap" color="#252525" />
            <Text style={{ color: '#252525' }}>{t(`asset.swap`)}</Text>
          </Button>
        </View>
      }
    >
      <StatusBar backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={[styles.container, { height: Dimensions.get('window').height }]}>
        <ScrollView bounces={false}>
          <LinearGradient
            colors={['#3251EA', '#3251EA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradient}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 32,
                paddingBottom: 22,
              }}
            >
              <View>
                <Text style={{ fontSize: 52, color: '#ECECEC' }}>
                  {addressBalance?.balance}
                  <Text style={{ fontSize: 12, color: '#ECECEC' }}>{addressBalance?.tokenName}</Text>
                </Text>
                <Text style={{ fontSize: 14, color: '#ECECEC' }}>≈${addressBalance?.asset_usd}</Text>
              </View>
            </View>
            <View style={styles.scrollContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 26,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={{ fontSize: 18 }}>{addressBalance?.tokenName} = </Text>
                  <Text style={{ fontSize: 14 }}>${symbolPrice}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    props?.navigation.navigate('searchToken', {
                      go: 'swap',
                    });
                  }}
                >
                  <Text style={{ color: '#3B28CC', fontSize: 12 }}>
                    {t(`asset.swap`)} <Icon name="right" />
                  </Text>
                </TouchableOpacity>
              </View>
              {kLine.labels.length > 0 && kLine.datasets[0].data.length > 0 && (
                <LineChart
                  data={kLine}
                  height={170}
                  width={width + 50}
                  withOuterLines={false}
                  chartConfig={chartConfig as any}
                  yAxisInterval={3}
                  withHorizontalLines={false}
                  withVerticalLines={false}
                  bezier
                  withHorizontalLabels={false}
                  style={{
                    marginLeft: -40,
                    paddingTop: 16,
                  }}
                />
              )}
            </View>
          </LinearGradient>
          {activity?.lists?.length > 0 && (
            <View style={{ paddingHorizontal: 16, marginVertical: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  props?.navigation.navigate('coinDetail');
                }}
                style={styles.bannerContainer}
              >
                <Image
                  source={{ uri: activity?.lists[0]?.coverPicture }}
                  style={styles.banner}
                // PlaceholderContent={<ActivityIndicator />}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={[styles.scrollContainer1, { height: Dimensions.get('window').height }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32 }}>
              <View style={{ width: 210 }}>
                <Tab
                  value={index}
                  onChange={handleChange}
                  dense
                  indicatorStyle={{
                    backgroundColor: '#3B28CC',
                    height: 4,
                    borderRadius: 2,
                    width: 70,
                  }}
                  titleStyle={(active: boolean) => {
                    return { fontSize: 12, marginVertical: 8, color: active ? '#3B28CC' : '#AEAEAE' };
                  }}
                >
                  <Tab.Item>{t(`asset.all`)}</Tab.Item>
                  <Tab.Item>{t(`asset.received`)}</Tab.Item>
                  <Tab.Item>{t(`asset.sent`)}</Tab.Item>
                </Tab>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => {
                    props?.navigation.navigate('searchHistory');
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: '#F3F3F3',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 6,
                      marginRight: 6,
                    }}
                  >
                    <Icon name="search1" color={'#5A5A5A'} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <TabView value={index} onChange={handleChange} animationType="spring">
                {[-1, 0, 1].map((item) => {
                  return (
                    <TabView.Item style={{ flex: 1 }} key={item}>
                      <ScrollView style={{ paddingHorizontal: 25 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        {record[item]?.lists?.length > 0 ? (
                          record[item]?.lists?.map((item, index) => (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                props?.navigation.navigate('transferDetails', {
                                  ...item,
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
                                <View
                                  style={{
                                    backgroundColor: 'rgba(240, 240, 255, 1)',
                                    height: 21,
                                    width: 21,
                                    borderRadius: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Icon
                                    name="pay-circle-o1"
                                    color={'rgba(59, 40, 204, 1)'}
                                    style={{ backgroundColor: 'rgba(240, 240, 255, 1)', borderRadius: 100 }}
                                  />
                                </View>

                                <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <Text>
                                      {item.type === 0 ? t('searchHistory.transferOut') : t('searchHistory.transferIn')}
                                    </Text>
                                    <Text>{item.amount}</Text>
                                  </View>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                      <Text style={styles.listPrice}>¥ {item.amount}</Text>
                                    </View>
                                    <View>
                                      <Text style={{ color: '#999999' }}>{moment(item.ctime).format('DD.MM.YY')}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <Empty />
                        )}
                        <View style={{ height: 200 }}></View>
                      </ScrollView>
                    </TabView.Item>
                  );
                })}
              </TabView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    gradient: {
      // height: '100%',
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
    scrollContainer: {
      paddingVertical: 16,
      // paddingHorizontal: 26,
      borderTopLeftRadius: 20, // 左上角边框半径
      borderTopRightRadius: 20, // 右上角边框半径
      borderBottomRightRadius: 0, // 右下角边框半径
      borderBottomLeftRadius: 0, // 左下角边框半径
      backgroundColor: '#F5F5FF',
      // shadowColor: '#CED8F7',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.6,
      // shadowRadius: 4,
      // elevation: 4,
      // height: '100%',
    },
    listPrice: {
      color: '#999999',
      fontSize: 12,
    },
    green: {
      color: '#5BCC47',
      fontSize: 12,
    },
    scrollContainer1: {
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
    },
    img: {
      width: 156,
      height: 102,
      aspectRatio: 1,
      marginTop: 16,
      // marginBottom: 112,
    },
    container: {
      backgroundColor: theme.colors.white,
    },
    bannerContainer: {
      height: 99,
    },
    banner: {
      width: '100%',
      height: '100%',
      aspectRatio: 1,
      borderRadius: 4,
    },
  };
});

export default TokenDetail;
