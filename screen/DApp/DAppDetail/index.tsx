import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@rneui/themed';
import { View, ScrollView, Image, Text, Dimensions, TouchableOpacity, Linking } from 'react-native';
// import IconFont from '@assets/iconfont';
import { getSymbolKline } from '@api/symbol';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import { getData } from '@common/utils/storage';
import { showToast } from '@common/utils/platform';
import HTML from 'react-native-render-html';
import ReportBottom from '@components/ReportBottom';
import IconFont from '@assets/iconfont';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useTranslation } from 'react-i18next';

interface DAppDetailParam {
  navigation?: any;
}
const chartConfig = {
  backgroundColor: '#FFF',
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  decimalPlaces: 0,
  yLabelsOffset: 0,
  propsForDots: {
    opacity: 0,
  },
  color: (opacity = 1) => {
    return `rgba(173, 165, 232, ${opacity})`;
  },
  labelColor: (opacity = 1) => `#C8C8C8`,
};

export const DAppDetail = (props: DAppDetailParam) => {
  const { t } = useTranslation();
  const { width } = Dimensions.get('window');
  const styles = useStyles();
  const [kLine, setKLine] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });
  const [showData, setShowData] = useState({
    price: 0,
    rose: 0,
  });
  // const [notices, setNotices] = useState<Record<string, any>>({});
  const [dAppProps] = useState(props?.route?.params?.params);
  console.log(11111, dAppProps);

  useEffect(() => {
    if (dAppProps?.symbol !== '') {
      initKLine();
    }
    // getNotices({
    //   pageNum: 1,
    //   pageSize: 10,
    //   symbol: 'eth',
    // }).then((noticesRes: any) => {
    //   setNotices(noticesRes.data);
    // });
  }, []);
  console.log(111111, dAppProps?.banners);

  const initKLine = useCallback(async () => {
    const res = await getSymbolKline({
      symbol: dAppProps?.symbol,
    });
    if (res.data) {
      setShowData({
        rose: res.data?.rose,
        price: res.data?.kline?.[res.data?.kline.length - 1]?.price,
      });
      const currentKLine = (res.data.kline || []).filter((item, index) => index < 10);
      setKLine({
        labels: currentKLine.map((item) => moment(item.time).format('ss')) as string[],
        datasets: [
          {
            data: currentKLine.map((item) => Number(item.price)) as number[],
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // 设置折线颜色
            // strokeWidth: 100,
          },
        ],
      });
    }
  }, []);

  const onPress = async () => {
    const wallet_uuid = await getData('wallet_uuid');
    if (!wallet_uuid || wallet_uuid === '{}') {
      showToast('No Wallet');
      return;
    }
    props?.navigation.navigate('DAppWebView', { params: { uri: dAppProps.url, title: dAppProps?.title } });
  };

  const onBuyPress = () => {
    props?.navigation.navigate('swap');
  };

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

  const medium = useMemo(() => {
    console.log('appDetail medium:', dAppProps?.medium);
    if (!dAppProps?.medium) {
      return [];
    }
    return (JSON.parse(dAppProps?.medium ?? '[]') ?? []).filter((v: any) => v.url !== '');
  }, [dAppProps]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBg}>
          <Image
            source={{ uri: dAppProps?.coverPicture ?? '' }}
            style={{ width: 100, height: 100, borderRadius: 15, overflow: 'hidden' }}
          />
          <View style={{ flex: 1, flexDirection: 'column', gap: 3, marginLeft: 15 }}>
            <Text style={{ color: '#252525', fontSize: 16, fontWeight: '500' }}>{dAppProps?.title}</Text>
            <Text style={{ color: '#AEAEAE', fontSize: 13 }} numberOfLines={1}>
              {dAppProps?.summary}
            </Text>
            <View
              style={{
                flex: 1,
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={onPress}
                style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#5C43DC', borderRadius: 20 }}
              >
                <Text style={{ color: '#FFF' }}></Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <IconFont name="a-112" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ color: '#5D5D5D', fontSize: 10, marginHorizontal: 20, marginTop: 10 }}>
          <HTML source={{ html: dAppProps?.content }} />
        </View>
        <View
          style={{
            height: 140,
            width: width - 40,
            marginHorizontal: 20,
          }}
        >
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            data={dAppProps?.banners}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ height: 140, width: width, borderRadius: 12 }}
                onPress={() => {
                  props?.navigation.navigate('DAppWebView', { params: { uri: item.url, title: item?.title } });
                }}
              >
                <Image
                  source={{ uri: item?.img }}
                  style={{ width: width - 40, height: '100%', resizeMode: 'contain', borderRadius: 12 }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ gap: 5, paddingHorizontal: 20, flexDirection: 'row' }}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal={true}
          style={{ flexDirection: 'row', gap: 10, marginVertical: 20 }}
        >
          {(medium || []).map((value: any, i: number) => (
            <TouchableOpacity
              key={i}
              style={{
                width: 70,
                height: 26,
                backgroundColor: '#F2F3F6',
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onMedium(value.url)}
            >
              <Image source={{ uri: value.logo ?? '' }} style={{ width: 12, height: 12 }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {dAppProps?.symbol !== '' && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 1, width: 3, height: 15, backgroundColor: '#25AC4E', borderRadius: 2 }} />
                <View style={{ flexDirection: 'column', gap: 3, marginLeft: 5 }}>
                  <Text style={{ color: '#252525', fontSize: 15, fontWeight: '500' }}>${showData.price}</Text>
                  <Text style={{ color: showData.rose >= 0 ? '#25AC4E' : 'red', fontSize: 12 }}>{showData.rose}%</Text>
                </View>
              </View>
              <Text style={{ color: '#8C8C8C', fontSize: 10 }}>{dAppProps?.symbol}/USDT</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onBuyPress}>
                <Text style={{ color: '#3B28CC', fontWeight: '500' }} children={`${t('dAppDetail.goToExchange')
                  } >`} />
              </TouchableOpacity>
            </View>
            {kLine.datasets.length > 0 && (
              <LineChart
                data={kLine}
                height={170}
                width={width + 60}
                withOuterLines={false}
                chartConfig={chartConfig as any}
                withHorizontalLines={false}
                withVerticalLines={false}
                yAxisInterval={3}
                bezier
                withHorizontalLabels={false}
                style={{
                  marginLeft: -40,
                  paddingTop: 16,
                }}
              />
            )}
          </>
        )}

        {(dAppProps?.news ?? []).map((v: any, i: number) => {
          return (
            <View style={{ flexDirection: 'column', backgroundColor: '#F2F3F6', borderRadius: 10, margin: 20 }} key={i}>
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Image
                  source={{ uri: v.coverPicture }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                  }}
                />
                <Text style={{ marginHorizontal: 5, fontSize: 12, color: '#252525', maxWidth: '70%' }}>{v.title}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={{ marginHorizontal: 5, fontSize: 10, color: '#5D5D5D' }}>
                    {moment(v.ctime).format('yy/MM/DD')}
                  </Text>
                </View>
              </View>
              <View style={{ padding: 10, margin: 5, marginTop: 0, backgroundColor: '#FFF', borderRadius: 10 }}>
                <View style={{ fontSize: 20, fontWeight: 'bold', color: '#252525' }}>
                  <HTML source={{ html: v.summary }} />
                </View>
                <View style={{ fontSize: 12, color: '#8C8C8C' }}>
                  <HTML source={{ html: v.content }} />
                </View>
              </View>
            </View>
          );
        })}
        <ReportBottom navigation={props?.navigation} style={{ marginVertical: 20 }} />
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => {
  return {
    container: {
      backgroundColor: theme.colors.white,
      flex: 1,
    },
    headerBg: {
      flexDirection: 'row',
      paddingHorizontal: 20,
    },
    banner: {
      marginTop: 20,
      backgroundColor: theme.colors.grey5,
      height: 150,
      marginHorizontal: 20,
      borderRadius: 10,
      overflow: 'hidden',
    },
    scrollView: {
      flexDirection: 'row',
    },
    scrollViewContentView: {
      gap: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
  };
});
