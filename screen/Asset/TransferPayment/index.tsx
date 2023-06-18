import { Button, Input, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Layout from '../../../components/Layout';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
const FEE_TYPE = [
  {
    type: 'slow',
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
const TransferPayment = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [text, setText] = useState<string>('');
  const [money, setMoney] = useState<string>('');
  const [byte, setByte] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [activeType, setActiveType] = useState<string>('custom');
  const handleComfirm = () => {
    // navigation.navigate('verifyMnemonics');
  };
  const handleSelect = (type) => {
    setActiveType(type);
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
          <Text style={styles.overviewTitle}>BTC 余额</Text>
          <Text style={styles.money}>
            <Text style={styles.moneyStrong}>302.00 BTC</Text> ≈ $ 10.0000
          </Text>
        </View>
        <View>
          <Text style={styles.title}>收款账号</Text>
          <Input
            value={text}
            // style={styles.input}
            onChangeText={(text) => {
              const time = Date.now();
              // 复杂逻辑，输入文字不卡
              while (Date.now() - time <= 1000) {}
              setText(text);
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>转账金额</Text>
          <Input
            value={money}
            onChangeText={(money) => {
              // const time = Date.now();
              // // 复杂逻辑，输入文字不卡
              // while (Date.now() - time <= 1000) {}
              setMoney(money);
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>矿工费用</Text>
          <View style={styles.group}>
            {FEE_TYPE.map((item) => {
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
              <View>
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
              <View>
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
    backgroundColor: '#F9F9F9',
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
export default TransferPayment;
