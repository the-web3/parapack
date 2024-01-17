import * as React from 'react';
import { cancelApplication, getDevInfo } from '@api/dApp';
import Layout from '@components/Layout';
import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Appearance, SafeAreaView, Image } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import IconFont from '@assets/iconfont';
import { useTranslation } from 'react-i18next';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

const SubmitScreen = (props: DAppProps) => {
  const { t } = useTranslation();
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [status, setStatus] = React.useState(0);

  const onCancel = async () => {
    const [device_id] = await Promise.all([getUniqueId()]);
    cancelApplication({
      device_id,
    })
      .then((response) => {
        console.log('Cancel request sent successfully');
        props?.navigation.navigate('DeveloperApplication');
      })
      .catch((error) => {
        console.error('Error cancelling request:', error);
      });
  };
  const init = async () => {
    const [device_id] = await Promise.all([getUniqueId()]);
    const res = await getDevInfo({ device_id });
    setStatus(res.data.status);
  };
  React.useEffect(() => {
    init();
  }, []);
  return (
    <Layout
      fixedChildren={
        <View>
          {status === 2 ? (
            <Button onPress={onCancel}>{t('submit.reApply')}</Button>
          ) : status === 3 ? null : (
            <Button onPress={onCancel}>{t('submit.cancelApplication')}</Button>
          )}
        </View>
      }
    >
      <SafeAreaView>
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff', marginBottom: 10 }]}>
          {status === 2 ? (
            <>
              <View style={[styles.iconContainer, {}]}>
                <IconFont name="a-210" size={87} />
              </View>
              <Text style={[styles.fonttext, { fontSize: 18 }]}>{t('submit.materialsReject')}</Text>

              <Text style={[{ fontSize: 12 }]}>{t('submit.materialsRejectDesc')}</Text>
            </>
          ) : status === 3 ? (
            <>
              <View style={[styles.iconContainer, {}]}>
                <IconFont name="a-113" size={87} color={'#3B28CC'} />
              </View>
              <Text style={[styles.fonttext, { fontSize: 18 }]}>{t('submit.materialsSuccess')}</Text>

              <Text style={[{ fontSize: 12 }]}>{t('submit.materialsSuccessDesc')}</Text>
            </>
          ) : (
            <>
              <View style={[styles.iconContainer, {}]}>
                <Image
                  source={require('assets/images/iconfont.png')}
                  style={{ width: 85, height: 93, tintColor: 'blue' }}
                />
              </View>
              <Text style={[styles.fonttext, { fontSize: 18 }]}>
                {t('submit.materialsReview')}
                ...
              </Text>

              <Text style={[{ fontSize: 12 }]}>{t('submit.oncePassedWillNotifyByEmail')}</Text>
            </>
          )}
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    marginBottom: '10%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  fonttext: {
    fontWeight: 'bold',
  },
});

export default SubmitScreen;
