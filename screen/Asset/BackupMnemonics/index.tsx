import { Button, Text, useTheme } from '@rneui/themed';
import { makeStyles } from '@rneui/base';
import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import Layout from '../../../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { CreateMnemonic, DecodeMnemonic } from 'savourlabs-wallet-sdk/wallet';
import { executeQuery } from '@common/utils/sqlite';
import { showToast } from '@common/utils/platform';
const BackupMnemonics = (props: any) => {
  const { navigation, route } = props;
  const theme = useTheme();
  const styles = useStyles(props);
  const { t } = useTranslation();
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const handleBackupMnemonics = async () => {
    navigation.navigate('verifyMnemonics', {
      params: {
        ...route?.params?.params,
        mnemonic,
      },
    });
  };
  console.log(8888, route?.params?.params);
  const getMnemonic = async () => {
    try {
      const sqliteData = await executeQuery({
        customExec: (tx, resolve, reject) => {
          return tx.executeSql(
            `SELECT * FROM wallet WHERE wallet_uuid = ? `,
            [route?.params?.params?.wallet_uuid],
            (txObj, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                const walletData = resultSet.rows.item(0);
                resolve(walletData);
              } else {
                reject('Wallet not found.');
              }
            },
            (txObj, error) => {
              reject('Wallet Found Error.');
            }
          );
        },
      });
      if (sqliteData) {
        const mnemonic = await DecodeMnemonic({ encrytMnemonic: sqliteData?.mnemonic_code, language: 'english' });
        setMnemonic(mnemonic.split(' '));
      }
    } catch (error) {
      showToast('解析助记词时出错');
      console.error('解析助记词时出错:', error);
    }
  };

  useEffect(() => {
    getMnemonic();
  }, [props.navigation]);

  return (
    <Layout
      fixedChildren={
        <View style={styles.button}>
          <Button onPress={handleBackupMnemonics}>我已备份</Button>
        </View>
      }
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
          请按顺序写下
          <Text style={styles.green}>12个单词</Text>
          并保存在安全的地方
        </Text>
        <View style={styles.card}>
          {mnemonic.map((item, index) => (
            <View key={item} style={styles.cardItem}>
              <Text style={styles.cardIndex}>{index + 1}</Text>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tips}>
          <View style={styles.item}>
            <Icon name="check" style={styles.icon} color={'#48AE60'} />
            <Text style={styles.iconText}>{t('asset.backup_tips_write')}</Text>
          </View>
          <View style={styles.item}>
            <Icon name="close" color={theme.theme.colors.error} style={styles.icon} />
            <Text style={styles.iconText}>{t('asset.backup_tips_copy')}</Text>
          </View>
          <View style={styles.item}>
            <Icon name="close" color={theme.theme.colors.error} style={styles.icon} />
            <Text style={styles.iconText}>{t('asset.backup_tips_screenshot')}</Text>
          </View>
        </View>
        <Text style={styles.tipsBottom}>
          <Text style={{ color: theme.theme.colors.error }}>*</Text>
          {t('asset.backup_tips')}
        </Text>
      </SafeAreaView>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      color: '#6D7278',
    },
    green: {
      color: '#48AE60',
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 304,
      height: 278,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#D7D7FA',
      padding: 16,
      marginTop: 18,
      marginBottom: 16,
    },
    cardItem: {
      width: '30%',
      height: 72,
    },
    cardIndex: {
      fontSize: 10,
      color: '#BCBBC1',
      lineHeight: 14,
    },
    tips: {
      display: 'flex',
      flexDirection: 'row',
    },
    item: {
      flex: 1,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      marginRight: 5,
    },
    iconText: {
      color: '#6D7278',
      fontSize: 10,
    },
    tipsBottom: {
      textAlign: 'center',
      color: '#6D7278',
      marginTop: 32,
    },
    button: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 25,
    },
  };
});
export default BackupMnemonics;
