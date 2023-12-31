import * as React from 'react';
import Layout from '@components/Layout';
import { Button, Image, Text } from '@rneui/themed';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const StartBackup = ({ navigation, route }: any) => {
  const { t } = useTranslation();
  const handleStartBackup = () => {
    navigation.navigate('backupMnemonics');
  };
  return (
    <Layout
      fixedChildren={
        <View style={styles.button}>
          <Button onPress={handleStartBackup}>
            {t('startBackup.startBackup')}
          </Button>
        </View>
      }
    >
      <SafeAreaView>
        <View style={styles.item}>
          <View>
            <Image
              // source={BASE_URI}
              source={require('@assets/images/empty.png')}
              style={styles.img}
              // containerStyle={styles.item}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.text}>{
              t('startBackup.ifYourMobileIsLostOrDamaged')
            }</Text>
            <Text style={styles.text}>
              {t('startBackup.paperPasswordIsYourOnlyWayToRetrieveTheWallet')}
            </Text>
            <Text style={styles.text2}>
              {t('startBackup.forSafetyDoNotTakeAScreenshot')}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 138,
    height: 180,
    aspectRatio: 1,
    marginBottom: 112,
  },
  text: {
    textAlign: 'center',
    color: '#6D7278',
  },
  text2: {
    textAlign: 'center',
    color: '#6D7278',
    marginTop: 30,
  },
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 25,
  },
});

export default StartBackup;
