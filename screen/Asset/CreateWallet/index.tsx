import * as React from 'react';
import { useState } from 'react';
import {
  TouchableOpacity,
  // StyleSheet,
  View,
} from 'react-native';
import { Button, Input, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
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

const CreateWallet = (props: Props) => {
  const [walletInfo, setWalletInfo] = useState<{
    name: string;
    password: string;
    confirmPassword: string;
    checked: boolean;
  }>({
    name: '',
    password: '',
    confirmPassword: '',
    checked: false,
  });
  const handleCreateWallet = () => {
    props?.navigation.navigate('verifyMnemonics');
  };
  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>设置身份钱包名</Text>
        <Input
          value={walletInfo.name}
          // style={styles.input}
          onChangeText={(name) => {
            setWalletInfo((prev) => {
              return {
                ...prev,
                name,
              };
            });
          }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>设置密码</Text>
        <Input
          value={walletInfo.password}
          onChangeText={(password) => {
            setWalletInfo((prev) => {
              return {
                ...prev,
                password,
              };
            });
          }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>确认密码</Text>
        <Input
          value={walletInfo.confirmPassword}
          onChangeText={(confirmPassword) => {
            setWalletInfo((prev) => {
              return {
                ...prev,
                confirmPassword,
              };
            });
          }}
          // errorStyle={{color: 'red'}}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            setWalletInfo((prev) => {
              return {
                ...prev,
                checked: !prev.checked,
              };
            });
          }}
        >
          <View
            style={{
              borderColor: walletInfo.checked ? 'green' : '#E2E2E2',
              borderWidth: 1,
              borderRadius: 100,
              width: 14,
              height: 14,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
              overflow: 'hidden',
            }}
          >
            {walletInfo.checked && <Icon name="check" size={10} color={'green'} />}
          </View>
        </TouchableOpacity>

        <Text>
          我已阅读并同意 <Text style={styles.protocol}>《用户协议》</Text>
          以及
          <Text style={styles.protocol}>《隐私政策》</Text>
        </Text>
      </View>

      <View style={styles.button}>
        <Button onPress={handleCreateWallet}>创建钱包</Button>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  // console.log(11111, theme.colors, props);
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.white,
      height: '100%',
      paddingTop: 28,
      paddingLeft: 25,
      paddingRight: 25,
    },
    item: {
      // marginBottom: 26,
    },
    title: {
      fontWeight: 'bold',
      // color: '#434343',
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
    // container: {
    //   background: theme.colors.white,
    //   width: props.fullWidth ? '100%' : 'auto',
    // },
    // text: {
    //   color: theme.colors.primary,
    // },
    protocol: {
      color: '#4D6EF5',
    },
  };
});

export default CreateWallet;
