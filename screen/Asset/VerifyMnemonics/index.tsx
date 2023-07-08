import { Button, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { ToastAndroid, View } from 'react-native';
import { makeStyles } from '@rneui/base';
import Layout from '../../../components/Layout';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
const VerifyMnemonics = (props: Record<string, any>) => {
  const theme = useTheme();
  const styles = useStyles(theme.theme);
  const { navigation, route } = props;
  const { t } = useTranslation();
  console.log(9999, route);
  const [mnemonics] = useState(route?.params?.mnemonics || []);
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
    // const numbers: {
    //   label: string;
    //   value: string;
    //   key: number;
    // }[] = [];

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

  useEffect(() => {
    setSelectMnemonics(generateRandomNumbers());
  }, []);
  const selectValue = useMemo(() => {
    return (selectMnemonics || []).map((item) => item.value);
  }, [selectMnemonics]);

  const handleVerifyMnemonics = () => {
    for (let i = 0; i < selectMnemonics.length; i++) {
      const { key, value } = selectMnemonics[i];
      if (!value || mnemonics[key] !== value) {
        return ToastAndroid.show('助记词顺序有误', ToastAndroid.SHORT);
      }
    }
    // TODO: 助记词存sqlite
    navigation?.navigate?.('home', { tab: 'asset' });
  };

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
          <Button
            onPress={handleVerifyMnemonics}
            // buttonStyle={{
            //   backgroundColor: '#8B7FEA',
            //   marginTop: 12,
            // }}
          >
            确认
          </Button>
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
            <Text
              key={item}
              style={{
                ...styles.cardItem,
                ...(selectValue.includes(item) ? styles.selectCardItem : {}),
              }}
              onPress={() => {
                handleSelect(item, !selectValue.includes(item));
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      </View>
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
