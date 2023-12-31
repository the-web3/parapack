import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { Avatar, SearchBar, Text, makeStyles, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from '@assets/iconfont';
import _ from 'lodash';
import { DeviceBalanceTokenList, getDeviceBalance } from '@api/wallet';
import { getUniqueId } from 'react-native-device-info';
import { getData, storeData } from '@common/utils/storage';
import { useTranslation } from 'react-i18next';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};
const SearchToken = (props: Props) => {
  const { t } = useTranslation();
  const styles = useStyles(props);
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const [search, setSearch] = useState('');
  const [tokenList, setTokenList] = useState<DeviceBalanceTokenList>({});
  const [alltokenList, setAllTokenList] = useState<DeviceBalanceTokenList>({});

  const initList = async (params = {}) => {
    const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
    const res = await getDeviceBalance({
      device_id,
      wallet_uuid,
    });
    if (res.data) {
      setTokenList(res.data?.token_list[0] || {});
      setAllTokenList(res.data?.token_list[0] || {});
    }
  };

  const filterList = useMemo(() => {
    return alltokenList?.wallet_balance;
  }, [alltokenList]);

  useEffect(() => {
    initList();
  }, [props.navigation]);

  const goToAsset = () => {
    props.navigation.navigate('home', {
      tab: 'asset',
    });
  };

  const handleSearch = (symbol: string) => {
    const newObj = {
      ...alltokenList,
      wallet_balance: (tokenList?.wallet_balance || []).filter((item) => {
        const regex = new RegExp(symbol, 'i');
        const isMatch = regex.test(item.symbol);
        return isMatch;
      }),
    };
    setAllTokenList(newObj);
  };

  const handleSearchDebounced = useCallback(_.debounce(handleSearch, 500), []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F6F7FC' }}>
      <StatusBar backgroundColor={'#F6F7FC'} barStyle={`dark-content`} translucent={false} />
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
            cancelButtonTitle={t('searchToken.cancel') || ''}
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
          <TouchableOpacity onPress={goToAsset}>
            <Icon name="left" style={{ color: '#000', backgroundColor: '#F6F7FC', fontSize: 16 }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={goToAsset}>
          <View style={styles.assetInfo}>
            <Text style={{ color: '#434343', fontSize: 14 }}>{t('asset.homeAssets')}</Text>
            <Icon name="right" color={'#434343'} size={14} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <ScrollView style={{ minHeight: '100%' }} showsVerticalScrollIndicator={false}>
          {(filterList || []).map((item: any, index) => (
            <TouchableOpacity
              key={`${item.symbol}${item.contract_addr}${item.address}${index}`}
              onPress={() => {
                storeData('current_token_detail', JSON.stringify(item));
                if (props?.route?.params.go) {
                  props?.navigation.navigate(props?.route?.params.go);
                } else {
                  props?.navigation.navigate('tokenDetail');
                }
              }}
            >
              <View style={styles.assetList}>
                <Avatar rounded source={{ uri: item.logo || 'https://randomuser.me/api/portraits/men/36.jpg' }} />
                <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <Text>{item.symbol}</Text>
                    <Text>{item.asset_usd}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.listPrice}>{item.chain}</Text>
                    </View>
                    <View>
                      <Text style={{ color: '#999999' }}>¥{item.asset_cny}</Text>
                    </View>
                  </View>
                </View>
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
    assetList: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#F9F9F9',
      paddingVertical: 10,
    },
  };
});
export default SearchToken;
