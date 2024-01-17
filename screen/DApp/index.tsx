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
import { useTranslation } from 'react-i18next';
import { DAppItem } from '@screen/DApp/Components/DAppItem';
// import { DAppItems } from '@screen/DApp/Components/DAppItem';
import { getBanners, getDAppGroup, getDevInfo, getNotices, getTags } from '@api/dApp';
import { Button, Input, Text } from '@rneui/themed';
import IconFont from '@assets/iconfont';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ReportBottom from '@components/ReportBottom';

const screenHeight = Dimensions.get('window').height;

interface DAppProps {
  navigation?: any;
  mode?: string;
}

export const DAppScreen = (props: DAppProps) => {
  const { width } = useWindowDimensions();
  const style = useStyles(props);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [banners, setBanners] = useState<Record<string, any>>({});
  const [notices, setNotices] = useState<Record<string, any>>({});
  const [dAppGroup, setDAppGroup] = useState<Record<string, any>>({});
  const [dAppGroupTime, setDAppGroupTime] = useState<Record<string, any>>({});
  const [dAppGroupNew, setDAppGroupNew] = useState<Record<string, any>>({});
  const [dAppGroupHot, setDAppGroupHot] = useState<Record<string, any>>({});
  const [dAppGroupLike, setDAppGroupLike] = useState<Record<string, any>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState('6h');
  useEffect(() => {
    rqDatas();
  }, [props?.language]);

  const rqDatas = async () => {
    try {
      getBanners().then((res) => {
        // console.log('banners:', JSON.stringify(banners));
        setBanners(res.data);
      });

      getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        tag: 'recommend',
      }).then((res) => {
        setDAppGroup(res.data);
      });

      getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        tag: 'guess',
      }).then((res) => {
        setDAppGroupLike(res.data);
      });

      getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        tag: 'hot',
      }).then((res) => {
        setDAppGroupHot(res.data);
      });

      getDAppGroup({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
        tag: 'new',
      }).then((res) => {
        setDAppGroupNew(res.data);
      });

      getNotices({
        pageNum: 1,
        pageSize: 10,
      }).then((res) => {
        // console.log('noticesRes', JSON.stringify(noticesRes));
        setNotices(res.data);
      });

      getTags().then((res) => {
        // console.log('tagRes:', JSON.stringify(tagsRes.data));
        setTags(res.data);
      });
    } catch (e) {}
  };

  const onTagPress = (tag?: string, title?: string) => {
    props?.navigation.navigate('DAppList', { params: { type: 'group', tag }, title });
  };
  const onShowAll = (params?: Record<string, any>, title?: string) => {
    props?.navigation.navigate('DAppList', { params: { type: 'group', ...params }, title });
  };

  const onRecommendPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', { params });
  };

  const onNewsArticle = () => {
    props?.navigation.navigate('NewsArticle');
  };

  const onDeveloperOnboarding = (tag?: string) => {
    props?.navigation.navigate('DeveloperOnboarding');
  };

  const onIcon = () => {
    props?.navigation.navigate('Settings');
  };

  useEffect(() => {
    getDAppGroup({
      pageNum: 1,
      pageSize: 10,
      symbol: 'eth',
      timeType: selectedTime === '6h' ? '6h' : ' 24h', //24h
    }).then((dAppGroupTimeRes) => {
      setDAppGroupTime(dAppGroupTimeRes.data);
    });
  }, [selectedTime]);

  return (
    <SafeAreaView style={[style.container, { height: Dimensions.get('window').height - 100 }]}>
      <View style={style.searchBar}>
        <TouchableOpacity onPress={() => onIcon()}>
          <IconFont name="a-11" style={{ backgroundColor: '#F0F0FF', borderRadius: 44 }} size={34} />
        </TouchableOpacity>

        <Input
          containerStyle={{ flex: 1 }}
          inputContainerStyle={style.inputContainer}
          errorProps={{ display: 'none' }}
          inputStyle={{
            fontSize: 12,
          }}
          onFocus={() => {
            props?.navigation.navigate('SearchDapp');
          }}
          leftIcon={<Icon name="search1" />}
          placeholder={t('dApp.searchPlaceholder')}
          onChangeText={async (search) => {
            const dAppGroupRes = await getDAppGroup({
              pageNum: 1,
              pageSize: 10,
              symbol: 'eth',
              search,
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            props?.navigation.navigate('scannerScreen');
          }}
        >
          <IconFont name="a-31-saoma" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20, minHeight: 200 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
          }}
        >
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            data={banners.lists}
            style={{ height: 140 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  height: 140,
                  justifyContent: 'center',
                  flex: 1,
                  marginHorizontal: 20,
                }}
                onPress={() => {
                  props?.navigation.navigate('DAppDetail', { params: item.contentInfo });
                }}
              >
                <Image
                  source={{ uri: item?.img }}
                  style={{
                    width: width - 40,
                    resizeMode: 'cover',
                    height: '100%',
                    flex: 1,
                    borderRadius: 12,
                    // resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={style.notice}>
          <Button
            icon={<IconFont name="volume" size={9} />}
            size={'sm'}
            color={'transparent'}
            onPress={() => onNewsArticle()}
          />
          <View style={{ flex: 1 }}>
            <SwiperFlatList
              autoplay
              autoplayDelay={2}
              autoplayLoop
              data={notices?.lists}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ width: width }}
                  onPress={() => {
                    props?.navigation.navigate('News', { ...item });
                  }}
                >
                  <Text
                    style={{
                      color: '#8c8c8c',
                      width: width - 40,
                      // resizeMode: 'cover',
                      height: '100%',
                      flex: 1,
                      borderRadius: 12,
                      resizeMode: 'contain',
                    }}
                    numberOfLines={1}
                  >
                    {item.summary}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <Button
            icon={<IconFont name="a-4" size={10} />}
            size={'sm'}
            color={'transparent'}
            onPress={() => onNewsArticle()}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <ScrollView
            contentContainerStyle={style.scrollViewContentTag}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {(tags || []).map((v, index) => {
              return (
                <Button
                  icon={
                    v.logo ? (
                      <Image source={{ uri: v.logo }} style={{ height: 14, width: 14, marginRight: 6 }} />
                    ) : (
                      <View />
                    )
                  }
                  title={v.tagShow}
                  key={index}
                  onPress={() => onTagPress(v.tag, v.tagShow)}
                  titleStyle={style.scrBtnTitle}
                  buttonStyle={style.scrBtnContainer}
                />
              );
            })}
          </ScrollView>
        </View>
        {/* chinese language for the hot activity */}
        <View>
          <ContentHeader
            leftTitle={t('dApp.recommendList')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() =>
              onShowAll(
                {
                  tag: 'recommend',
                },
                t('dApp.recommendList')
              )
            }
          />
          <ScrollView
            contentContainerStyle={[style.scrollViewContentView]}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal={true}
          >
            {dAppGroup?.lists?.map((v, index) => (
              <TouchableOpacity style={style.recommendItem} onPress={() => onRecommendPress(v)} key={index}>
                <View style={{ position: 'relative' }}>
                  <Image source={{ uri: v.miniCoverPicture }} style={{ height: 84, width: 84, borderRadius: 5 }} />
                  <IconFont name="medal" style={{ position: 'absolute', bottom: 0, right: 0 }} />
                </View>

                <Text numberOfLines={1} ellipsizeMode="tail" children={v.title} style={style.scrBtnTitle} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={{ marginBottom: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>
        {/* for the hot activity */}
        <View style={{ marginTop: 1 }}>
          <ContentHeader
            leftTitle={t('dApp.hotActivity')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() =>
              onShowAll(
                {
                  tag: 'hot',
                },
                t('dApp.hotActivity')
              )
            }
          />
          <ViewContent list={dAppGroupHot?.lists} navigation={props?.navigation} />
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>

        {/* 6b 24b view all */}
        <View>
          <ContentHeader
            left={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <View style={[toggleStyles.toggleContainer]}>
                  <TouchableOpacity
                    style={[toggleStyles.toggleButton, selectedTime === '6h' ? toggleStyles.toggleSelected : null]}
                    onPress={() => setSelectedTime('6h')}
                  >
                    <Text style={[toggleStyles.toggleText, { fontSize: 12 }]}> {t(`dApp.6h`)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[toggleStyles.toggleButton, selectedTime === '24h' ? toggleStyles.toggleSelected : null]}
                    onPress={() => setSelectedTime('24h')}
                  >
                    <Text style={[toggleStyles.toggleText, { fontSize: 12 }]}>{t(`dApp.24h`)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            rightTitle={t('dApp.seeAll')}
            onRightClick={() =>
              onShowAll(
                {
                  timeType: selectedTime === '6h' ? '6h' : ' 24h',
                },
                t(`dApp.${selectedTime}`)
              )
            }
          />
          {/* <ViewContent list={dAppGroupTime?.lists} navigation={props?.navigation} /> */}
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>
        {/* new ecosystem */}
        <View style={{ marginTop: 1 }}>
          <ContentHeader
            leftTitle={t('dApp.newEcosystems')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() =>
              onShowAll(
                {
                  tag: 'new',
                },
                t('dApp.newEcosystems')
              )
            }
          />
          <ViewContent list={dAppGroupNew?.lists} navigation={props?.navigation} />
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>
        {/* you like */}
        <View style={{ marginTop: 1 }}>
          <ContentHeader
            leftTitle={t('dApp.youlike')}
            rightTitle={t('dApp.seeAll')}
            onRightClick={() =>
              onShowAll(
                {
                  tag: 'guess',
                },
                t('dApp.youlike')
              )
            }
          />
          <ViewContent list={dAppGroupLike?.lists} navigation={props?.navigation} />
          <View style={{ marginVertical: 20, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }} />
        </View>
        <ReportBottom navigation={props?.navigation} />
        <View
          style={[
            {
              marginTop: 20,
              borderTopWidth: 1,
              marginHorizontal: 20,
              borderColor: '#E5E5E5',
              flexDirection: 'row',
              paddingTop: 8,
            },
          ]}
        >
          <TouchableOpacity onPress={() => onDeveloperOnboarding('DeveloperOnboarding')}>
            <Text style={styles.buttonTexts}>
              {t('dApp.termsAndRegulation')} <Text style={styles.buttonTexts}>{'>'}</Text>
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#f2f3f6',
    borderRadius: 192,
    width: 130,
    borderWidth: 1,
    borderColor: '#f2f3f6',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f6',
    borderRadius: 15,
    paddingHorizontal: 14,
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

  buttonsText: {
    backgroundColor: '#e0e0e0',
    color: '#6f61d6',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTexts: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    // marginLeft: 2,
    // marginRight: 24,
  },
});

interface ContentHeaderProps {
  leftTitle?: string | null | undefined;
  rightTitle?: string | null | undefined;
  left?: any;
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
        alignItems: 'center',
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
      {props.left && props.left}
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

const ViewContent = (props: { list: any[]; navigation: any }) => {
  const style = useStyles(props);
  const { list } = props;

  const onHotPress = (params: any) => {
    props?.navigation?.navigate('DAppDetail', { params });
  };
  return (
    <>
      <ScrollView
        style={style.scrollView}
        contentContainerStyle={[style.scrollViewContentEco]}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal={true}
      >
        {list?.slice(0, 3).map((v, i) => (
          <View style={{ width: 250 }} key={v.title}>
            <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
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
        {list?.slice(3, 6).map((v, i) => (
          <View style={{ width: 250 }} key={v.title}>
            <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
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
        {list?.slice(6, 9).map((v, i) => (
          <View style={{ width: 250 }} key={v.title}>
            <DAppItem {...v} key={v.title + String(i)} onPress={() => onHotPress(v)} />
          </View>
        ))}
      </ScrollView>
    </>
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
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: theme.colors.white,
    },
    inputContainer: {
      // marginLeft: -50, marginTop: 11
      marginHorizontal: 11,
      paddingHorizontal: 11,
      height: 36,
      minHeight: 36,
      borderRadius: 24,
      // width: Dimensions.get('window').width - 95,
      borderColor: theme.colors.grey5,
      // flex: 1,
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
      height: 26,
    },
    noticeIcon: {
      backgroundColor: theme.colors.grey1,
      borderRadius: 5,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContentTag: {
      gap: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },
    scrollViewContentView: {
      gap: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
      paddingBottom: 20,
    },
    scrollViewContent: {
      paddingHorizontal: 1,
      flexDirection: 'row',
      paddingBottom: 20,
    },
    scrollViewContentEco: {
      paddingHorizontal: 1,
      flexDirection: 'row',
    },
    scrBtnContainer: {
      height: 32,
      borderRadius: 25,
      justifyContent: 'flex-start',
      backgroundColor: theme?.mode === 'dark' ? '#F1F1F1' : '#F2F3F6',
    },
    scrBtnTitle: {
      fontSize: 12,
      lineHeight: 16,
      color: '#333333',
    },
    recommendItem: {
      gap: 2,
      paddingTop: 7,
      marginRight: 8,
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
