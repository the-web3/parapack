import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { Avatar, Button, Text, makeStyles, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from '@assets/iconfont';
import { CustomColors } from 'style/them';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const Swap = (props: Props) => {
  const styles = useStyles();
  const { theme } = useTheme();
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.tabs}>
          <Text style={active === 'swap' ? styles.activeTabsTitle : styles.tabsTitle}>兑换</Text>
          <Text style={styles.tabsTitle}>行情</Text>
          <Text style={styles.tabsTitle}>LaunchPad</Text>
        </View>
        <IconFont name="xiangqing" />
      </View>
      <ScrollView style={styles.main}>
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
                borderColor: theme.colors.grey0,
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
                  placeholder="0.00"
                  value={money.sell}
                />
              </View>
            </View>
          </View>
          <View style={{ position: 'relative' }}>
            <IconFont
              name="a-Group217"
              size={30}
              style={{
                position: 'absolute',
                left: '50%',
                marginLeft: -15,
                top: -15,
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
                  placeholder="0.00"
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
            marginBottom: 26,
          }}
        >
          <Text style={{ color: theme.colors.black, fontSize: 10 }}>1 ETH = 2084.62 USDT</Text>
          <Text style={{ color: 'rgba(22, 196, 185, 1)', fontSize: 8 }}>+0.56%</Text>
          <Icon name={'swap'} size={8} />
        </View>
        <Button>交易</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme: CustomTheme<CustomColors>) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    main: {
      padding: 24,
      flex: 1,
      backgroundColor: theme.colors?.backgroundGrey,
    },
    searchBar: {
      backgroundColor: theme.colors.white,
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
      color: theme.colors.black,
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
      backgroundColor: theme.colors.backgroundWhite,
      borderRadius: 12,
      marginBottom: 20,
      paddingHorizontal: 24,
      // paddingVertical: 12,
    },
    swapCardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    sell: {
      color: theme.colors.grey2,
      // color: '#161414',
      fontSize: 11,
    },
    balance: {
      color: theme.colors.grey0,
      // color: '#1F1D1D',
      fontSize: 11,
    },
    chain: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 35,
      paddingTop: 36,
    },
    chainRight: {
      flex: 1,
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chainTitle: {
      color: theme.colors.black,
      fontWeight: '600',
      fontSize: 18,
    },
    chainSubTitle: {
      color: theme.colors.grey4,
      fontWeight: '400',
      fontSize: 11,
      lineHeight: 16,
    },
    money: {
      color: theme.colors.grey4,
      fontSize: 26,
      lineHeight: 30,
      fontWeight: 'bold',
      textAlign: 'right',
    },
  };
});
export default Swap;
