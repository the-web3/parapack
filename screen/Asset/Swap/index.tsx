import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Layout from '@components/Layout';
import SwapCom from '@components/SwapCom';
import { useTheme } from '@rneui/themed';

type Props = {
  fullWidth?: boolean;
  navigation: any;
};


const Swap = (props: Props) => {
  const theme = useTheme();


  return (
    <Layout containerStyle={{
      backgroundColor: theme.theme.colors.white
    }}>
      <View>
        <SwapCom
          pageStyle={'grey'}
          initChain={props.route?.params.selectedToken?.chain}
          initChainId={props.route?.params.selectedToken?.chainId}
        />
      </View>
    </Layout>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {};
});

export default Swap;
