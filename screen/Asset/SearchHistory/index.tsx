import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { SearchBar, Text, makeStyles, useTheme, useThemeMode } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import { transferRecord } from '@api/wallet';
import { getData } from '@common/utils/storage';
import moment from 'moment';
import IconFont from '@assets/iconfont';
import Empty from '@components/Empty';
import { useTranslation } from 'react-i18next';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};
const SearchHistory = (props: Props) => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const styles = useStyles(props);
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const [search, setSearch] = useState('');
  const [record, setRecord] = useState<any>({
    loading: false,
    data: {},
  });
  const getTransferRecord = useCallback(async () => {
    const [current_token_detail] = await Promise.all([getData('current_token_detail')]);
    const tokenDetail = JSON.parse(current_token_detail);
    const res = await transferRecord({
      chain: tokenDetail.chain,
      contractAddr: tokenDetail.contract_addr,
      symbol: tokenDetail.symbol,
      ownerAddr: tokenDetail.address,
      pageNum: 1,
      pageSize: 100,
    });
    if (res.data) {
      setRecord((prev: any) => {
        return {
          ...prev,
          data: res.data,
        };
      });
    }
  }, []);
  useEffect(() => {
    getTransferRecord();
  }, [getTransferRecord, props.navigation]);

  const handleSearch = (symbol: string) => {
    // getTransferRecord({ symbol });
  };

  const handleSearchDebounced = useCallback(_.debounce(handleSearch, 500), []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F6F7FC' }}>
      <StatusBar
        backgroundColor={'#F6F7FC'} // 替换为你想要的背景颜色
        barStyle={`${mode === 'light' ? 'dark' : 'light'}-content`} // 替换为你想要的图标和文字颜色
        translucent={false}
      // backgroundColor="transparent"
      />
      <View style={styles.top}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <SearchBar
            platform="ios"
            containerStyle={{
              backgroundColor: '#F6F7FC',
            }}
            inputContainerStyle={{
              height: 22,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              alignItems: 'center',
            }}
            inputStyle={{
              height: 22,
            }}
            searchIcon={<IconFont name="a-110" size={16} />}
            cancelButtonTitle={t('searchHistory.cancel') || ''}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
            loadingProps={{}}
            onChangeText={(newVal) => {
              setSearch(newVal);
              handleSearchDebounced(newVal);
            }}
            placeholder=""
            placeholderTextColor="#888"
            value={search}
          />
          <TouchableOpacity
            onPress={() => {
              props?.navigation?.goBack();
            }}
          >
            <Icon name="left" style={{ color: '#000', backgroundColor: '#F6F7FC', fontSize: 16 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView style={{ minHeight: '100%' }} showsVerticalScrollIndicator={false}>
          {record?.data?.lists?.length > 0 ? (
            record?.data?.lists?.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  // props?.navigation.navigate('coinDetail');
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
                  <View
                    style={{
                      backgroundColor: 'rgba(240, 240, 255, 1)',
                      height: 21,
                      width: 21,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon
                      name="pay-circle-o1"
                      color={'rgba(59, 40, 204, 1)'}
                      style={{ backgroundColor: 'rgba(240, 240, 255, 1)', borderRadius: 100 }}
                    />
                  </View>

                  <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                      <Text>{item.type === 0 ?
                        t('searchHistory.transferOut') :
                        t('searchHistory.transferIn')
                      }</Text>
                      <Text>{item.amount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.listPrice}>¥ {item.amount}</Text>
                      </View>
                      <View>
                        <Text style={{ color: '#999999' }}>{moment(item.ctime).format('DD.MM.YY')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Empty text={t(`common.empty`)} />
          )}
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
    assetList: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#F9F9F9',
      paddingVertical: 10,
    },
    img: {
      width: 156,
      height: 102,
      aspectRatio: 1,
      marginTop: 163,
    },
  };
});
export default SearchHistory;
