import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Layout from '@components/Layout';
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

const Swap = (props: Props) => {
  const [money, setMoney] = useState<{
    buy: string;
    sell: string;
  }>({
    buy: '',
    sell: '',
  });
  const handleSwap = () => {
    props?.navigation.navigate('startBackup');
  };
  const styles = useStyles(props);
  return (
    <Layout>
      <SafeAreaView>
        <View style={{ backgroundColor: '#F5F5F5', borderRadius: 12, marginBottom: 20 }}>
          <View style={{ padding: 13 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#AEAEAE', fontSize: 12 }}>卖出</Text>
              <Text style={{ color: '#5D5D5D', fontSize: 12 }}>余额：0.00</Text>
            </View>
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
              <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                  <View>
                    <Text>BTC</Text>
                    <Text
                      style={{
                        color: '#999999',
                        fontWeight: '500',
                        fontSize: 11,
                        lineHeight: 16,
                      }}
                    >
                      Bitcoin
                    </Text>
                  </View>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      // color: '#C8C8C8',
                      fontSize: 26,
                      lineHeight: 30,
                      fontWeight: 'bold',
                      minWidth: 100,
                      textAlign: 'right',
                    }}
                    // placeholderTextColor={'gray'}
                    onChangeText={(sell) => {
                      setMoney((prev) => {
                        return {
                          ...prev,
                          sell,
                        };
                      });
                    }}
                    placeholder="0.00"
                    value={money.sell}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 3, backgroundColor: '#FFFFFF', position: 'relative' }}>
            <View
              style={{
                width: 26,
                height: 26,
                backgroundColor: '#fff',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'absolute',
                left: '50%',
                marginLeft: -13,
                top: -13,
              }}
            >
              <Icon name="swap" size={14} />
            </View>
          </View>
          <View style={{ padding: 13 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#AEAEAE', fontSize: 12 }}>卖出</Text>
              <Text style={{ color: '#5D5D5D', fontSize: 12 }}>余额：0.00</Text>
            </View>
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
              <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                  <View>
                    <Text>BTC</Text>
                    <Text
                      style={{
                        color: '#999999',
                        fontWeight: '500',
                        fontSize: 11,
                        lineHeight: 16,
                      }}
                    >
                      Bitcoin
                    </Text>
                  </View>
                  <TextInput
                    keyboardType="numeric"
                    style={{
                      // color: '#C8C8C8',
                      fontSize: 26,
                      lineHeight: 30,
                      fontWeight: 'bold',
                      minWidth: 100,
                      textAlign: 'right',
                    }}
                    // placeholderTextColor={'gray'}
                    onChangeText={(buy) => {
                      setMoney((prev) => {
                        return {
                          ...prev,
                          buy,
                        };
                      });
                    }}
                    placeholder="0.00"
                    value={money.buy}
                  />
                  {/* <Text
                  style={{
                    color: '#C8C8C8',
                    fontSize: 26,
                    lineHeight: 30,
                    fontWeight: 'bold',
                  }}
                >
                  0.00
                </Text> */}
                </View>
              </View>
            </View>
          </View>
        </View>

        <Button>兑换</Button>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            marginBottom: 14,
          }}
        >
          <Text style={{ color: '#5D5D5D', fontSize: 10 }}>1 ETH = 2084.62 USDT</Text>
          <Text style={{ color: '#48AE60', fontSize: 8 }}>+0.56%</Text>
          <Icon name={'swap'} size={8} />
        </View>
        <Button>交易</Button>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8, marginBottom: 14 }}>
          <Text style={{ color: '#2667FF', fontSize: 10 }}>* 跳转到支持交易的交易所</Text>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  // console.log(11111, theme.colors, props);
  return {};
});
export default Swap;
