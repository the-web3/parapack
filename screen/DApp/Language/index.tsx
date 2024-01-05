import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { storeData } from '@common/utils/storage';
import Toast from 'react-native-root-toast';
import i18n from 'i18next';
import { getValidLan } from '@i18n/index';
import { Languages } from '@i18n/constants';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

type LanguageItemType = {
  label: string;
  value: string;
  added: boolean;
};

const Language = (props: Props) => {
  const styles = useStyles(props);
  const [languages, setLanguages] = useState<LanguageItemType[]>([
    {
      label: '中文',
      value: Languages.ZH_CN,
      added: false,
    },
    {
      label: '英文',
      value: Languages.EN_US,
      added: false,
    },
  ]);

  React.useEffect(() => {
    initLanguage();
  }, []);

  const initLanguage = async () => {
    const cacheLan = await getValidLan();
    const newList = (languages || []).map((item) => {
      if (item.value === cacheLan.replace('_', '-')) {
        return {
          ...item,
          added: true,
        };
      } else {
        return {
          ...item,
          added: false,
        };
      }
    });
    setLanguages(newList);
  };

  const switchLanguage = (item: LanguageItemType) => {
    storeData('GLOBAL_I18N_LANGUAGE', item?.value).then(() => {
      initLanguage();
    });
    Toast.show(`${item?.label}设置成功`);
    i18n.changeLanguage(item?.value.replace('_', '-'), (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key'); // -> same as i18next.t
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#F6F7FC' }}>
      <View style={styles.body}>
        <ScrollView
          style={{ minHeight: '100%' }}
          contentContainerStyle={{ paddingBottom: 300 }}
          showsVerticalScrollIndicator={false}
        >
          {(languages || []).map((item) => (
            <TouchableOpacity
              key={`${item?.value}`}
              onPress={() => {
                switchLanguage(item);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#F9F9F9',
                  paddingVertical: 10,
                }}
              >
                <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <Text>{item.label}</Text>
                  </View>
                </View>
                <Icon name="checkcircle" color={item?.added ? '#3B28CC' : '#C8C8C8'} size={16} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    top: {
      backgroundColor: '#F6F7FC',
      paddingHorizontal: 32,
    },
    title: {
      color: '#9E9E9E',
      fontSize: 14,
    },
    assetInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginVertical: 13,
    },
    body: {
      paddingHorizontal: 32,
      backgroundColor: '#fff',
      paddingVertical: 15,
    },
    listPrice: {
      color: '#999999',
      fontSize: 12,
    },
    green: {
      color: '#5BCC47',
      fontSize: 12,
    },
    red: {
      color: 'rgba(208, 31, 31, 1)',
      fontSize: 12,
    },
  };
});
export default Language;
