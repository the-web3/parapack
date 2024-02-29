import IconFont from '@assets/iconfont';
import { getData } from '@common/utils/storage';
import ImageScreen from '@components/ImageScreen';
import { makeStyles } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, CameraRoll } from 'react-native';
import { Clipboard, Image, Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import ViewShot from 'react-native-view-shot';
import { useTranslation } from 'react-i18next';

const Collection = (props) => {
  const viewShotRef = useRef(null);
  const { t } = useTranslation();
  const [capture, setCapture] = useState({
    loading: false,
    url: '',
  });
  const [tokenDetail, setTokenDetail] = useState<any>({});
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
  const handleCloseModal = async () => {
    setCapture({
      ...capture,
      loading: false,
      url: '',
    });
  };
  const init = async () => {
    const res = await getData('current_token_detail');
    setTokenDetail(JSON.parse(res));
  };
  useEffect(() => {
    init();
  }, [props.navigation]);
  console.log(11111, tokenDetail);
  return (
    <>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <View style={styles.container}>
        <View>
          <ViewShot ref={viewShotRef}>
            <View style={styles.main}>
              <View style={{ paddingHorizontal: 52, paddingVertical: 32 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ width: 40, height: 40, backgroundColor: 'rgba(249, 249, 249, 1)', marginBottom: 10 }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 10 }} source={{ uri: tokenDetail?.logo }} />
                  </View>
                  <Text
                    style={{
                      ...styles.font,
                      fontSize: 18,
                    }}
                  >
                    {tokenDetail?.symbol} ({tokenDetail?.chain}) {t('collection.receipt')}
                  </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.font}>{t('collection.scanQRPayment')}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                  {tokenDetail?.address && <QRCode value={tokenDetail?.address || ''} size={200} />}
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
                  <Text style={styles.font}>{tokenDetail?.address || ''}</Text>
                </View>
              </View>

              <View style={styles.bar}>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    Clipboard.setString(tokenDetail?.address || '');
                  }}
                >
                  <Text style={styles.font}>{t('collection.copyAddress')}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.item} onPress={captureImage}>
                  <Text style={styles.font}>{t('collection.share')}</Text>
                </TouchableOpacity> */}
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
              <Icon name={'closecircleo'} size={16} style={{ color: '#fff', fontSize: 18 }} />
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
