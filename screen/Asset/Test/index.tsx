import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Clipboard } from 'react-native';
import { Button, Input, Text, makeStyles } from '@rneui/themed';
import Layout from '@components/Layout';
import { rules } from '@common/utils/validation';
import Icon from 'react-native-vector-icons/AntDesign';
import { showToast } from '@common/utils/platform';
import { createTest, getTableInfo } from '@common/wallet';
import { CreateMnemonic, DecodeMnemonic, EncodeMnemonic } from 'savourlabs-wallet-sdk/wallet';
import { getData, storeData } from '@common/utils/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { executeQuery } from '@common/utils/sqlite';
import { getUniqueId } from 'react-native-device-info';
import { getSymbolSupport } from '@api/symbol';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const Test = (props: Props) => {
  const [walletUuid, setWalletUuid] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [encodeMnemonic, setEncodeMnemonic] = useState('');
  const [symbolSupport, setSymbolSupport] = useState('');
  return (
    <Layout>
      <SafeAreaView>
        <ScrollView>
          <Button
            onPress={async () => {
              props?.navigation?.navigate('guide');
            }}
          >
            创建钱包
          </Button>
          <Input
            label="wallet_uuid"
            value={walletUuid}
            onChangeText={(wallet_uuid) => {
              setWalletUuid(wallet_uuid);
            }}
          />
          <Button
            onPress={async () => {
              try {
                const aa = await getData('wallet_uuid');
                setWalletUuid(JSON.stringify(aa));
                Clipboard.setString(JSON.stringify(aa) || '');
              } catch (error) {
                setUniqueId(`error getUniqueId=====>${JSON.stringify(error)}`);
              }
            }}
          >
            wallet_uuid
          </Button>
          <Input
            label="uniqueId"
            value={uniqueId}
            onChangeText={(aa) => {
              setUniqueId(aa);
            }}
          />
          <Button
            onPress={async () => {
              try {
                const aa = await getUniqueId();
                setUniqueId(JSON.stringify(aa));
                Clipboard.setString(JSON.stringify(aa) || '');
              } catch (error) {
                setUniqueId(`error getUniqueId=====>${JSON.stringify(error)}`);
              }
            }}
          >
            device_id
          </Button>
          <Input
            label="encodeMnemonic"
            value={encodeMnemonic}
            onChangeText={(aa) => {
              setEncodeMnemonic(aa);
            }}
          />
          <Button
            onPress={async () => {
              try {
                const aa = await EncodeMnemonic({
                  mnemonic: 'indoor industry avoid little sweet month elegant tackle autumn mass vault forum',
                  language: 'english',
                });
                Clipboard.setString(JSON.stringify(aa) || '');
                setEncodeMnemonic(JSON.stringify(aa));
              } catch (error) {
                setEncodeMnemonic(`error EncodeMnemonic=====>${JSON.stringify(error)}`);
              }
            }}
          >
            encodeMnemonic
          </Button>

          <Button
            onPress={async () => {
              try {
                Clipboard.setString(JSON.stringify('0x40b7e4d201d1d7230c4dc89728d23157c786f6da') || '');
              } catch (error) {
                setUniqueId(`error getUniqueId=====>${JSON.stringify(error)}`);
              }
            }}
          >
            0x40b7e4d201d1d7230c4dc89728d23157c786f6da
          </Button>
          <Text>{symbolSupport}</Text>
          <Button
            onPress={async () => {
              try {
                const aa = await getSymbolSupport({});
                setSymbolSupport(`getSymbolSupport=====>${JSON.stringify(aa)}`);
              } catch (error) {
                setSymbolSupport(`error getSymbolSupport=====>${JSON.stringify(error)}`);
              }
            }}
          >
            getSymbolSupport
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};
const useStyles = makeStyles((theme, props: Props) => {
  return {
    item: {},
    title: {
      fontWeight: 'bold',
      lineHeight: 22,
      fontSize: 16,
      marginBottom: 6,
      paddingLeft: 7,
    },
    button: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 25,
    },
    protocol: {
      color: '#4D6EF5',
    },
  };
});

export default Test;
