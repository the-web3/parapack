import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, Clipboard, View, Image } from 'react-native';
import { Button, Input, ListItem, Text, makeStyles, useTheme } from '@rneui/themed';
import Layout from '@components/Layout';

import { getUniqueId } from 'react-native-device-info';
import { getSymbolSupport } from '@api/symbol';
import { useTranslation } from 'react-i18next';
import IconFont from '@assets/iconfont';
import moment from 'moment';
import { showToast } from '@common/utils/platform';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const TransferDetails = (props: Props) => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  console.log('Layout', props?.route?.params);
  const data = props?.route?.params || {};
  return (
    <Layout
      containerStyle={{
        paddingHorizontal: 0,
      }}
    >
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingBottom: 50,
          }}
        >
          <View style={styles.container}>
            <View style={styles.container}>
              {data.logo && (
                <Image
                  source={{
                    uri: data.logo,
                  }}
                  style={{ width: 44, height: 44 }}
                />
              )}
              <Text style={styles.money}>
                {data.type === 1 ? '+' : '-'} {data.amount} {data.symbol}
              </Text>
              <Text style={styles.moneyUsdt}>-${data.amountValue}</Text>
              {/* 1:转账中，2:失败，3:成功 */}
              {data.status === 1 ? (
                <Text style={styles.status}>转账中</Text>
              ) : data.status === 2 ? (
                <Text style={styles.status}>失败</Text>
              ) : data.status === 3 ? (
                <Text style={styles.status}>成功</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>时间</Text>
            <Text style={styles.listRightTitle}> {moment(data.ctime).format('YYYY-MM-DD HH:mm:ss')}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>转出地址</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginLeft: 20,
                alignItems: 'center',
              }}
            >
              <Text style={[styles.listRightTitle, styles.addr]} numberOfLines={1} ellipsizeMode="tail">
                {data.toAddr}
              </Text>
              <IconFont
                name="fuzhi"
                size={14}
                color={'#000000'}
                onPress={() => {
                  showToast('复制成功');
                  Clipboard.setString(data.toAddr || '');
                }}
              />
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>交易ID</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                marginLeft: 20,
                alignItems: 'center',
              }}
            >
              <Text style={[styles.listRightTitle, styles.addr]} numberOfLines={1} ellipsizeMode="tail">
                {data.hash}
              </Text>
              <IconFont
                name="fuzhi"
                size={14}
                color={'#000000'}
                onPress={() => {
                  showToast('复制成功');
                  Clipboard.setString(data.hash || '');
                }}
              />
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>网络</Text>
            <View
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              {data.logo && (
                <Image
                  source={{
                    uri: data.logo,
                  }}
                  style={{ width: 16, height: 16, marginRight: 10 }}
                />
              )}
              <Text style={styles.listRightTitle}> {data.chainName}</Text>
            </View>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>矿工费</Text>
            <Text style={styles.listRightTitle}>
              {data.gasFee} {data.gasFeeSymbol}
            </Text>
          </View>
          {/* <View
            style={{
              height: 5,
              backgroundColor: '#F3F4F5',
            }}
          />
          <View style={styles.list}>
            <Text style={styles.listTitle}>区块链浏览器</Text>
            <Text style={styles.listRightTitle}>{'>'}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>授权检测</Text>
            <Text style={styles.listRightTitle}>{'>'}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>合约检测</Text>
            <Text style={styles.listRightTitle}>{'>'}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>兑换</Text>
            <Text style={styles.listRightTitle}>{'>'}</Text>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 25,
    },
    icon: { marginRight: 35, marginTop: 11, backgroundColor: '#F0F0FF', borderRadius: 44 },
    list: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      borderBottomColor: '#F7F7F7',
      borderBottomWidth: 1,
      marginHorizontal: 25,
    },
    addr: {
      // maxWidth: '50%',
      flex: 1,
    },
    listTitle: {
      color: '#AAAAAA',
      fontSize: 14,
    },
    listRightTitle: { fontSize: 14 },
    money: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      marginTop: 10,
      fontSize: 24,
      fontWeight: 500,
      color: '#333333',
      lineHeight: 24,
    },
    moneyUsdt: {
      fontWeight: 500,
      color: '#AAAAAA',
      fontSize: 12,
      lineHeight: 12,
      marginTop: 5,
    },
    status: {
      fontWeight: 500,
      color: '#28CC64',
      fontSize: 14,
      lineHeight: 14,
      marginTop: 15,
    },
  };
});

export default TransferDetails;
