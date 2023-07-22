import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { makeStyles, useTheme } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
import { Button } from "@rneui/base";
import MockData from './index.mock.json'
import { useTranslation } from "react-i18next";
import { DAppItem } from "@screen/DApp/Components/DAppItem";

interface DAppProps {
  navigation?: any
}

export const DAppScreen = (props: DAppProps) => {

  const style = useStyles(props);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const onShowAll = () => {
    props?.navigation.navigate('DAppList');
  }

  const onHotPress = () => {
    props?.navigation.navigate('DAppWebView', {params: {uri: 'https://app.uniswap.org/#/swap'}});
  }
  const onRecommendPress = () => {
    props?.navigation.navigate('DAppWebView', {params: {uri: 'https://app.uniswap.org/#/swap'}});
  }

  return (
    <SafeAreaView style={[style.container, { height: Dimensions.get('window').height - 100 }]}>
      <View style={style.banner}/>
      <View style={style.notice}>
        <Button icon={
          <Icon name={'appstore1'} size={15} color={theme.colors.grey4}/>
        } size={'sm'} color={'transparent'}/>
        <Text style={style.noticeText} numberOfLines={1}>据CoinDesk 4月 17日报道, 美国纽约吧啦吧吧吧吧吧</Text>
        <Button icon={
          <Icon name={'appstore1'} size={15} color={theme.colors.grey4}/>
        } size={'sm'} color={'transparent'}/>
      </View>
      <View>
        <ScrollView style={style.scrollView}
                    contentContainerStyle={style.scrollViewContentView}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}>
          {
            MockData.tokenButtons.map((v,index) => (
              <Button icon={<Icon name={v.icon} size={15} color={'#3B28CC'}/>}
                      title={v.name}
                      key={index}
                      titleStyle={style.scrBtnTitle}
                      buttonStyle={style.scrBtnContainer}/>
            ))
          }
        </ScrollView>
      </View>
      <View style={{ marginTop: 25 }}>
        <ContentHeader leftTitle={t('dApp.recommendList')}
                       rightTitle={t('dApp.seeAll')}
                       onRightClick={onShowAll}/>
        <ScrollView style={style.scrollView}
                    contentContainerStyle={[style.scrollViewContentView]}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}>
          {
            MockData.recommendList.map((v,index) => (
              <Button buttonStyle={style.recommendItem}
                      onPress={onRecommendPress}
                      key={index}>
                <Image source={{ uri: v.img }} style={{ height: 100, width: 100, borderRadius: 5 }}/>
                <Text children={v.title} style={style.scrBtnTitle}/>
              </Button>
            ))
          }
        </ScrollView>
        <View style={{ marginVertical: 25, marginHorizontal: 20, backgroundColor: theme.colors.grey5, height: 1 }}/>
      </View>
      <View style={{ flex: 1 }}>
        <ContentHeader leftTitle={t('dApp.activityHotList')}
                       rightTitle={t('dApp.seeAll')}
                       onRightClick={onShowAll}/>
        <ScrollView contentContainerStyle={{ paddingBottom: 46 }}>
          {
            MockData.hotList.map((v, i) => (
              <DAppItem {...v} key={v.title + String(i)} onPress={onHotPress}/>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

interface ContentHeaderProps {
  leftTitle?: string | null | undefined;
  rightTitle?: string | null | undefined;
  onRightClick?: () => void
}

const ContentHeader = (props: ContentHeaderProps) => {

  return (
    <View style={{
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 20,
      justifyContent: 'space-between'
    }}>
      {props.leftTitle && <Text children={props.leftTitle} style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}/>}
      {props.rightTitle && <Text children={props.rightTitle} style={{
        fontSize: 15,
        color: '#3B28CC'
      }} onPress={props?.onRightClick}/>}
    </View>
  )
}


const useStyles = makeStyles((theme, props: DAppProps) => {
  return {
    container: {
      backgroundColor: theme.colors.white,
    },
    banner: {
      backgroundColor: theme.colors.grey5,
      height: 150,
      margin: 20,
      marginTop: 5,
      marginBottom: 0,
      borderRadius: 10,
    },
    notice: {
      marginVertical: 10,
      marginLeft: 16,
      marginRight: 16,
      gap: 5,
      alignItems: 'center',
      flexDirection: "row",
    },
    noticeText: {
      flex: 1,
    },
    noticeIcon: {
      backgroundColor: theme.colors.grey1,
      borderRadius: 5
    },
    scrollView: {
      flexDirection: "row",
    },
    scrollViewContentView: {
      gap: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
    },
    scrBtnContainer: {
      gap: 5,
      paddingHorizontal: 15,
      borderRadius: 25,
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.grey5
    },
    scrBtnTitle: {
      fontSize: 15,
      color: theme.colors.black
    },
    recommendItem: {
      gap: 5,
      flexDirection: "column",
      backgroundColor: theme.colors.grey5,
      borderRadius: 10,
    }
  };
});
