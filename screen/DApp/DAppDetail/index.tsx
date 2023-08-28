import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { makeStyles, useTheme } from '@rneui/themed';
import { View, ScrollView, Image, Text, SafeAreaView, Dimensions, TouchableOpacity, Linking } from 'react-native';
import IconFont from '@assets/iconfont';
import { getSymbolKline } from '@api/symbol';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';
import { getDAppDetail, getBanners,getNotices } from '@api/dApp';
import { getData } from '@common/utils/storage';
import { showToast } from '@common/utils/platform';
import { Carousel } from 'react-native-ui-lib';
import HTML from 'react-native-render-html';

const MockPrices = [
  [1657152000000, 0],
  [1657238400000, 0],
  [1657324800000, 242.55569956888655],
  [1657411200000, 243.05905629743194],
  [1657497600000, 234.78403672128502],
  [1657843200000, 238.36968523101555],
  [1657929600000, 238.4973062557798],
  [1658016000000, 249.39564994191502],
  [1658102400000, 248.19162914543435],
  [1658188800000, 264.1063233808582],
  [1658275200000, 268.38724240866617],
  [1658361600000, 258.9692212292539],
  [1658448000000, 265.2737508667017],
  [1658534400000, 262.63868687491663],
];

interface DAppDetailParam {
  navigation?: any;
}
const chartConfig = {
  backgroundColor: '#FFF',
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  decimalPlaces: 0,
  yAxisLabel: '$',
  yAxisSuffix: 'k',
  yLabelsOffset: 0,
  propsForDots: { opacity: 0 },
  color: (opacity = 1) => {
    return `rgba(173, 165, 232, ${opacity})`;
  },
  labelColor: (opacity = 1) => `#C8C8C8`,
};

export const DAppDetail = (props: DAppDetailParam) => {
  const { width } = Dimensions.get('window');
  const [banners, setBanners] = useState<Record<string, any>>({});
  const styles = useStyles();
  const [kLine, setKLine] = useState<{ labels: string[]; datasets: any[] }>({
    labels: (MockPrices as Array<any>).map((v, index) => (index % 2 != 0 ? moment(v[0] / 1000).format('hh-mm') : '')),
    datasets: [
      {
        data: (MockPrices as Array<any>).map((v) => 0),
        color: (opacity = 1) => `#5C43DC`,
        strokeWidth: 2,
      },
    ],
  });
  const [appDetail, setAppDetail] = useState({});
  const [notices, setNotices] = useState<Record<string, any>>({});
  const [dAppProps] = useState(props?.route?.params?.params);

  useEffect(() => {
    initKLine();
    rqDAppDetail();
    getBanners().then((banners) => {
      setBanners(banners.data);
    });
    getNotices({
      pageNum: 1,
      pageSize: 10,
      symbol: 'eth',
    }).then((noticesRes: any) => {
      setNotices(noticesRes.data)
    });
;
  }, []);

  const initKLine = useCallback(async () => {
    //TODO 接口不通
    const res = await getSymbolKline({
      symbol: 'ETH',
    });
    if (res.data) {
      const currentKLine = (res.data.kline || []).filter((item, index) => index < 10);
      setKLine({
        // labels: currentKLine.map((item) => moment(item.time).format('ss')) as string[],
        labels: (MockPrices as Array<any>).map((v, index) =>
          index % 2 != 0 ? moment(v[0] / 1000).format('hh-mm') : ''
        ),
        datasets: [
          {
            data: currentKLine.map((item) => Number(item.price)) as number[],
            // color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // 设置折线颜色
            color: (opacity = 1) => `#5C43DC`,
            strokeWidth: 2,
          },
        ],
      });
    }
  }, []);

  const rqDAppDetail = async () => {
    try {
      const dAppDetail = await getDAppDetail({
        id: dAppProps.contentPageId ?? 0,
      });
      setAppDetail(dAppDetail.data);
      console.log('dAppDetail trd:', dAppDetail);
      console.log('appDetail?.medium:',appDetail?.medium);
    } catch (e) {
      console.log('dAppDetail e:', e);
    }
  };

  const onPress = async () => {
    const wallet_uuid = await getData('wallet_uuid');
    if (!wallet_uuid || wallet_uuid === '{}') {
      showToast('No Wallet');
      return;
    }
    props?.navigation.navigate('DAppWebView', { params: { uri: dAppProps.url, title: appDetail.title } });
  };

  const onBuyPress = () => {
    props?.navigation.navigate('swap');
  }

  const onMedium = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        Linking.openURL(url);
      }else {
        showToast('can not open url:'+ url);
      }
    } catch (e: any) {
      showToast(e.message ?? e);
    }
  }

  const medium = useMemo(() => {
    console.log('appDetail medium:',appDetail.medium);
    if (!appDetail?.medium) {
      return []
    }
    return (JSON.parse(appDetail?.medium?? '[]') ?? []).filter((v:any) => v.url !== '');
  },[appDetail]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerBg}>
          <Image
            source={{ uri: appDetail.coverPicture ?? '' }}
            style={{ width: 85, height: 85, borderRadius: 15, overflow: 'hidden' }}
          />
          <View style={{ flex: 1, flexDirection: 'column', gap: 3, marginLeft: 15 }}>
            <Text style={{ color: '#252525', fontSize: 16, fontWeight: '500' }}>{appDetail.title}</Text>
            <Text style={{ color: '#AEAEAE', fontSize: 13 }} numberOfLines={1}>
              {appDetail.summary}
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
                <Text style={{ color: '#FFF' }}>了解</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <IconFont name="a-Group217" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{color: '#5D5D5D', fontSize: 10, marginHorizontal: 20, marginTop: 10 }}>
          {/* <Text style={{color: '#5D5D5D', fontSize: 12}}>{dAppProps.content}</Text> */}
          <HTML source={{ html: appDetail.content }} />
        </View>
              
        <View style={{ flexDirection: 'row', gap: 10, margin: 20 }}>
          {
            (medium || []).map((value: any, i: number) => (
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
              {/* <IconFont name="a-Group217" /> */}
              <Image source={{uri: value.logo ?? ''}} style={{width:12,height:12}}/>
            </TouchableOpacity>
            ))
          }
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginTop: 1, width: 3, height: 15, backgroundColor: '#25AC4E', borderRadius: 2 }} />
            <View style={{ flexDirection: 'column', gap: 3, marginLeft: 5 }}>
              <Text style={{ color: '#252525', fontSize: 15, fontWeight: '500' }}>$3,12.38</Text>
              <Text style={{ color: '#25AC4E', fontSize: 12 }}>+5.31%</Text>
            </View>
          </View>
          <Text style={{ color: '#8C8C8C', fontSize: 10 }}>ETH/USDT</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onBuyPress}>
            <Text style={{ color: '#3B28CC', fontWeight: '500' }} children="去兑换 >" />
          </TouchableOpacity>
        </View>
        <LineChart
          data={kLine}
          height={170}
          width={width}
          withOuterLines={false}
          chartConfig={chartConfig as any}
          yAxisInterval={3}
          bezier
          style={{
            marginLeft: -10,
            paddingTop: 16,
          }}
        />
        <Carousel
          key={0}
          style={styles.banner}
          autoplay={true}
          pageWidth={width - 30}
          itemSpacings={0}
          containerMarginHorizontal={0}
          initialPage={0}
          allowAccessibleLayout
        >
          {(banners.lists || []).map((v: any, i: number) => (
            <Image
              key={i}
              source={{ uri: v.img }}
              style={{
                height: 150,
                width: width - 30,
              }}
            />
          ))}
        </Carousel>
        {
          (appDetail.news ?? []).map((v: any, i: number) => {
            return (
              <View style={{ flexDirection: 'column', backgroundColor: '#F2F3F6', borderRadius: 10, margin: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Image
                  source={{ uri: v.coverPicture }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                  }}
                />
                <Text style={{ marginHorizontal: 5, fontSize: 12, color: '#252525',maxWidth:'70%'}}>{v.title}</Text>
                {/* <IconFont name="a-Group217" size={15} />
                <IconFont name="a-Group217" size={15} />
                <IconFont name="a-Group217" size={15} />
                <IconFont name="a-Group217" size={15} />
                <IconFont name="a-Group217" size={15} /> */}
                {/* <Text style={{ fontSize: 10, color: '#5D5D5D' }}>星期一</Text> */}
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  {/* <IconFont name="a-Group217" size={25} /> */}
                  <Text style={{ marginHorizontal: 5, fontSize: 10, color: '#5D5D5D' }}>{moment(v.ctime).format('yy/MM/DD')}</Text>
                </View>
              </View>
              <View style={{ padding: 10, margin: 5, marginTop: 0, backgroundColor: '#FFF', borderRadius: 10 }}>
                <View style={{ fontSize: 20, fontWeight: 'bold', color: '#252525' }}>
                  {/* {v.summary} */}
                  <HTML source={{ html: v.summary }} />
                </View>
                <View style={{ fontSize: 12, color: '#8C8C8C' }}>
                <HTML source={{ html: v.content }} />
                  {/* 2023年5月12日，全球最大加密货币交易所币安宣布将退出加拿大市场，并称这是由于“与稳定币相关的新指南和对加密货币交易所的投资者限制”不再适合币安。
                  [25] 2023年5月21日，币安公告称，将暂停波场币（TORN）存款，直至另行通知。 [26]
                  据《华尔街日报》和彭博2023年6月13日消息，被美国证监会（SEC）起诉的币安美国可能不会面临全面资产冻结，该公司曾表示全面资产冻结或致其业务严重受损。
                  [29] */}
                </View>
              </View>
            </View>
            )
          })
        }
        {/* <View style={{ color: '#5D5D5D', fontSize: 12, marginHorizontal: 20, marginTop: 30 }}>
          {
            (notices?.lists ?? []).map((v: any, i: number) => (
              <HTML source={{ html: v.content }} key={i}/>
            ))
            }
        </View> */}
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
