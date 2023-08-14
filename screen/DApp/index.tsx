import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, Image, SafeAreaView, useWindowDimensions } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import MockData from './index.mock.json';
import { useTranslation } from 'react-i18next';
import { DAppItem } from '@screen/DApp/Components/DAppItem';
import { getBanners, getDAppGroup, getNotices } from '@api/dApp';
import { Button, Input, Text } from '@rneui/themed';

interface DAppProps {
  navigation?: any;
}

export const DAppScreen = (props: DAppProps) => {
  const { width } = useWindowDimensions();
  const style = useStyles(props);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [banners, setBanners] = useState<Array<any>>([]);
  const [notices, setNotices] = useState<Array<any>>([]);
  const [dAppGroup, setDAppGroup] = useState<Array<any>>([]);

  useEffect(() => {
    rqBanners();
  }, []);

  const rqBanners = async () => {
    try {
      const banners = await getBanners('zh_CN');
      const dAppGroupRes = await getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        walletLanguage: 'zh_CN',
      });
      setDAppGroup(dAppGroupRes.data);
      console.log(222222, JSON.stringify(dAppGroupRes));
      const noticesRes = await getNotices({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        walletLanguage: 'zh_CN',
      });
      setNotices(noticesRes.data);
      console.log(33333, JSON.stringify(noticesRes));
    } catch (e) {}
  };

  const onShowAll = () => {
    props?.navigation.navigate('DAppList');
  };

  const onHotPress = () => {
    props?.navigation.navigate('DAppDetail');
  };
  const onRecommendPress = () => {
    props?.navigation.navigate('DAppDetail');
  };

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
          placeholder="输入Dapp名称或者网站"
        />
        <Icon name="scan1" style={{ marginLeft: 5 }} size={24} color={theme.colors.black} />
      </View>
      <View style={style.banner}>
        <Image
          source={require('@assets/images/banner.jpg')}
          style={{
            height: 150,
            width: width - 40,
          }}
        />
      </View>
      <View style={style.notice}>
        <Button
          icon={<Icon name={'appstore1'} size={15} color={theme.colors.grey4} />}
          size={'sm'}
          color={'transparent'}
        />
        <Text style={style.noticeText} numberOfLines={1}>
          据CoinDesk 4月 17日报道, 美国纽约吧啦吧吧吧吧吧
        </Text>
        <Button
          icon={<Icon name={'appstore1'} size={15} color={theme.colors.grey4} />}
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
          {MockData.tokenButtons.map((v, index) => (
            <Button
              icon={<Icon name={v.icon} size={15} color={'#3B28CC'} />}
              title={v.name}
              key={index}
              titleStyle={style.scrBtnTitle}
              buttonStyle={style.scrBtnContainer}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 20 }}>
        <ContentHeader leftTitle={t('dApp.recommendList')} rightTitle={t('dApp.seeAll')} onRightClick={onShowAll} />
        <ScrollView
          style={style.scrollView}
          contentContainerStyle={[style.scrollViewContentView]}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          horizontal={true}
        >
          {dAppGroup?.lists?.map((v, index) => (
            <Button buttonStyle={style.recommendItem} onPress={onRecommendPress} key={index}>
              <Image source={{ uri: v.coverPicture }} style={{ height: 90, width: 90, borderRadius: 5 }} />
              <Text children={v.summary} style={style.scrBtnTitle} />
            </Button>
          ))}
        </ScrollView>
        <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
      </View>
      <View style={{ flex: 1 }}>
        <ContentHeader leftTitle={t('dApp.activityHotList')} rightTitle={t('dApp.seeAll')} onRightClick={onShowAll} />
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {notices?.lists?.map((v, i) => (
            <DAppItem {...v} key={v.title + String(i)} onPress={onHotPress} />
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
          children={props.leftTitle}
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />
      )}
      {props.rightTitle && (
        <Text
          children={props.rightTitle}
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
      height: 150,
      marginHorizontal: 20,
      borderRadius: 10,
      overflow: 'hidden',
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
      gap: 5,
      paddingHorizontal: 12,
      borderRadius: 25,
      justifyContent: 'flex-start',
      backgroundColor: '#F2F3F6',
    },
    scrBtnTitle: {
      fontSize: 12,
      color: theme.colors.black,
    },
    recommendItem: {
      gap: 2,
      paddingTop: 7,
      paddingBottom: 5,
      paddingHorizontal: 7,
      flexDirection: 'column',
      backgroundColor: '#F2F3F6',
      borderRadius: 10,
    },
  };
});
