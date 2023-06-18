import { Button, Input, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../../../components/Layout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
const TransferPayment = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [mnemonics, setMnemonics] = useState([
    'awkward',
    'awkward1',
    'awkward2',
    'awkward3',
    'awkward4',
    'awkward5',
    'awkward6',
    'awkward7',
    'awkward8',
    'awkward9',
    'awkward0',
    'awkward11',
  ]);
  const [selectMnemonics, setSelectMnemonics] = useState([
    {
      label: '第8个',
      value: 'awkward',
    },
    {
      label: '第11个',
      value: '',
    },
    {
      label: '第4个',
      value: '',
    },
  ]);
  const selectValue = useMemo(() => {
    return (selectMnemonics || []).map((item) => item.value);
  }, [selectMnemonics]);

  const handleTransferPayment = () => {
    navigation.navigate('asset');
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
            onPress={handleTransferPayment}
            buttonStyle={{
              backgroundColor: '#8B7FEA',
              marginTop: 12,
            }}
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
            <View style={styles.fillCardItem}>
              <Text style={styles.fillCardTop}>{item.label}</Text>
              <Text style={styles.fillCardBottom}>{item.value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.card}>
          {mnemonics.map((item, index) => (
            <Text
              key={index}
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
const styles = StyleSheet.create({
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
    backgroundColor: '#F8F8FF',
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
    backgroundColor: '#FFFFFF',
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
});
export default TransferPayment;
