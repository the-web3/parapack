import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, Image, SafeAreaView, useWindowDimensions } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { DAppItem } from '@screen/DApp/Components/DAppItem';
import { getBanners, getDAppGroup, getNotices, getTags } from '@api/dApp';
import { Button, Input, Text } from '@rneui/themed';
import { getActivity } from '@api/home';
import { Carousel } from 'react-native-ui-lib';
import IconFont from '@assets/iconfont';
interface DAppProps {
  navigation?: any;
  mode?: string;
}

const classifyButtons = [
  {
    id: 0,
    icon: 'barchart',
    name: '排行榜',
  },
  {
    id: 1,
    icon: 'clockcircleo',
    name: '最新上线',
  },
  {
    id: 2,
    icon: 'pay-circle-o1',
    name: '理财',
  },
  {
    id: 3,
    icon: 'bulb1',
    name: 'Defi',
  },
];

export const DAppScreen = (props: DAppProps) => {
  const { width } = useWindowDimensions();
  const style = useStyles(props);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [banners, setBanners] = useState<Record<string, any>>({});
  const [notices, setNotices] = useState<Record<string, any>>({});
  const [dAppGroup, setDAppGroup] = useState<Record<string, any>>({});
  const [activity, setActivity] = useState<Record<string, any>>({});
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    rqDatas();
  }, []);

  const rqDatas = async () => {
    try {
      const banners = await getBanners();
      setBanners(banners.data);
      console.log('banners:', banners);
      const activityRes = await getActivity({
        pageNum: '1',
        pageSize: '10',
        status: 1,
        // symbol,
      });
      setActivity(activityRes.data);

      const dAppGroupRes = await getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
      });
      // console.log('dAppGroupRes', JSON.stringify(dAppGroupRes));
      // console.log('banners', JSON.stringify(banners));
      // console.log('activityRes', JSON.stringify(activityRes));
      setDAppGroup(dAppGroupRes.data);
      // console.log('dAppGroupRes:', JSON.stringify(dAppGroupRes.data));

      const noticesRes = await getNotices({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
      });
      // console.log('noticesRes', JSON.stringify(noticesRes));
      setNotices(noticesRes.data);

      const tagsRes = await getTags();
      // console.log('tagRes:', JSON.stringify(tags));
      setTags(tagsRes.data);
    } catch (e) {}
  };

  const onTagPress = (tag?: string) => {
    props?.navigation.navigate('DAppList', { params: { type: 'group', tag } });
  };
  const onShowAll = (type: string) => {
    props?.navigation.navigate('DAppList', { params: { type } });
  };

  const onHotPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', { params });
  };
  const onRecommendPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', { params });
  };
  console.log('banners.lists:', banners.lists);

  return (
    <SafeAreaView style={[style.container, { height: Dimensions.get('window').height - 100 }]}>
      <View style={style.searchBar}>
        <Input
          containerStyle={{ marginLeft: -25 }}
          inputContainerStyle={style.inputContainer}
          errorProps={{ display: 'none' }}
          inputStyle={{
            fontSize: 12,
          }}
          leftIcon={<Icon name="search1" />}
          placeholder="输入Dapp网站"
        />
        <Icon name="scan1" style={{ marginLeft: 5 }} size={24} color={theme.colors.black} />
      </View>
      <Carousel
        key={0}
        style={style.banner}
        autoplay={true}
        pageWidth={width - 40}
        itemSpacings={0}
        containerMarginHorizontal={0}
        initialPage={0}
        containerStyle={{ height: 140 }}
        allowAccessibleLayout
      >
        {(banners.lists || []).map((v: any, i: number) => (
          <Image
            source={{ uri: v.img }}
            key={i}
            style={{
              height: 140,
              width: '100%',
              borderRadius: 12,
            }}
          />
        ))}
      </Carousel>
      <View style={style.notice}>
        <Button icon={<Icon name={'sound'} size={17} color={theme.colors.grey4} />} size={'sm'} color={'transparent'} />
        <Text style={style.noticeText} numberOfLines={1}>
          {notices?.lists?.length ? notices.lists[0].summary : ''}
        </Text>
        <Button
          icon={<FontAwesomeIcon name={'navicon'} size={18} color={theme.colors.grey4} />}
          size={'sm'}
          color={'transparent'}
        />
      </View>
      <View>
        <ScrollView
          style={style.scrollView}
          contentContainerStyle={style.scrollViewContentView}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          {(classifyButtons || []).map((v, index) => {
            return (
              <Button
                icon={<IconFont name={v.icon} size={19} color={'#3B28CC'} />}
                title={v.tagDesc ?? v.name}
                key={index}
                onPress={() => onTagPress()}
                titleStyle={style.scrBtnTitle}
                buttonStyle={style.scrBtnContainer}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={{ marginTop: 20 }}>
        <ContentHeader
          leftTitle={t('dApp.recommendList')}
          rightTitle={t('dApp.seeAll')}
          onRightClick={() => onShowAll('group')}
        />
        <ScrollView
          style={style.scrollView}
          contentContainerStyle={[style.scrollViewContentView]}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal={true}
        >
          {dAppGroup?.lists?.map((v, index) => (
            <Button buttonStyle={style.recommendItem} onPress={() => onRecommendPress(v)} key={index}>
              <Image source={{ uri: v.coverPicture }} style={{ height: 90, width: 90, borderRadius: 5 }} />
              <Text numberOfLines={1} ellipsizeMode="tail" children={v.title} style={style.scrBtnTitle} />
            </Button>
          ))}
        </ScrollView>
        <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
      </View>
      <View style={{ flex: 1 }}>
        <ContentHeader
          leftTitle={t('dApp.activityHotList')}
          rightTitle={t('dApp.seeAll')}
          onRightClick={() => onShowAll('activity')}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 20, minHeight: 200 }}>
          {activity?.lists?.map((v, i) => (
            <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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

const useStyles = makeStyles((theme, props: DAppProps) => {
  return {
    container: {
      backgroundColor: theme.colors.white,
      flex: 1,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 4,
      paddingHorizontal: 25,
      paddingBottom: 15,
      backgroundColor: theme.colors.white,
    },
    inputContainer: {
      marginLeft: 20,
      paddingHorizontal: 11,
      height: 36,
      minHeight: 36,
      borderRadius: 24,
      width: Dimensions.get('window').width - 75,
      borderColor: theme.colors.grey5,
    },
    banner: {
      backgroundColor: theme.colors.grey5,
      height: 180,
      marginHorizontal: 20,
      borderRadius: 10,
      overflow: 'hidden',
      flex: 1,
    },
    wrapper: {
      // height: 150,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      borderRadius: 10, // 添加圆角边框
      overflow: 'hidden', // 剪切超出边界的内容
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    notice: {
      marginVertical: 10,
      marginLeft: 16,
      marginRight: 16,
      gap: 5,
      alignItems: 'center',
      flexDirection: 'row',
    },
    noticeText: {
      flex: 1,
      color: '#8c8c8c',
      fontSize: 12,
    },
    noticeIcon: {
      backgroundColor: theme.colors.grey1,
      borderRadius: 5,
    },
    scrollView: {
      flexDirection: 'row',
    },
    scrollViewContentView: {
      gap: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    scrBtnContainer: {
      gap: 6,
      height: 32,
      borderRadius: 25,
      justifyContent: 'flex-start',
      backgroundColor: theme?.mode === 'dark' ? '#F1F1F1' : '#F2F3F6',
    },
    scrBtnTitle: {
      fontSize: 12,
      lineHeight: 17,
      color: '#333333',
    },
    recommendItem: {
      gap: 2,
      paddingTop: 7,
      paddingBottom: 5,
      paddingHorizontal: 7,
      flexDirection: 'column',
      backgroundColor: theme?.mode === 'dark' ? '#F1F1F1' : '#FFFFFF',
      borderRadius: 10,
      width: 98,
      elevation: 5,
    },
  };
});
