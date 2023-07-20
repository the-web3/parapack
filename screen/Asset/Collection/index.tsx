import IconFont from '@assets/iconfont';
import ImageScreen from '@components/ImageScreen';
import { Overlay, makeStyles } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { Alert, CameraRoll } from 'react-native';
import { Clipboard, Image, Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import ViewShot from 'react-native-view-shot';

const Collection = (props) => {
  const viewShotRef = useRef(null);
  const [capture, setCapture] = useState({
    loading: false,
    url: '',
  });
  const styles = useStyles(props);
  const { navigation, route } = props;
  const captureImage = async () => {
    const url = await viewShotRef?.current?.capture();
    setCapture({
      loading: true,
      url,
    });
    console.log('Image URI:', url);
    // 可以将 URI 用于显示、保存或分享等操作
  };
  console.log(1111, capture.url);
  const handleCloseModal = async () => {
    setCapture({
      ...capture,
      loading: false,
      url: '',
    });
  };
  return (
    <>
      <StatusBar
        backgroundColor="#3B28CC" // 替换为你想要的背景颜色
        barStyle="light-content" // 替换为你想要的图标和文字颜色
      />
      <View style={styles.container}>
        <View>
          <ViewShot ref={viewShotRef}>
            <View style={styles.main}>
              <View style={{ paddingHorizontal: 52, paddingVertical: 32 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
                  <View
                    style={{ width: 40, height: 40, backgroundColor: 'rgba(249, 249, 249, 1)', marginBottom: 10 }}
                  />
                  <Text
                    style={{
                      ...styles.font,
                      fontSize: 18,
                    }}
                  >
                    LTC (Litecoin) 收款
                  </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.font}>扫描二维码，向我支付</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                  <QRCode value={props?.route?.params?.toAddr || ''} size={200} />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(249, 249, 249, 1)',
                    borderRadius: 28,
                    paddingHorizontal: 26,
                    paddingVertical: 7,
                  }}
                >
                  <Text style={styles.font}>{route?.params?.toAddr || ''}</Text>
                </View>
              </View>

              <View style={styles.bar}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    Clipboard.setString(route?.params?.toAddr || '');
                  }}
                >
                  <Text style={styles.font}>复制地址</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={captureImage}>
                  <Text style={styles.font}>分享</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ViewShot>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconFont name="a-logopeise" size={42} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 20 }}>ParaPack</Text>
        </View>
      </View>
      <Modal visible={capture.loading} transparent={true}>
        <View
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* <Image source={capture.url} style={{ width: 300, height: 300 }} resizeMode="contain" /> */}
          <ImageScreen url={capture.url} styles={{ width: 300, height: 600 }} />
          <View>
            <TouchableOpacity onPress={handleCloseModal}>
              <Icon name={'close'} size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3B28CC',
      paddingHorizontal: 20,
    },
    logo: {
      width: 200,
      height: 200,
    },
    main: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: 75,
    },
    bar: {
      flexDirection: 'row',
    },
    item: {
      flex: 1,
      paddingVertical: 15,
      backgroundColor: 'rgba(241, 241, 255)',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    font: {
      color: 'rgba(37, 37, 37, 1)',
    },
    imgContainter: {
      flex: 1,
      marginHorizontal: 14,
      marginVertical: 14,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      // width: '100%',
    },
    img: {
      flex: 1,
      width: '100%',
      height: 102,
      // aspectRatio: 1,
      // marginTop: 123,
    },
  };
});

export default Collection;