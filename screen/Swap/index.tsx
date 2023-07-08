import * as React from 'react';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from '@assets/iconfont';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const Swap = (props: Props) => {
  const [active] = useState('swap');
  const [money, setMoney] = useState<{
    buy: string;
    sell: string;
  }>({
    buy: '0.00',
    sell: '0.00',
  });
  const handleSwap = () => {
    props?.navigation.navigate('startBackup');
  };
  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.tabs}>
          <Text style={active === 'swap' ? styles.activeTabsTitle : styles.tabsTitle}>兑换</Text>
          <Text style={styles.tabsTitle}>行情</Text>
          <Text style={styles.tabsTitle}>LaunchPad</Text>
        </View>
        <IconFont name="xiangqing" />
      </View>
      <View style={styles.main}>
        <View style={styles.swapCard}>
          <View>
            <View style={styles.swapCardTitle}>
              <Text style={styles.sell}>卖出</Text>
              <Text style={styles.balance}>余额：0.00</Text>
            </View>
            <View
              style={{
                ...styles.chain,
                borderBottomWidth: 1,
                borderColor: 'rgba(22, 20, 20, 0.45)',
                marginBottom: 14,
                borderStyle: 'dashed',
              }}
            >
              <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
              <View style={styles.chainRight}>
                <View>
                  <Text style={styles.chainTitle}>BTC</Text>
                  <Text style={styles.chainSubTitle}>Bitcoin</Text>
                </View>
                <TextInput
                  keyboardType="numeric"
                  style={styles.money}
                  onChangeText={(sell) => {
                    setMoney((prev) => {
                      return {
                        ...prev,
                        sell,
                      };
                    });
                  }}
                  placeholder="Enter text"
                  value={money.sell}
                />
              </View>
            </View>
          </View>

          <View style={{ height: 3, backgroundColor: '#FFFFFF', position: 'relative' }}>
            <IconFont
              name="a-Group217"
              size={30}
              style={{
                position: 'absolute',
                left: '50%',
                marginLeft: -15,
                top: -30,
              }}
            />
          </View>
          <View>
            <View style={styles.swapCardTitle}>
              <Text style={styles.sell}>买入</Text>
              <Text style={styles.balance}>余额：0.00</Text>
            </View>
            <View style={styles.chain}>
              <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
              <View style={styles.chainRight}>
                <View>
                  <Text style={styles.chainTitle}>BTC</Text>
                  <Text style={styles.chainSubTitle}>Bitcoin</Text>
                </View>
                <TextInput
                  keyboardType="numeric"
                  style={styles.money}
                  onChangeText={(sell) => {
                    setMoney((prev) => {
                      return {
                        ...prev,
                        sell,
                      };
                    });
                  }}
                  placeholder="Enter text"
                  value={money.sell}
                />
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
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  // console.log(11111, theme.colors, props);
  return {
    container: {
      flex: 1,
      backgroundColor: 'rgba(245, 245, 245, 1)',
    },
    main: {
      padding: 24,
    },
    searchBar: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical: 15,
      alignItems: 'center',
    },
    tabs: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    activeTabsTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: 'rgba(0, 0, 0, 1)',
      marginLeft: 12,
      lineHeight: 25,
    },
    tabsTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: 'rgba(153, 153, 153, 1)',
      marginLeft: 12,
      lineHeight: 25,
    },
    swapCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 20,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    swapCardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sell: {
      color: '#AEAEAE',
      fontSize: 11,
    },
    balance: {
      color: 'rgba(31, 29, 29, 1)',
      fontSize: 11,
    },
    chain: {
      flexDirection: 'row',
      alignItems: 'center',
      // borderBottomWidth: 1,
      // borderColor: '#F9F9F9',
      paddingVertical: 10,
    },
    chainRight: {
      flex: 1,
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chainTitle: {
      color: 'rgba(31, 29, 29, 1)',
      fontWeight: '600',
      fontSize: 18,
    },
    chainSubTitle: {
      color: '#999999',
      fontWeight: '500',
      fontSize: 11,
      lineHeight: 16,
    },
    money: {
      color: '#C8C8C8',
      fontSize: 26,
      lineHeight: 30,
      fontWeight: 'bold',
      textAlign: 'right',
    },
  };
});
export default Swap;
