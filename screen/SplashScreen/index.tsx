import IconFont from '@assets/iconfont';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 在此处可以执行一些初始化任务，例如加载数据等
    // 模拟一个延迟，然后跳转到应用的主界面
    setTimeout(() => {
      // 导航到主界面或其他页面
      // navigation.navigate('createWallet');
      navigation.navigate('Guide');
    }, 2000); // 2秒延迟
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconFont name="a-logopeise" size={83} color="#fff" />
        <Text style={{ color: '#fff', fontSize: 24 }}>ParaPack</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B28CC',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
