import { Button, Input, Text } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../../../components/Layout';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { getAddressBalance, symbolGas, transfer } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { getData } from '@common/utils/storage';
import Picker from 'react-native-picker-select';
const FEE_TYPE = [
  {
    type: 'low',
    title: '慢',
    subTitle: '0.00073BTC',
    price: '$ 3.27',
    time: '约60分钟',
  },
  {
    type: 'recommend',
    title: '推荐',
    subTitle: '0.00073BTC',
    price: '$ 3.27',
    time: '约30分钟',
  },
  {
    type: 'fast',
    title: '快',
    subTitle: '0.00073BTC',
    price: '$ 3.27',
    time: '约10分钟',
  },
  {
    type: 'custom',
    title: '自定义',
  },
];
const TransferPayment = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [list, setList] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any[]>([]);
  const [token, seToken] = useState<any[]>([]);
  const [form, setForm] = useState({
    fromAddr: route?.params?.address || '',
    toAddr: route?.params?.toAddr || '',
    amount: '',
    symbol: route?.params?.symbol || '',
    contractAddr: route?.params?.contractAddr || '',
    sign: route?.params?.sign || '',
    chain: route?.params?.chain || '',
  });
  const [byte, setByte] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [activeType, setActiveType] = useState<string>('recommend');
  const handleComfirm = async () => {
    const res = await transfer(form);
    // if (res.data) {
    // navigation.navigate('verifyMnemonics');
    // }
  };
  const handleSelect = (type) => {
    setActiveType(type);
  };
  const initData = async () => {
    const currentWalletInfo = await getData('currentWallet');
    setWallet(JSON.parse(currentWalletInfo));
    const { wallet_uuid, wallet_balance } = JSON.parse(currentWalletInfo);
    const { address, contract_addr } = route?.params || {};
    let token = wallet_balance.find((item) => item.address === address && item.contract_addr === contract_addr);
    if (!token) {
      token = wallet_balance[0];
    }

    seToken(token);
    const { data } = await symbolGas({
      chain: token.chain,
    });
    setList(
      FEE_TYPE.map((item) => {
        return {
          ...item,
          time: `约${data[`${item.type}Time`]}分钟`,
          price: `$ ${data[`${item.type}Usdt`]}`,
          subTitle: `${data[`${item.type}`]}${data.gasFeeSymbol}`,
        };
      })
    );

    // const device_id = await getUniqueId();
    // const res = await getAddressBalance({
    //   device_id,
    //   wallet_uuid,
    //   chain: token.chain,
    //   symbol: token.symbol,
    //   address: token.address,
    //   contract_address: contract_addr,
    // });
    // console.log(11111, res);
  };
  const initGas = async () => {
    // const { data } = await symbolGas({
    //   chain: token.chain,
    // });
    // setList(
    //   FEE_TYPE.map((item) => {
    //     return {
    //       ...item,
    //       time: `约${data[`${item.type}Time`]}分钟`,
    //       price: `$ ${data[`${item.type}Usdt`]}`,
    //       subTitle: `${data[`${item.type}`]}${data.gasFeeSymbol}`,
    //     };
    //   })
    // );
  };

  React.useEffect(() => {
    initData();
    initGas();
  }, []);
  const handleChange = (value) => {
    console.log(11111, value);
    // seToken()
  };
  return (
    <Layout
      fixedChildren={
        <View style={styles.button}>
          <Button onPress={handleComfirm}>确定</Button>
        </View>
      }
    >
      <View style={styles.layout}>
        <View style={styles.overview}>
          <Text style={styles.overviewTitle}>{token?.symbol} 余额</Text>
          <Text style={styles.money}>
            <Text style={styles.moneyStrong}>
              {token?.balance} {token?.symbol}
            </Text>
            ≈ $ {token.asset_usd}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>收款账号</Text>
          <Input
            value={form.toAddr}
            onChangeText={(toAddr) => {
              setForm((prev) => {
                return {
                  ...prev,
                  toAddr,
                };
              });
            }}
          />
        </View>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexDirection: 'row',
            }}
          >
            <View>
              <Text style={styles.title}>转账金额</Text>
            </View>
            <View>
              <Picker
                value={token?.contract_addr || ''}
                style={pickerStyles}
                placeholder={{}}
                onValueChange={handleChange}
                items={(wallet?.wallet_balance || []).map((item: any) => ({
                  label: item.symbol,
                  value: item.contract_addr,
                }))}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>{token.symbol}</Text>
                  <Icon name="caretdown" style={{ marginLeft: 8 }} />
                </View>
              </Picker>
            </View>
          </View>

          <Input
            value={form.amount}
            onChangeText={(amount) => {
              setForm((prev) => {
                return {
                  ...prev,
                  amount,
                };
              });
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>矿工费用</Text>
          <View style={styles.group}>
            {(list || []).map((item) => {
              const style =
                activeType === item.type
                  ? {
                      ...styles.item,
                      ...styles.activeItem,
                    }
                  : styles.item;
              if (item.type === 'custom') {
                return (
                  <TouchableOpacity
                    key={item.type}
                    onPress={() => {
                      handleSelect(item.type);
                    }}
                  >
                    <View
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        ...style,
                        paddingBottom: 0,
                      }}
                    >
                      <Text style={styles.groupTitle}>{item.title}</Text>
                      <Icon
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          ...styles.icon,
                          display: activeType === item.type ? 'flex' : 'none',
                        }}
                        name="check"
                      />
                    </View>
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  key={item.type}
                  onPress={() => {
                    handleSelect(item.type);
                  }}
                >
                  <View style={{ ...style }}>
                    <Text style={styles.groupTitle}>{item.title}</Text>
                    <Text style={styles.groupSubTitle}>{item.subTitle}</Text>
                    <Text style={styles.groupSubTitle}>{item.price}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                    <Icon
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        ...styles.icon,
                        display: activeType === item.type ? 'flex' : 'none',
                      }}
                      name="check"
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {activeType === 'custom' && (
            <View style={styles.custom}>
              <View style={{ flex: 1 }}>
                <Text style={styles.customTitle}>Fee per byte（sat/b）</Text>
                <Input
                  value={byte}
                  // style={styles.input}
                  onChangeText={(byte) => {
                    // const time = Date.now();
                    // 复杂逻辑，输入文字不卡
                    // while (Date.now() - time <= 1000) {}
                    setByte(byte);
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 13 }}>
                <Text style={styles.customTitle}>Size（sat/b）</Text>
                <Input
                  value={size}
                  // style={styles.input}
                  onChangeText={(size) => {
                    // const time = Date.now();
                    // 复杂逻辑，输入文字不卡
                    // while (Date.now() - time <= 1000) {}
                    setSize(size);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  layout: {
    marginBottom: 120,
  },
  overview: {
    borderRadius: 9,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 38,
  },
  overviewTitle: {
    color: '#9F9F9F',
    fontSize: 14,
  },
  money: {
    fontSize: 16,
  },
  moneyStrong: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 35,
  },
  title: {
    fontWeight: 'bold',
    // color: '#434343',
    lineHeight: 22,
    fontSize: 16,
    marginBottom: 6,
    paddingLeft: 7,
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  groupTitle: {
    textAlign: 'center',
  },
  groupSubTitle: {
    fontSize: 8,
    lineHeight: 11,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 9,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: 18,
  },
  activeItem: {
    borderColor: '#8B7FEA',
  },
  time: {
    fontSize: 8,
    color: '#9E9E9E',
    lineHeight: 11,
    paddingVertical: 4,
    backgroundColor: '#F8F8FF',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  custom: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(249, 249, 249, 1)',
    borderRadius: 9,
    paddingVertical: 13,
    paddingHorizontal: 11,
    marginTop: 10,
  },
  customTitle: {
    color: '#9E9E9E',
    fontSize: 10,
    marginBottom: 6,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 26,
    height: 16,
    backgroundColor: '#8B7FEA',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
    borderTopLeftRadius: 0, // 左上角边框半径
    borderTopRightRadius: 4, // 右上角边框半径
    borderBottomRightRadius: 0, // 右下角边框半径
    borderBottomLeftRadius: 4, // 左下角边框半径
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 0,
    height: 22,
    lineHeight: 22,
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    // color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    padding: 0,
    height: 22,
    lineHeight: 22,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    // color: 'black',
    // paddingRight: 0, // to ensure the text is never behind the icon
  },
});
export default TransferPayment;
