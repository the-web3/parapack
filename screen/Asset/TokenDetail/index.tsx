import * as React from 'react';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Tab, TabView, Text, makeStyles } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Layout from '@components/LayoutNormal';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};
const aa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const TokenDetail = (props: Props) => {
  const [index, setIndex] = useState(0);
  const styles = useStyles(props);
  return (
    <Layout
      containerStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
      fixedChildren={
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button
            onPress={() => {
              props?.navigation.navigate('transferPayment');
            }}
            buttonStyle={{
              // backgroundColor: '#8B7FEA',
              alignItems: 'baseline',
              display: 'flex',
            }}
          >
            <Icon name={'creditcard'} color={'#fff'} /> 转账
          </Button>
          <Button
            onPress={() => {
              props?.navigation.navigate('transferPayment');
            }}
            buttonStyle={{
              backgroundColor: '#2667FF',
              alignItems: 'baseline',
              display: 'flex',
            }}
          >
            <Icon name={'qrcode'} color={'#fff'} /> 收款
          </Button>
          <Button
            onPress={() => {
              props?.navigation.navigate('swap');
            }}
            buttonStyle={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#252525',
              overflow: 'hidden',
              alignItems: 'baseline',
              display: 'flex',
            }}
          >
            <Icon name="swap" color="#252525" />
            <Text style={{ color: '#252525' }}>兑换</Text>
          </Button>
        </View>
      }
    >
      <LinearGradient
        colors={['#3251EA', '#3251EA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 32,
            paddingBottom: 22,
          }}
        >
          <View>
            <Text style={{ fontSize: 52, color: '#ECECEC' }}>
              1.16 <Text style={{ fontSize: 12, color: '#ECECEC' }}>BNB</Text>
            </Text>
            <Text style={{ fontSize: 14, color: '#ECECEC' }}>≈$10.29</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props?.navigation.navigate('startBackup');
            }}
          >
            <View style={styles.button}>
              <Icon name="pluscircleo" size={12} style={{ marginRight: 3 }} />
              <Text style={{ lineHeight: 18 }}>去备份</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={{ fontSize: 18 }}>128.12 =</Text>
              <Text style={{ fontSize: 14 }}>$2800.12</Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('swap');
              }}
            >
              <Text style={{ color: '#3B28CC', fontSize: 12 }}>
                去兑换 <Icon name="right" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <View style={{ paddingHorizontal: 16, marginVertical: 15 }}>
        <TouchableOpacity
          onPress={() => {
            props?.navigation.navigate('coinDetail');
          }}
        >
          <View
            style={{
              height: 59,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#AEAEAE',
            }}
          >
            <Text>banner</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer1}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32 }}>
          <View style={{ flex: 1 }}>
            <Tab
              value={index}
              onChange={(e) => {
                setIndex(e);
              }}
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
              <Tab.Item>全部</Tab.Item>
              <Tab.Item>转入</Tab.Item>
              <Tab.Item>转出</Tab.Item>
            </Tab>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                props?.navigation.navigate('addToken');
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: '#F3F3F3',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  marginRight: 6,
                }}
              >
                <Icon name="search1" color={'#5A5A5A'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ width: '100%' }}>
              <ScrollView style={{ paddingHorizontal: 25 }}>
                {aa.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      props?.navigation.navigate('coinDetail');
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: '#F9F9F9',
                        paddingVertical: 10,
                      }}
                    >
                      <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
                      <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                          <Text>转入</Text>
                          <Text>0.19</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.listPrice}>¥ 195，457</Text>
                          </View>
                          <View>
                            <Text style={{ color: '#999999' }}>08.09.2022</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <ScrollView style={{ paddingHorizontal: 25 }}>
                {aa.map((item) => (
                  <View
                    key={item}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: '#F9F9F9',
                      paddingVertical: 10,
                    }}
                  >
                    <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
                    <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <Text>转入</Text>
                        <Text>0.19</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.listPrice}>¥ 195，457</Text>
                        </View>
                        <View>
                          <Text style={{ color: '#999999' }}>08.09.2022</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </TabView.Item>
            <TabView.Item style={{ width: '100%' }}>
              <ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <View>
                    <Image
                      source={require('../../../assets/images/emptyRecord.png')}
                      style={styles.img}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  </View>
                  <Text style={{ fontSize: 10, marginTop: 18, marginBottom: 28, color: '#AEAEAE' }}>暂无交易记录</Text>
                </View>
              </ScrollView>
            </TabView.Item>
          </TabView>
        </View>
      </View>
    </Layout>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  // console.log(11111, theme.colors, props);
  return {
    gradient: {
      // height: '100%',
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
    scrollContainer: {
      paddingTop: 16,
      // paddingHorizontal: 25,
      borderTopLeftRadius: 20, // 左上角边框半径
      borderTopRightRadius: 20, // 右上角边框半径
      borderBottomRightRadius: 0, // 右下角边框半径
      borderBottomLeftRadius: 0, // 左下角边框半径
      backgroundColor: '#F5F5FF',
      paddingHorizontal: 26,
      height: 181,
      // shadowColor: '#CED8F7',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.6,
      // shadowRadius: 4,
      // elevation: 4,
      // height: '100%',
    },
    listPrice: {
      color: '#999999',
      fontSize: 12,
    },
    green: {
      color: '#5BCC47',
      fontSize: 12,
    },
    scrollContainer1: {
      paddingTop: 16,
      // paddingHorizontal: 25,
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
      height: '100%',
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

export default TokenDetail;
