import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text, makeStyles } from '@rneui/themed';
import Layout from '@components/Layout';
import { rules } from '@common/utils/validation';
import Icon from 'react-native-vector-icons/AntDesign';
import { showToast } from '@common/utils/platform';
import { createTest, getTableInfo } from '@common/wallet';
import { CreateMnemonic, DecodeMnemonic, EncodeMnemonic } from 'savourlabs-wallet-sdk/wallet';
import { storeData } from '@common/utils/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { executeQuery } from '@common/utils/sqlite';
import { getUniqueId } from 'react-native-device-info';
import { getSymbolSupport } from '@api/symbol';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const Test = (props: Props) => {
  const [uniqueId, setUniqueId] = useState('');
  const [encodeMnemonic, setEncodeMnemonic] = useState('');
  const [symbolSupport, setSymbolSupport] = useState('');
  return (
    <Layout>
      <SafeAreaView>
        <ScrollView>
          <Button
            onPress={async () => {
              try {
                const aa = await getUniqueId();
                setUniqueId(JSON.stringify(aa));
              } catch (error) {
                setUniqueId(`error getUniqueId=====>${JSON.stringify(error)}`);
              }
            }}
          >
            getUniqueId
          </Button>
          <Text>{uniqueId}</Text>
          <Button
            onPress={async () => {
              try {
                const aa = await EncodeMnemonic({
                  mnemonic: 'indoor industry avoid little sweet month elegant tackle autumn mass vault forum',
                  language: 'english',
                });
                setEncodeMnemonic(JSON.stringify(aa));
              } catch (error) {
                setEncodeMnemonic(`error EncodeMnemonic=====>${JSON.stringify(error)}`);
              }
            }}
          >
            encodeMnemonic
          </Button>
          <Text>{encodeMnemonic}</Text>
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
          <Text>{symbolSupport}</Text>
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
