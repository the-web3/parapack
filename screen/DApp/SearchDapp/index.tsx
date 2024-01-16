import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Input, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { getDAppGroup } from '@api/dApp';
import { DAppItem } from '../Components/DAppItem';
import { useTranslation } from 'react-i18next';
import SearchInput from '@components/SearchInput';

type Props = {
  fullWidth?: boolean;
  navigation: any;
};
const SearchDapp = (props: Props) => {
  const { t } = useTranslation();
  const styles = useStyles(props);
  const [dAppData, setDAppData] = useState<Record<string, any>>({});

  const onPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', { params });
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const dAppGroupRes = await getDAppGroup({
      pageNum: 1,
      pageSize: 50,
    });
    setDAppData(dAppGroupRes?.data);
  };

  return (
    <SafeAreaView style={[styles.body]}>
      <View style={styles.searchBar}>
        <SearchInput
          onChangeText={async (search) => {
            const dAppGroupRes = await getDAppGroup({
              pageNum: 1,
              pageSize: 10,
              search,
            });
            setDAppData(dAppGroupRes?.data);
          }}
          placeholder={t('searchDapp.inputDAppWebsite') || ''}
          onCancel={() => {
            props?.navigation.navigate('home', { type: 'ecology' });
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {(dAppData?.lists || []).map((v, i) => (
          <DAppItem
            {...v}
            key={v.title + String(i)}
            contentStyles={{ paddingVertical: 14 }}
            onPress={() => onPress(v)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 4,
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: theme.colors.white,
    },
    inputContainer: {
      // marginHorizontal: 11,
      marginRight: 11,
      paddingHorizontal: 11,
      height: 36,
      minHeight: 36,
      borderRadius: 24,
      borderColor: theme.colors.grey5,
    },
    title: {
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
      backgroundColor: '#fff',
    },
  };
});
export default SearchDapp;
