import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@rneui/themed';
import { View, ScrollView, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import IconFont from '@assets/iconfont';
import { getSymbolKline } from '@api/symbol';
import { getBanners, getDAppGroup } from '@api/dApp';
import { getData } from '@common/utils/storage';
import { showToast } from '@common/utils/platform';
import { Carousel } from 'react-native-ui-lib';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DAppItem } from '../Components/DAppItem';
import { t } from 'i18next';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

interface ContentHeaderProps {
  leftTitle?: string | null | undefined;
  rightTitle?: string | null | undefined;
  onRightClick?: () => void;
}

const ContentHeader = (props: ContentHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
        justifyContent: 'space-between',
      }}
    >
      {props.leftTitle && (
        <Text
          children={props?.leftTitle}
          style={{
            fontSize: 16,
          }}
        />
      )}

      {props.rightTitle && (
        <Text
          children={props?.rightTitle}
          style={{
            fontSize: 15,
            color: '#3B28CC',
          }}
          onPress={props?.onRightClick}
        />
      )}
    </View>
  );
};

export const DAppDetails = (props: DAppProps) => {
  useEffect(() => {
    rqDatas();
  }, []);
  const rqDatas = async () => {
    try {
      const dAppGroupHotRes = await getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        tag: 'hot',
      });
      setDAppGroupHot(dAppGroupHotRes.data);
    } catch (e) {}
  };

  const [dAppGroupHot, setDAppGroupHot] = useState<Record<string, any>>({});

  const { width, height } = Dimensions.get('window');
  const buttonWidth = width * 0.8;
  const buttonHeight = height * 0.07;
  const borderRadius = width * 0.02;
  const fontTextSize = width * 0.05;

  const [dAppGroupNew, setDAppGroupNew] = useState<Record<string, any>>({});
  const [banners, setBanners] = useState<Record<string, any>>({});
  const styles = useStyles();
  // const [notices, setNotices] = useState<Record<string, any>>({});
  const [dAppProps] = useState(props?.route?.params?.params);

  useEffect(() => {
    initKLine();
    getBanners().then((banners) => {
      setBanners(banners.data);
    });
  }, []);

  const initKLine = useCallback(async () => {
    //TODO 接口不通
    const res = await getSymbolKline({
      symbol: 'ETH',
    });
  }, []);

  const onHotPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', { params });
  };

  const onPress = async () => {
    const wallet_uuid = await getData('wallet_uuid');
    if (!wallet_uuid || wallet_uuid === '{}') {
      showToast('No Wallet');
      return;
    }
    props?.navigation.navigate('DAppWebView', { params: { uri: dAppProps.url, title: dAppProps?.title } });
  };
  const onShowAll = (type: string) => {
    props?.navigation.navigate('DAppList', { params: { type } });
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
      <ScrollView>
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
                borderRadius: 10,
              }}
            />
          ))}
        </Carousel>
        <View style={[styles.headerBg, { marginBottom: 24 }]}>
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
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={onPress}
                  style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#5C43DC', borderRadius: 20 }}
                >
                  <FontAwesome name="twitter" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPress}
                  style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#5C43DC', borderRadius: 20 }}
                >
                  <FontAwesome name="telegram" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <IconFont name="a-Group217" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.headerBg, { marginLeft: 20, marginBottom: 20 }]}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>一键完成任务</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: '#3b28cc',
              width: buttonWidth,
              marginLeft: 37,
              marginRight: 18,
              height: buttonHeight,
              borderRadius,
              marginBottom: 20,
            },
          ]}
          onPress={onPress}
        >
          <Text style={[styles.buttonText, { fontSize: fontTextSize, fontWeight: 'bold', color: '#fff' }]}>
            取消申请
          </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black', marginLeft: 30, marginBottom: 16 }}>
          一项一项完成任务
        </Text>
        {/* forward */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, marginLeft: 40 }}>
          <FontAwesome name="twitter" size={20} color="blue" />
          <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>转发@4metas帖子</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 100 }}>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <FontAwesome name="share" size={20} color="#00ba7c" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, color: '#03bb7e' }}>转发</Text>
          </View>
        </View>
        {/* like */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, marginLeft: 40 }}>
          <FontAwesome name="apple" size={20} color="blue" />
          <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>转发@4metas帖子</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 100 }}>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <FontAwesome name="heart" size={20} color="#f9187f" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, color: '#f9187f' }}>喜欢</Text>
          </View>
        </View>
        {/* follow */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, marginLeft: 40 }}>
          <FontAwesome name="telegram" size={20} color="blue" />
          <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>转发@4metas帖子</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 100 }}>
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <FontAwesome name="twitter" size={20} color="#2a9ff0" />
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, color: '#2a9ff0' }}>跟随</Text>
          </View>
        </View>
        {/* join */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18, marginLeft: 40 }}>
          <FontAwesome name="link" size={20} color="blue" />
          <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>转发@4metas帖子</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 130 }}>
            <Text style={{ marginLeft: 5, color: '#2a9ff0' }}>加入</Text>
          </View>
        </View>
        {/* go */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 35.5, marginLeft: 40 }}>
          <FontAwesome name="twitter" size={20} color="blue" />
          <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>转发@4metas帖子</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 140 }}>
            <Text style={{ marginLeft: 5, color: '#2a9ff0' }}>去</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3.5, marginLeft: 40 }}>
          <FontAwesome name="group" size={20} color="blue" />
          <Text style={{ fontSize: 12, color: 'black', marginLeft: 10 }}>747人已加入</Text>
        </View>
        {/* last */}
        <View style={{ marginTop: 19.5 }}>
          {dAppGroupHot?.lists?.slice(1).map((v, i) => (
            <View style={{ width: '100%', marginBottom: 10 }}>
              <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
            </View>
          ))}
          {dAppGroupHot?.lists?.slice(1).map((v, i) => (
            <View style={{ width: '100%', marginBottom: 10 }}>
              <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
            </View>
          ))}
          {dAppGroupHot?.lists?.slice(1).map((v, i) => (
            <View style={{ width: '100%', marginBottom: 10 }}>
              <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
            </View>
          ))}
        </View>
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
    button: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
    },
    scrollViewContentView: {
      gap: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    containers: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff', // Use the appropriate background color
    },
    leftContainers: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icons: {
      width: 24,
      height: 24,
    },
    usernames: {
      marginLeft: 10,
      color: '#000', // Adjust the color to match your design
    },
    rightContainers: {
      alignItems: 'flex-end',
    },
    rewards: {
      fontWeight: 'bold',
      color: '#FFA500', // or any color you want for the text
    },
    trophyIcons: {
      width: 20,
      height: 20,
      marginHorizontal: 5,
    },
    ranks: {
      fontSize: 12,
      color: 'gray',
    },
  };
});
