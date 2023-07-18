import * as React from 'react';
import { useState } from 'react';
import { ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text, makeStyles } from '@rneui/themed';
import Layout from '@components/Layout';
import { rules } from '@common/utils/validation';
import Icon from 'react-native-vector-icons/AntDesign';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const CreateWallet = (props: Props) => {
  const [walletInfo, setWalletInfo] = useState<{
    wallet_name: string;
    password: string;
    confirmPassword: string;
    checked: boolean;
  }>({
    wallet_name: '',
    password: '',
    confirmPassword: '',
    checked: false,
  });
  const handleCreateWallet = () => {
    if (!walletInfo.checked) {
      return ToastAndroid.show('请同意条款', ToastAndroid.SHORT);
    }
    if (!rules.walletName.isVaild(walletInfo.wallet_name)) {
      return ToastAndroid.show(rules.walletName.message, ToastAndroid.SHORT);
    }
    if (!rules.password.isVaild(walletInfo.password)) {
      return ToastAndroid.show(rules.password.message, ToastAndroid.SHORT);
    }
    if (walletInfo.password !== walletInfo.confirmPassword) {
      return ToastAndroid.show('密码不一致', ToastAndroid.SHORT);
    }
    props?.navigation.navigate('startBackup', {
      params: {
        wallet_name: walletInfo.wallet_name,
        password: walletInfo.password,
      },
    });
  };
  const styles = useStyles(props);

  return (
    <Layout
      fixedChildren={
        <View style={styles.button}>
          <Button onPress={handleCreateWallet}>创建钱包</Button>
        </View>
      }
    >
      <View style={styles.item}>
        <Input
          label="设置身份钱包名"
          value={walletInfo.wallet_name}
          placeholder="大小写字母+数字+下划线"
          onChangeText={(wallet_name) => {
            setWalletInfo((prev) => {
              return {
                ...prev,
                wallet_name,
              };
            });
          }}
        />
      </View>
      <View style={styles.item}>
        <Input
          label="设置密码"
          secureTextEntry={true}
          value={walletInfo.password}
          placeholder="密码不少于8位,至少包含1个字母和一个数字"
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
        <Input
          label="确认密码"
          secureTextEntry={true}
          value={walletInfo.confirmPassword}
          placeholder="密码不少于8位,至少包含1个字母和一个数字"
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
              borderColor: walletInfo.checked ? '#3B28CC' : '#E2E2E2',
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
            {walletInfo.checked && <Icon name="check" size={10} color={'#3B28CC'} />}
          </View>
        </TouchableOpacity>

        <Text>
          我已阅读并同意 <Text style={styles.protocol}>《用户协议》</Text>
          以及
          <Text style={styles.protocol}>《隐私政策》</Text>
        </Text>
      </View>
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

export default CreateWallet;
