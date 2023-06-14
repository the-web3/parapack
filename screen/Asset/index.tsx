import * as React from 'react';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Input, Tab, TabView, Text, makeStyles } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const CARD_LIST = [
  {
    icon: 'appstore1',
    title: 'transfer',
  },
  {
    icon: 'appstore1',
    title: 'receipt',
  },
  {
    icon: 'appstore1',
    title: 'purchase',
  },
  {
    icon: 'appstore1',
    title: 'flash',
  },
];
const Asset = (props: Props) => {
  const { t } = useTranslation();
  const [priceShow, setPriceShow] = useState<boolean>(false);
  const [index, setIndex] = React.useState(0);
  const handleAsset = () => {
    props?.navigation.navigate('startBackup');
  };
  const styles = useStyles(props);
  return (
    <LinearGradient colors={['#FFFFFF', '#E6E3FD']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.gradient}>
      <View style={styles.card}>
        <View style={styles.cardBetween}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.text}>amy的钱包</Text>
            <Icon name="caretdown" style={{ color: '#fff', marginLeft: 8 }} />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.text}>详情</Text>
            <Icon name="right" style={{ color: '#fff', marginLeft: 8 }} />
          </View>
        </View>
        <View
          style={{
            ...styles.cardBetween,
            marginTop: 25,
          }}
        >
          <View style={styles.price}>
            <Text style={{ color: '#fff', fontSize: 40, lineHeight: 47 }}>¥{priceShow ? '19.81' : '******'}</Text>
            <Icon
              name="eyeo"
              size={12}
              color="#fff"
              style={{ marginLeft: 3 }}
              onPress={() => {
                setPriceShow(!priceShow);
              }}
            />
          </View>
          <View style={styles.button}>
            <Icon name="pluscircleo" size={12} style={{ marginRight: 3 }} />
            <Text style={{ lineHeight: 18 }}>去备份</Text>
          </View>
        </View>
        <View style={styles.cardBottom}>
          {CARD_LIST.map((item) => (
            <View key={item.title} style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
              <Icon name={item.icon} size={15} style={{ marginRight: 6 }} />
              <Text style={{ lineHeight: 16 }}>{t(`asset.${item.title}`)}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.scrollContainer}>
        <View />
        {/* <Tab
          value={index}
          onChange={(e) => {
            setIndex(e);
          }}
          dense
        >
          <Tab.Item>Recent</Tab.Item>
          <Tab.Item>favorite</Tab.Item>
        </Tab>
        <Text>1111</Text>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <Text h1>Recent</Text>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
            <Text h1>Favorite</Text>
          </TabView.Item>
        </TabView>
        <Text>22222</Text> */}
      </View>
    </LinearGradient>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    gradient: {
      height: '100%',
    },
    price: { display: 'flex', flexDirection: 'row' },
    card: {
      // marginBottom: 26,
      height: 156,
      backgroundColor: '#3B28CC',
      borderRadius: 14,
      elevation: 8, // 阴影的浮动高度
      shadowColor: '#E7E7FF', // 阴影颜色
      shadowOffset: { width: 4, height: 8 }, // 阴影偏移量
      shadowOpacity: 0.5, // 阴影的透明度
      shadowRadius: 18, // 阴影的模糊半径
      marginHorizontal: 22,
      marginVertical: 18,
      marginTop: 58,
      color: '#fff',
      overflow: 'hidden',
      paddingVertical: 15,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 8,
      backgroundColor: '#EDEDED',
      borderRadius: 10,
    },
    cardBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 27,
    },
    text: { color: '#fff' },
    cardBottom: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      paddingVertical: 12,
      justifyContent: 'space-around',
    },
    scrollContainer: {
      paddingTop: 16,
      paddingHorizontal: 25,
      borderTopLeftRadius: 20, // 左上角边框半径
      borderTopRightRadius: 20, // 右上角边框半径
      borderBottomRightRadius: 0, // 右下角边框半径
      borderBottomLeftRadius: 0, // 左下角边框半径
      backgroundColor: '#fff',
      shadowColor: '#CED8F7',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
    },
  };
});
export default Asset;
