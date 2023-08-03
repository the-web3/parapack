import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  // StyleSheet,
  View,
} from 'react-native';
import { Button, Input, Tab, TabView, Text, makeStyles } from '@rneui/themed';
import Layout from '@components/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from './types';
// type ScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'ScreenName'
// >;
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const CoinDetail = (props: Props) => {
  const { navigation } = props;
  const styles = useStyles(props);
  const [index, setIndex] = React.useState(0);
  const handleCoinDetail = () => {
    props?.navigation.navigate('startBackup');
  };
  useEffect(() => {
    // 在组件挂载或标题更新时执行
    navigation.setOptions({
      title: 'BNB',
      subTitle: '99999',
    });
  }, [navigation]);
  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <StatusBar
        backgroundColor="#fff" // 替换为你想要的背景颜色
        barStyle="dark-content" // 替换为你想要的图标和文字颜色
      />
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
            // backgroundColor: '#D8D8D8',
            backgroundColor: '#3B28CC',
            height: 4,
            borderRadius: 2,
          }}
          titleStyle={(active: boolean) => {
            return { fontSize: 12, marginVertical: 8, color: active ? '#3B28CC' : '#AEAEAE' };
          }}
        >
          <Tab.Item>活动</Tab.Item>
          <Tab.Item>概览</Tab.Item>
          <Tab.Item>工具</Tab.Item>
        </Tab>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.viewItem}>
          <View>
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
              <Text style={{ fontSize: 10, marginTop: 18, marginBottom: 28, color: '#AEAEAE' }}>暂无交易记录</Text>
              <View style={{ backgroundColor: '#F1F1F1', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4 }}>
                <Text style={{ fontSize: 10, color: '#5D5D5D' }}>
                  在浏览器中查看 <Icon name="link" size={10} color={'#5D5D5D'} />
                </Text>
              </View>
            </View>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.viewItem}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.title}>币信息</Text>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>代币名称</Text>
              <Text style={styles.subDesc}>BNB</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>项目名称</Text>
              <Text style={styles.subDesc}>币安币</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>总发行量</Text>
              <Text style={styles.subDesc}>200,000,000 BNB</Text>
            </View>
            <View style={styles.subRow}>
              <Text style={styles.subTitle}>合约地址</Text>
              <Text style={styles.subDesc}>0idax92u8299001nd928fbne89101-1nd9202 81920d0xx</Text>
            </View>
            <Text style={styles.title}>币信息</Text>
            <View>
              <Text style={styles.desc}>
                Biance Coin是由币安发行的代币，简称BNB，是基于以太坊
                Ethereum的去中心化的区块链数字资产。发行总量恒定为2亿
                个，每个季度根据币安平台当季交易量对BNB进行销毁，销毁 记录将会第一时间公布，用户可通过区块链浏览器查询..{' '}
              </Text>
            </View>
            <Text style={styles.title}>资源</Text>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.viewItem}>
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32 }}>
              <View style={styles.toolItem}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>区块浏览器</Text>
              </View>
              <View style={styles.toolItemRigth}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>区块浏览器</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <View style={styles.toolItem}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>区块浏览器</Text>
              </View>
              <View style={styles.toolItemRigth}>
                <Icon name="safari" size={21} />
                <Text style={{ marginTop: 6 }}>区块浏览器</Text>
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
