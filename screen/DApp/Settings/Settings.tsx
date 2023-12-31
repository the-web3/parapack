import IconFont from '@assets/iconfont';
import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { makeStyles, useTheme, useThemeMode } from '@rneui/themed';
import { getData, storeData } from '@common/utils/storage';
import { useTranslation } from 'react-i18next';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

export const Settings = (props: DAppProps) => {
  const { t } = useTranslation();
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
                <IconFont name={mode === 'dark' ? 'a-271' : 'hei'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>
            {t('dAppSetting.myWallet')}
          </Text>
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
              <Text style={styles.text1}>
                {t('dAppSetting.lucky')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/39.png')} />
              <Text style={styles.text1}>
                {t('dAppSetting.airdrop')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/40.png')} />
              <Text style={styles.text1}>
                {t('dAppSetting.invite')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Image style={styles.circle} source={require('@assets/images/41.png')} />
              <Text style={styles.text1}>
                {t('dAppSetting.academy')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bg}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>
                {t('settings.bindingSocialMedia')}
              </Text>
              <Text style={{ fontSize: 12, color: '#8C8C8C' }}>{t('settings.seeMore')}</Text>
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
            <Text style={styles.title}>
              {t('dAppSetting.account')}
            </Text>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-9" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.addressBook')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-10" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.cloudWallet')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-111" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.activityNotifications')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-12" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.seedBackup')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>

            <View style={[styles.item, { paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-13" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.securityAndPrivacy')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bg}>
            <Text style={styles.title}>
              {t('dAppSetting.activitiesIParticipatedIn')}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
              <Image style={{ width: 43, height: 43 }} source={require('@assets/images/2.png')} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'black', fontWeight: 'regular', fontSize: 13 }}>
                  {t('settings.BitgetContract')}
                </Text>
                <Text style={{ color: 'gray', fontSize: 11 }}>
                  {t('settings.tradeOnTheMostPopularDecentralizedPlatformInTheGalaxy')}
                </Text>
              </View>
            </View>
            <View style={[styles.item, { paddingTop: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-14" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.contactCustomerService')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={[styles.item, { paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-15" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.helpCenter')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bg}>
            <Text style={styles.title}>
              {t('dAppSetting.joinUs')}
            </Text>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-16" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.recruitAgents')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-17" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.globalCommunities')}
                </Text>
              </View>
              <TouchableOpacity>
                <AntdIcon name="right" size={14} color={theme.colors.black} />
              </TouchableOpacity>
            </View>
            <View style={[styles.item, { paddingBottom: 0 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconFont name="a-181" color={theme.colors.black} />
                <Text style={styles.text}>
                  {t('dAppSetting.jobOpportunities')}
                </Text>
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
