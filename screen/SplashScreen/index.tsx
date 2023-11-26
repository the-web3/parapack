import IconFont from '@assets/iconfont';
import React, { useEffect } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 在此处可以执行一些初始化任务，例如加载数据等
    // 模拟一个延迟，然后跳转到应用的主界面
    setTimeout(() => {
      // 导航到主界面或其他页面
      // navigation.navigate('createWallet');
      // navigation.navigate('asset', {
      //   wallet_uuid: 'c11b420e-50e3-4723-8d0f-0cb3dca8849f',
      // });
      // navigation.navigate('addToken');
      // navigation.navigate('importWallet');
      navigation.navigate('home', {
        // tab: 'asset',
        tab: 'ecology',
        // wallet_uuid: 'c11b420e-50e3-4723-8d0f-0cb3dca8849f',
      });
      // navigation.navigate('transferPayment', {
      //   // address: '0x41Ff20F867e14BDe24c971407a3A773cF661C834',
      //   // contract_addr: '',
      //   // chain: 'Ethereum',
      //   // index: 0,
      //   // network: 'mainnet',
      //   // symbol: 'ETH',
      //   // wallet_uuid: '350c287c-ed96-4c3e-933a-3bddf597815f',
      // });
      // navigation.navigate('collection', {
      //   toAddr: '0xbF31a6ec96851d90772529015ABb4E98eABD7fa2',
      // });
      // navigation.navigate('verifyMnemonics', {
      //   params: {
      //     wallet_name: 'Amy_123',
      //     password: '1234567a',
      //     mnemonic: 'indoor industry avoid little sweet month elegant tackle autumn mass vault forum',
      //   },
      // });
      // navigation.navigate('tokenDetail', {
      //   // address: '0xbF31a6ec96851d90772529015ABb4E98eABD7fa2',
      //   // chain: 'Ethereum',
      //   // contract_addr: '',
      //   // index: 0,
      //   // network: 'mainnet',
      //   // symbol: 'ETH',
      //   // wallet_uuid: 'c11b420e-50e3-4723-8d0f-0cb3dca8849f',
      // });
      // navigation.navigate('searchHistory');
    }, 2000); // 2秒延迟
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={require('@assets/images/bg.png')} style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconFont name="a-logopeise" size={83} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 24 }}>ParaPack</Text>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B28CC',
    height: '100%',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
