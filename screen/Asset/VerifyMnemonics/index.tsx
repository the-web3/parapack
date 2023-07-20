import { Button, Overlay, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { ActivityIndicator, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { makeStyles } from '@rneui/base';
import Layout from '../../../components/Layout';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createImportWallet } from '@common/wallet';
const VerifyMnemonics = (props: Record<string, any>) => {
  const theme = useTheme();
  const styles = useStyles(theme.theme);
  const { navigation, route } = props;
  const { t } = useTranslation();
  const [walletInfo] = useState(route?.params?.params);
  const [loading, setLoading] = useState(false);

  const shuffle = useCallback((arr: string[]) => {
    const array = [...arr];
    let len = array.length;
    for (let i = len - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, []);
  const mnemonics = useMemo(() => {
    console.log('mnemonics', walletInfo.mnemonic);
    return shuffle(walletInfo.mnemonic);
  }, [shuffle, walletInfo.mnemonic]);

  const [selectMnemonics, setSelectMnemonics] = useState([
    {
      label: '第8个',
      value: '',
      key: 7,
    },
    {
      label: '第11个',
      value: '',
      key: 10,
    },
    {
      label: '第4个',
      value: '',
      key: 3,
    },
  ]);

  const generateRandomNumbers = () => {
    const numbers: number[] = [];

    while (numbers.length < 3) {
      const randomNumber = Math.floor(Math.random() * 12); // 生成 0 到 11 之间的随机数
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    return numbers.map((key) => ({
      label: `第${key + 1}个`,
      value: '',
      key,
    }));
  };

  const selectValue = useMemo(() => {
    return (selectMnemonics || []).map((item) => item.value);
  }, [selectMnemonics]);

  const handleVerifyMnemonics = async () => {
    const originMnemonics = walletInfo.mnemonic;
    for (let i = 0; i < selectMnemonics.length; i++) {
      const { key, value } = selectMnemonics[i];
      if (!value || originMnemonics[key] !== value) {
        return ToastAndroid.show('助记词顺序有误', ToastAndroid.SHORT);
      }
    }
    // TODO: 助记词存sqlite
    setLoading(true);
    const createSuccess = await createImportWallet({
      ...walletInfo,
      mnemonic: walletInfo.mnemonic.join(' '),
    })
      .catch((e) => {
        console.log(111111, e);
      })
      .finally(() => {
        setLoading(false);
      });
    if (createSuccess) {
      navigation?.navigate?.('home', { tab: 'asset' });
    }
  };
  useEffect(() => {
    setSelectMnemonics(generateRandomNumbers());
  }, []);

  const handleSelect = (selectValue: string, checked: boolean) => {
    setSelectMnemonics((prev) => {
      let change = false;
      const _selectMnemonics = prev.map((item) => {
        if (checked) {
          if (item.value === '' && !change) {
            change = true;
            return {
              ...item,
              value: selectValue,
            };
          }
        } else {
          if (item.value === selectValue && !change) {
            change = true;
            return {
              ...item,
              value: '',
            };
          }
        }
        return {
          ...item,
        };
      });
      return [..._selectMnemonics];
    });
  };

  return (
    <Layout
      fixedChildren={
        <View style={styles.button}>
          <Button onPress={handleVerifyMnemonics}>确认</Button>
        </View>
      }
    >
      <View style={styles.container}>
        <Text>{t('asset.backup_verify_tips')}</Text>
        <View style={styles.fillCard}>
          {selectMnemonics.map((item) => (
            <View key={item.key} style={styles.fillCardItem}>
              <Text style={styles.fillCardTop}>{item.label}</Text>
              <Text style={styles.fillCardBottom}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          {mnemonics.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={{
                ...styles.cardItem,
                ...(selectValue.includes(item) ? styles.selectCardItem : {}),
              }}
              onPress={() => {
                handleSelect(item, !selectValue.includes(item));
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Overlay isVisible={loading} overlayStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </Overlay>
    </Layout>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    text: {
      textAlign: 'center',
      color: '#6D7278',
    },
    green: {
      color: '#48AE60',
    },
    fillCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 36,
    },
    fillCardItem: {
      marginRight: 8,
      width: '30%',
    },
    fillCardTop: {
      color: '#8B7FEA',
      textAlign: 'center',
      fontSize: 12,
      marginBottom: 8,
    },
    fillCardBottom: {
      paddingVertical: 12,
      // backgroundColor: '#F8F8FF',
      borderRadius: 8,
      borderColor: '#D7D7FA',
      borderWidth: 1,
      textAlign: 'center',
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 16,
      backgroundColor: '#F9F9F9',
      paddingVertical: 26,
      paddingHorizontal: 20,
      marginTop: 36,
      marginBottom: 16,
    },
    selectCardItem: {
      backgroundColor: '#8B7FEA',
      color: '#fff',
    },
    cardItem: {
      width: '30%',
      // height: 72,
      // backgroundColor: theme.colors.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#E2E2E2',
      paddingVertical: 9,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      overflow: 'hidden',
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
export default VerifyMnemonics;
