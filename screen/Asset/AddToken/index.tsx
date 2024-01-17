import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { Avatar, SearchBar, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { SymbolSupportDatum, Token, getSymbolSupport } from '@api/symbol';
import { deleteWallet, walletSymbols } from '@api/wallet';
import { getData } from '@common/utils/storage';
import { getUniqueId } from 'react-native-device-info';
import { SUPPORT_CHAIN_NAME, addToken } from '@common/wallet';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import IconFont from '@assets/iconfont';
import { showToast } from '@common/utils/platform';
import { SUCCESS_CODE } from '@common/constants';
import { useTranslation } from 'react-i18next';
import SearchInput from '@components/SearchInput';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};
type ListItem = Token & { chainName: string; symbol: string };
const AddToken = (props: Props) => {
  const { t } = useTranslation();
  const styles = useStyles(props);
  const [list, setList] = useState<SymbolSupportDatum[]>([]);
  const [supportList, setSupportList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [walletInfo, setWalletInfo] = useState({});

  const initList = async (params = {}) => {
    setLoading(true);
    const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
    setWalletInfo({
      device_id,
      wallet_uuid,
    });
    const [res, supportRes] = await Promise.all([getSymbolSupport(params), walletSymbols({ device_id, wallet_uuid })]);
    // console.log(11111, JSON.stringify(res), params);
    if (res.data) {
      setList(res.data);
      setSupportList(supportRes.data);
    }
    setLoading(false);
  };

  const filterList = React.useMemo(() => {
    return (
      (list || [])
        // ?.filter((item) => SUPPORT_CHAIN_NAME.includes(item.chainName))
        .reduce((total: Token[], supportChian) => {
          if (supportChian.token.length > 0) {
            const { chainName, symbol } = supportChian;
            const curTokens = supportChian.token
              // .filter((currentToken) => currentToken.tokenHot)
              .map((item) => {
                const added =
                  supportList.findIndex(
                    (addedChian: any) => addedChian.chain === chainName && addedChian.contractAddr === item.contractAddr
                  ) !== -1;
                return { ...item, chainName, symbol, added };
              });
            return [...total, ...curTokens];
          }
          return [...total];
        }, []) as ListItem[]
    );
  }, [list, supportList]);

  useEffect(() => {
    initList();
  }, [props.navigation]);

  const goToAsset = () => {
    props.navigation.navigate('home', {
      tab: 'asset',
      forceUpdate: true,
    });
  };

  const handleSearch = (symbol: string) => {
    initList({ symbol });
  };

  const handleSearchDebounced = useCallback(_.debounce(handleSearch, 1000), []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F6F7FC' }}>
      <StatusBar backgroundColor={'#F6F7FC'} barStyle={`dark-content`} />
      <Spinner visible={loading} />
      <View style={styles.top}>
        <SearchInput
          onChangeText={(newVal) => {
            handleSearchDebounced(newVal);
          }}
          placeholder={''}
          onCancel={goToAsset}
        />
        <TouchableOpacity onPress={goToAsset}>
          <View style={styles.assetInfo}>
            <Text style={{ color: '#434343', fontSize: 14 }}>{t('asset.homeAssets')}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{t('asset.popularCurrencies')}</Text>
        <ScrollView
          style={{ minHeight: '100%' }}
          contentContainerStyle={{ paddingBottom: 300 }}
          showsVerticalScrollIndicator={false}
        >
          {(filterList || []).map((item) => (
            <TouchableOpacity
              key={`${item?.chainName}_${item?.tokenName}_${item.contractAddr}`}
              onPress={async () => {
                if (item?.added) {
                  const params = {
                    ...walletInfo,
                    chain: item.chainName,
                    symbol: item.tokenName,
                    contract_addr: item.contractAddr,
                  };
                  try {
                    const res = await deleteWallet(params);
                    if (res.code === SUCCESS_CODE) {
                      showToast(t('addToken.deleteSuccessfully'), {
                        onHide: () => {
                          initList();
                        },
                      });
                    }
                  } catch (e) {
                    console.log(111111, e);
                  }
                } else {
                  setLoading(true);
                  const res = await addToken({
                    contract_addr: item.contractAddr || '',
                    symbol: item.symbol,
                    chain: item.chainName,
                    tokenName: item.tokenName,
                  }).finally(() => {
                    setLoading(false);
                  });
                  if (res) {
                    goToAsset();
                  }
                }
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
                <Avatar rounded source={{ uri: item.tokenLogo || 'https://randomuser.me/api/portraits/men/36.jpg' }} />
                <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <Text>{item.tokenName}</Text>
                    <Text>{item.amountUnit}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.listPrice}>{item.chainName}</Text>
                      {item.rose.indexOf('-') !== -1 ? (
                        <Text style={styles.red}> {item.rose}</Text>
                      ) : (
                        <Text style={styles.green}> +{item.rose}</Text>
                      )}
                    </View>
                    <View>
                      <Text style={{ color: '#999999' }}>¥{item.cnyRate}</Text>
                    </View>
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
export default AddToken;
