import IconFont from '@assets/iconfont';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { makeStyles, useTheme, useThemeMode } from '@rneui/themed';
import { getData, storeData } from '@common/utils/storage';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

export const Settings = (props: DAppProps) => {
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const { mode, setMode } = useThemeMode();
  const styles = useStyles();
  const [currentWallet, setCurrentWallet] = useState<DeviceBalanceTokenList>();
  const onSetting = () => {
    props?.navigation.navigate('Setting', {
      wallet_uuid: currentWallet?.wallet_uuid,
    });
    // props?.navigation.navigate('settingScreen', {
    //   wallet_uuid: currentWallet?.wallet_uuid,
    // });
  };

  const changeColorTheme = () => {
    if (mode === 'dark') {
      setMode('light');
      storeData('colorTheme', 'light');
    } else {
      setMode('dark');
      storeData('colorTheme', 'dark');
    }
  };

  useEffect(() => {
    getData('wallet_uuid').then((wallet_uuid) => {
      setCurrentWallet({
        wallet_uuid,
      });
    });
  }, []);

  return (
    <ImageBackground source={require('@assets/images/centerBg.png')} style={{ flex: 10, height: 287 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View style={{ paddingHorizontal: 30, marginTop: 34 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconFont
            name="a-11"
            style={{ marginRight: 35, marginTop: 11, backgroundColor: '#F0F0FF', borderRadius: 44 }}
            size={43}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 21.5,
                width: 96,
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 19,
                alignItems: 'center',
                borderColor: '#fff',
                borderWidth: 0.5,
              }}
            >
              <TouchableOpacity onPress={() => onSetting()}>
                <IconFont name="a-261" />
              </TouchableOpacity>
              <TouchableOpacity onPress={changeColorTheme}>
                <IconFont name={mode === 'dark' ? 'a-271' : 'a-272'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>我的钱包</Text>
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <AntdIcon name="caretright" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 15,
          backgroundColor: theme.colors?.backgroundGrey,
          paddingTop: 20,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 20,
              marginBottom: 20,
              backgroundColor: theme.colors?.white,
              borderRadius: 12,
            }}
          >
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/38.png')} />
              <Text style={styles.text1}>红包</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/39.png')} />
              <Text style={styles.text1}>空投</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/40.png')} />
              <Text style={styles.text1}>邀请</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/41.png')} />
              <Text style={styles.text1}>钱包学院</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bg}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>绑定社交媒体</Text>
              <Text style={{ fontSize: 12, color: '#8C8C8C' }}>查看更多</Text>
            </View>

            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-31" />
                <Text style={styles.text}>Twitter</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="video" />
                <Text style={styles.text}>Discord</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bg}>
            <Text style={styles.title}>账户</Text>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-9" color={theme.colors.black} />
                <Text style={styles.text}>地址本</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-10" color={theme.colors.black} />
                <Text style={styles.text}>云钱包</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-111" color={theme.colors.black} />
                <Text style={styles.text}>活动通知</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-12" color={theme.colors.black} />
                <Text style={styles.text}>备份助记词</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>

            <View style={[styles.item, { paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-13" color={theme.colors.black} />
                <Text style={styles.text}>安全与隐私</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bg}>
            <Text style={styles.title}>我参与的活动</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
              <Image style={{ width: 43, height: 43 }} source={require('@assets/images/2.png')} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'black', fontWeight: 'regular', fontSize: 13 }}>Bitget合约</Text>
                <Text style={{ color: 'gray', fontSize: 11 }}>在银河系中最受欢迎的去中心化平台上交..</Text>
              </View>
            </View>
            <View style={[styles.item, { paddingTop: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-14" color={theme.colors.black} />
                <Text style={styles.text}>联系客服</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={[styles.item, { paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-15" color={theme.colors.black} />
                <Text style={styles.text}>帮助中心</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bg}>
            <Text style={styles.title}>加入我们</Text>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-16" color={theme.colors.black} />
                <Text style={styles.text}>招募代理</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-17" color={theme.colors.black} />
                <Text style={styles.text}>全球社区</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={[styles.item, { paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-181" color={theme.colors.black} />
                <Text style={styles.text}>工作机会</Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const useStyles = makeStyles((theme: any) => {
  return {
    circle: {
      backgroundColor: '#F4F4F4',
      borderRadius: 44,
      width: 49,
      height: 49,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1: {
      color: theme.colors.black,
      fontSize: 14,
      fontWeight: 400,
      marginTop: 10,
    },
    text: {
      color: theme.colors.black,
      fontSize: 14,
      fontWeight: 400,
      marginLeft: 8,
    },
    bg: {
      padding: 20,
      marginBottom: 20,
      backgroundColor: theme.colors?.white,
      borderRadius: 12,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.black,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
    },
  };
});
export default Settings;
