import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { Tab, TabView, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getActivity } from '@api/home';
import { getData } from '@common/utils/storage';
import { ActivityItems } from '@screen/Activity/Components/ActivityItems';
import { getSymbolInfo } from '@api/symbol';
import { showToast } from '@common/utils/platform';
import { useTranslation } from 'react-i18next';

type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const CoinDetail = (props: Props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const styles = useStyles(props);
  const [index, setIndex] = React.useState(0);
  const [activity, setActivity] = useState<Record<string, any>>({});
  const [currentTokenDetail, setCurrentTokenDetail] = useState<Record<string, any>>({});
  const [symbolDetail, setSymbolDetail] = useState<Record<string, any>>({});

  const initData = React.useCallback(async () => {
    const [current_token_detail] = await Promise.all([getData('current_token_detail')]);
    try {
      const current_token_detail_obj = JSON.parse(current_token_detail);
      navigation.setOptions({
        title: current_token_detail_obj?.symbol,
        // subTitle: '99999',
      });
      setCurrentTokenDetail(current_token_detail_obj);
    } catch (e) { }
  }, [navigation]);

  const rqDatas = React.useCallback(async () => {
    try {
      if (currentTokenDetail?.symbol) {
        const activityRes = await getActivity({
          pageNum: '1',
          pageSize: '10',
          status: 1,
          symbol: currentTokenDetail?.symbol,
        });
        setActivity(activityRes.data);
      }
    } catch (e) { }
  }, [currentTokenDetail?.symbol]);

  const symbolInfo = React.useCallback(async () => {
    if (currentTokenDetail?.symbol) {
      try {
        const detailRes = await getSymbolInfo({
          chain: currentTokenDetail?.chain,
          symbol: currentTokenDetail?.symbol,
          contract_addr: currentTokenDetail?.contract_addr,
        });
        setSymbolDetail(detailRes.data);
      } catch (e) {
        showToast(e.message ?? e);
      }
    }
  }, [currentTokenDetail?.chain, currentTokenDetail?.contract_addr, currentTokenDetail?.symbol]);
  console.log(8888, symbolDetail?.medium);
  const onMedium = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      } else {
        showToast('can not open url:' + url);
      }
    } catch (e: any) {
      showToast(e.message ?? e);
    }
  };

  useEffect(() => {
    initData();
  }, [initData]);

  useEffect(() => {
    if (index === 0) {
      rqDatas();
    } else if (index === 1) {
      symbolInfo();
    }
  }, [index, rqDatas, symbolInfo]);

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <View style={{ marginHorizontal: 52, position: 'relative' }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomWidth: 4,
            borderColor: '#D8D8D8',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        />
        <Tab
          value={index}
          onChange={setIndex}
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
          <Tab.Item>{t('coinDetail.activity')}</Tab.Item>
          <Tab.Item>{t('coinDetail.overview')}</Tab.Item>
          <Tab.Item>{t('coinDetail.tool')}</Tab.Item>
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.viewItem}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {activity?.lists?.length > 0 ? (
              activity?.lists?.map((item, index) => (
                <ActivityItems item={item} key={index} navigation={props?.navigation} />
              ))
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.item}>
                  <Image
                    // source={BASE_URI}
                    source={require('@assets/images/emptyRecord.png')}
                    style={styles.img}
                    // containerStyle={styles.item}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <Text style={{ fontSize: 10, marginTop: 18, marginBottom: 28, color: '#AEAEAE' }}>{t('coinDetail.noTransactionRecord')}</Text>
                <View
                  style={{ backgroundColor: '#F1F1F1', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4 }}
                >
                  <Text style={{ fontSize: 10, color: '#5D5D5D' }}>
                    {t('coinDetail.viewInBrowser')} <Icon name="link" size={10} color={'#5D5D5D'} />
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={styles.viewItem}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>{t('coinDetail.coinInformation')}</Text>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>{t('coinDetail.tokenName')}</Text>
              <Text style={styles.subDesc}>{symbolDetail?.tokenName}</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>{t('coinDetail.projectName')}</Text>
              <Text style={styles.subDesc}>{symbolDetail?.projectName}</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>{t('coinDetail.totalEmission')}</Text>
              <Text style={styles.subDesc}>{symbolDetail?.circulation}</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>{t('coinDetail.contractAddress')}</Text>
              <Text style={styles.subDesc}>{symbolDetail?.contractAddr}</Text>
            </View>
            <Text style={styles.title}>{t('coinDetail.coinInformation')}</Text>
            <View>
              <Text style={styles.desc}>{symbolDetail?.introduction}</Text>
            </View>
            <Text style={styles.title}>{t('coinDetail.resources')}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {symbolDetail?.medium &&
                (JSON.parse(symbolDetail?.medium) || []).map((value: any, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      onMedium(value.url);
                    }}
                  >
                    <Image source={{ uri: value.logo ?? '' }} style={{ width: 11, height: 9 }} />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.viewItem}>
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
              <View style={styles.toolItem}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>{t('coinDetail.blockExplorer')}</Text>
              </View>
              <View style={styles.toolItemRigth}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>{t('coinDetail.blockExplorer')}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={styles.toolItem}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>{t('coinDetail.blockExplorer')}</Text>
              </View>
              <View style={styles.toolItemRigth}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>{t('coinDetail.blockExplorer')}</Text>
              </View>
            </View>
          </>
        </TabView.Item>
      </TabView>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  // console.log(11111, theme.colors, props);
  return {
    title: {
      color: '#252525',
      fontWeight: 'bold',
      marginBottom: 14,
    },
    subRow: { marginBottom: 14, flexDirection: 'row' },
    subTitle: {
      color: '#8C8C8C',
      fontSize: 12,
      marginRight: 38,
    },
    subDesc: {
      flex: 1,
      color: '#5D5D5D',
      fontSize: 12,
      flexWrap: 'wrap',
      // wordWrap: 'break-word',
    },
    desc: {
      color: '#8C8C8C',
      fontSize: 12,
      marginBottom: 14,
    },
    viewItem: {
      paddingHorizontal: 22,
      width: '100%',
      overflow: 'hidden',
    },
    toolItem: {
      flex: 1,
      marginRight: 12,
      height: 89,
      backgroundColor: '#F8F8F8',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toolItemRigth: {
      flex: 1,
      height: 89,
      backgroundColor: '#F8F8F8',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: 156,
      height: 102,
      aspectRatio: 1,
      marginTop: 123,
      // marginBottom: 112,
    },
  };
});
export default CoinDetail;
