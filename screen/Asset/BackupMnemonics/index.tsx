import { Text } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../../../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
const BackupMnemonics = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  console.log(11111, theme.colors);
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.text}>
          {t('common.success')}
          请按顺序写下
          <Text style={styles.green}>12个单词</Text>
          并保存在安全的地方
        </Text>
        <View style={styles.card}>
          <Text>1111</Text>
        </View>
        <View style={styles.tips}>
          <View style={styles.item}>
            <Icon name="check" style={styles.icon} color={'#48AE60'} />
            <Text style={styles.iconText}>{t('asset.backup_tips_write')}</Text>
          </View>
          <View style={styles.item}>
            <Icon name="close" color={theme.colors.error} style={styles.icon} />
            <Text style={styles.iconText}>{t('asset.backup_tips_copy')}</Text>
          </View>
          <View style={styles.item}>
            <Icon name="close" color={theme.colors.error} style={styles.icon} />
            <Text style={styles.iconText}>{t('asset.backup_tips_screenshot')}</Text>
          </View>
        </View>
        <Text style={styles.text}>请勿将助记词透露给任何人 助记词一旦丢失，资产将无法恢复</Text>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
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
    width: 304,
    height: 278,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D7D7FA',
    padding: 16,
    marginTop: 18,
    marginBottom: 16,
  },
  tips: {
    // flex: 1,
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
    // textAlign:
  },
});
export default BackupMnemonics;
