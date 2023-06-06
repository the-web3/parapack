import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // 在此处可以执行一些初始化任务，例如加载数据等
    // 模拟一个延迟，然后跳转到应用的主界面
    setTimeout(() => {
      // 导航到主界面或其他页面
      navigation.navigate('创建钱包');
    }, 2000); // 2秒延迟
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 在这里放置你的开屏页的内容，例如Logo或品牌标识 */}
      {/* <Image source={require('./path/to/your/logo.png')} style={styles.logo} /> */}
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
