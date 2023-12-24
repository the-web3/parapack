import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text, makeStyles } from '@rneui/themed';
import Layout from '@components/Layout';
import { rules } from '@common/utils/validation';
import Icon from 'react-native-vector-icons/AntDesign';
import { showToast } from '@common/utils/platform';
import { createImportWallet } from '@common/wallet';
import { CreateMnemonic } from 'savourlabs-wallet-sdk/wallet';
import { storeData } from '@common/utils/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const CreateWallet = (props: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
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
  const handleCreateWallet = async () => {
    if (!walletInfo.checked) {
      return showToast('请同意条款');
    }
    if (!rules.walletName.isVaild(walletInfo.wallet_name)) {
      return showToast(rules.walletName.message);
    }
    if (!rules.password.isVaild(walletInfo.password)) {
      return showToast(rules.password.message);
    }
    if (walletInfo.password !== walletInfo.confirmPassword) {
      return showToast('密码不一致');
    }
    setLoading(true);
    const mnemonic = await CreateMnemonic({
      number: 12,
      language: 'english',
    });
    console.log(11111111, mnemonic);
    const createSuccess = await createImportWallet({
      wallet_name: walletInfo.wallet_name,
      password: walletInfo.password,
      mnemonic,
    })
      .catch((e) => {
        console.log('createImportWallet', e);
      })
      .finally(() => {
        setLoading(false);
      });
    if (createSuccess && createSuccess.success) {
      storeData('wallet_uuid', createSuccess.wallet_uuid);
      props?.navigation?.navigate?.('home', { tab: 'asset' });
    }
    // props?.navigation.navigate('startBackup', {
    //   params: {
    //     wallet_name: walletInfo.wallet_name,
    //     password: walletInfo.password,
    //   },
    // });
  };
  const styles = useStyles(props);

  return (
    <Layout
      fixedChildren={
        <View style={styles.button}>
          <Button onPress={handleCreateWallet}>{t('asset.createWallet')}</Button>
        </View>
      }
    >
      <Spinner visible={loading} />
      <SafeAreaView>
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
            placeholder="不少于8位,至少包含1个字母和1个数字"
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
            placeholder="不少于8位,至少包含1个字母和1个数字"
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
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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

          <Text style={{ flexWrap: 'wrap', flex: 1 }}>
            我已阅读并同意 <Text style={styles.protocol}>《用户协议》</Text>
            以及
            <Text style={styles.protocol}>《隐私政策》</Text>
          </Text>
        </View>
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

export default CreateWallet;
