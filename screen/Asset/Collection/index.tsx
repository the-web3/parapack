import IconFont from '@assets/iconfont';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const Collection = ({ navigation }) => {
  const qrData = 'https://www.example.com'; // 要生成二维码的数据
  return (
    <>
      <StatusBar
        backgroundColor="#3B28CC" // 替换为你想要的背景颜色
        barStyle="light-content" // 替换为你想要的图标和文字颜色
      />
      <View style={styles.container}>
        <View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <QRCode value={qrData} size={200} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconFont name="a-logopeise" size={83} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 24 }}>ParaPack</Text>
        </View>
      </View>
    </>
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

export default Collection;
