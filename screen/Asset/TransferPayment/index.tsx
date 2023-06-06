import { Button, Input, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../../../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
const TransferPayment = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [text, setText] = useState<string>('');
  const handleCreateWallet = () => {
    navigation.navigate('verifyMnemonics');
  };
  return (
    <Layout>
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
          value={text}
          onChangeText={(text) => {
            const time = Date.now();
            // 复杂逻辑，输入文字不卡
            while (Date.now() - time <= 1000) {}
            setText(text);
          }}
        />
      </View>
      <View>
        <Text style={styles.title}>矿工费用</Text>
        <View style={styles.group}>
          <View style={styles.item}>
            <Text style={styles.groupTitle}>慢</Text>
            <Text style={styles.groupSubTitle}>0.00073BTC</Text>
            <Text style={styles.groupSubTitle}>$ 3.27</Text>
            <Text style={styles.time}>约60分钟</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.groupTitle}>推荐</Text>
            <Text style={styles.groupSubTitle}>0.00073BTC</Text>
            <Text style={styles.groupSubTitle}>$ 3.27</Text>
            <Text style={styles.time}>约30分钟</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.groupTitle}>快</Text>
            <Text style={styles.groupSubTitle}>0.00073BTC</Text>
            <Text style={styles.groupSubTitle}>$ 3.27</Text>
            <Text style={styles.time}>约30分钟</Text>
          </View>
          <View
            style={{
              ...styles.item,
              paddingBottom: 0,
            }}
          >
            <Text style={styles.groupTitle}>自定义</Text>
          </View>
        </View>
        <View style={styles.custom}>
          <View>
            <Text style={styles.customTitle}>Fee per byte（sat/b）</Text>
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
            <Text style={styles.customTitle}>Size（sat/b）</Text>
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
        </View>
      </View>
      <View style={styles.button}>
        <Button onPress={handleCreateWallet}>创建钱包</Button>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
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
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 25,
  },
  // container: {
  //   background: theme.colors.white,
  //   width: props.fullWidth ? '100%' : 'auto',
  // },
  // text: {
  //   color: theme.colors.primary,
  // },
});
export default TransferPayment;
