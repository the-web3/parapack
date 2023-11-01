import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { DAppItem } from '@screen/DApp/Components/DAppItem';
import { DAppItems } from '@screen/DApp/Components/DAppItem';
import { getBanners, getDAppGroup, getNotices, getTags } from '@api/dApp';
import { Button, Input, Text } from '@rneui/themed';
import { getActivity } from '@api/home';
import { Carousel } from 'react-native-ui-lib';
import IconFont from '@assets/iconfont';

const screenHeight = Dimensions.get('window').height;

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
  const [selectedTime, setSelectedTime] = useState('6小时');
  useEffect(() => {
    rqDatas();
  }, []);

  const renderGroupedItems = (list) => {
    const groupedItems = [];
    for (let i = 0; i < list.length; i += 2) {
      groupedItems.push(
        <View style={{ flexDirection: 'column' }} key={i}>
          <DAppItem {...list[i]} key={list[i].title} onPress={() => onHotPress(list[i])} />
          {list[i + 1] ? (
            <DAppItem {...list[i + 1]} key={list[i + 1].title} onPress={() => onHotPress(list[i + 1])} />
          ) : null}
        </View>
      );
    }
    return groupedItems;
  };

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

  const onDevloperApplication = () => {
    props?.navigation.navigate('DevloperApplication');
  };

  const onNewsArticle = () => {
    props?.navigation.navigate('NewsArticle');
  };

  const onReport = () => {
    props?.navigation.navigate('ReportQuestion');
  };

  const onDeveloperOnboarding = (tag?: string) => {
    props?.navigation.navigate('DeveloperOnboarding');
  };

  const onParapack = () => {
    props?.navigation.navigate('Parapack');
  };

  const onIcon = () => {
    props?.navigation.navigate('Settings');
  };

  console.log('banners.lists:', banners.lists);

  return (
    <SafeAreaView style={[style.container, { height: Dimensions.get('window').height - 100 }]}>
      {/* ------------------------ */}
      <View style={style.searchBar}>
        <TouchableOpacity onPress={() => onIcon()}>
          <IconFont name="a-logopeise" style={{ marginRight: 35, marginTop: 11 }} />
        </TouchableOpacity>

        <Input
          containerStyle={{ marginLeft: -50, marginTop: 11 }}
          inputContainerStyle={style.inputContainer}
          errorProps={{ display: 'none' }}
          inputStyle={{
            fontSize: 12,
          }}
          leftIcon={<Icon name="search1" />}
          placeholder="输入Dapp网站"
        />
        <TouchableOpacity>
          <IconFont name="a-31-saoma" style={{ marginLeft: -18, marginTop: 11 }} />
        </TouchableOpacity>
      </View>
      {/* --------------------- */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20, minHeight: 200 }}>
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
          {/* button speaker */}
          <Button
            icon={<Icon name={'sound'} size={17} color={theme.colors.grey4} />}
            size={'sm'}
            color={'transparent'}
          />
          <TouchableOpacity style={[style.noticeText, { marginTop: 4 }]} onPress={() => onNewsArticle()}>
            <Text style={style.noticeText} numberOfLines={1}>
              {notices?.lists?.length ? notices.lists[0].summary : ''}
            </Text>
          </TouchableOpacity>
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
        {/* chinese language for the hot activity */}
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
        {/* for the hot activity */}
        <View style={{ marginTop: 1 }}>
          <ContentHeader
            leftTitle={t('dApp.hotActivity')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() => onShowAll('group')}
          />
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>

          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>

        {/* 6b 24b view all */}
        <View style={{ marginTop: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <View style={[toggleStyles.toggleContainer, { marginRight: 40 }]}>
              <TouchableOpacity
                style={[
                  toggleStyles.toggleButton,
                  selectedTime === '6小时' ? toggleStyles.toggleSelected : null,
                  { width: 80 },
                ]}
                onPress={() => setSelectedTime('6小时')}
              >
                <Text style={[toggleStyles.toggleText, { fontSize: 12 }]}>6小时</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  toggleStyles.toggleButton,
                  selectedTime === '24小时' ? toggleStyles.toggleSelected : null,
                  { width: 80 },
                ]}
                onPress={() => setSelectedTime('24小时')}
              >
                <Text style={[toggleStyles.toggleText, { fontSize: 12 }]}>24小时</Text>
              </TouchableOpacity>
            </View>

            <ContentHeader rightTitle={t('dApp.seeAll')} onRightClick={() => onShowAll('group')} />
          </View>
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContentEco]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItems {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContentEco]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItems {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>

          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContentEco]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItems {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>
        {/* new ecosystem */}
        <View style={{ marginTop: 1 }}>
          <ContentHeader
            leftTitle={t('dApp.newEcosystems')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() => onShowAll('group')}
          />
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>

          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>
        {/* you like */}
        <View style={{ marginTop: 1 }}>
          <ContentHeader
            leftTitle={t('dApp.youlike')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() => onShowAll('group')}
          />
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>

          <ScrollView
            style={style.scrollView}
            contentContainerStyle={[style.scrollViewContent]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {activity?.lists?.map((v, i) => (
              <View style={{ width: 250 }}>
                <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
              </View>
            ))}
          </ScrollView>
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>

        <View style={[styles.container, { marginBottom: screenHeight * 0.0146 }]}>
          <Text style={styles.more}>更多</Text>
        </View>
        <View style={[styles.container, { marginBottom: screenHeight * 0.0146 }]}>
          <TouchableOpacity onPress={() => onParapack()}>
            <Text style={styles.buttonTexts}>关于 ParaPack</Text>
          </TouchableOpacity>
        </View>
        {/* small below the parapack */}
        <View style={[styles.container, { marginBottom: screenHeight * 0.0146 }]}>
          <TouchableOpacity onPress={() => onReport()}>
            <Text style={styles.buttonTexts}>{t('dApp.reportquestion')}</Text>
          </TouchableOpacity>
        </View>
        {/* longest sentence */}
        <View style={[styles.container, { marginBottom: 26 }]}>
          <TouchableOpacity onPress={() => onDeveloperOnboarding('DeveloperOnboarding')}>
            <Text style={styles.buttonTexts}>{t('dApp.DeveloperOnboarding')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => onDevloperApplication()}>
            <Text style={styles.buttonText}>{t('dApp.developerapplication')} </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.container, { marginTop: 20 }]}>
          <TouchableOpacity onPress={() => onDeveloperOnboarding('DeveloperOnboarding')}>
            <Text style={styles.buttonTexts}>
              Terms and Regulation <Text style={styles.buttonTexts}>{'>'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const toggleStyles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#f2f3f6',
    width: 130,
  },
  toggleButton: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f6',
    borderRadius: 15,
  },
  toggleSelected: {
    backgroundColor: '#ffffff',
  },
  toggleText: {
    fontSize: 10,
  },
});

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    flexShrink: 1,
    width: '90%',
    height: '90%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#F2F3F6',
    width: 326,
    height: 40,
    marginLeft: 24, // Added 24 dp left margin
    marginRight: 24, //
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },

  leftButton: {
    marginRight: 10,
  },
  rightButton: {
    marginLeft: 10,
  },
  containers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#695BD4',
    fontSize: 16,
    textAlign: 'center',
  },

  more: {
    backgroundColor: 'transparent',
    padding: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: -7,
  },

  buttonsText: {
    backgroundColor: '#e0e0e0',
    color: '#6f61d6',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTexts: {
    color: '#695BD4',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 2,
    marginRight: 24,
  },
});

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
      width: Dimensions.get('window').width - 95,
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
      flex: 5,
      color: '#8c8c8c',
      fontSize: 12,
    },
    noticeIcon: {
      backgroundColor: theme.colors.grey1,
      borderRadius: 5,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContentView: {
      gap: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    scrollViewContent: {
      gap: -50,
      paddingHorizontal: 1,
      flexDirection: 'row',
    },
    scrollViewContentEco: {
      gap: -100,
      paddingHorizontal: 1,
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
