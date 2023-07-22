import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Avatar, SearchBar, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import { SymbolSupportDatum, Token, getSymbolSupport } from '@api/symbol';
import { DeviceBalanceTokenList, addSymbolToken } from '@api/wallet';
import { getData } from '@common/utils/storage';
import { getUniqueId } from 'react-native-device-info';
import { addToken } from '@common/wallet';
import Spinner from 'react-native-loading-spinner-overlay';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from './types';
// type ScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'ScreenName'
// >;
type Props = {
  fullWidth?: boolean;
  navigation: any;
};
type ListItem = Token & { chainName: string; symbol: string };
const AddToken = (props: Props) => {
  const styles = useStyles(props);
  const [search, setSearch] = useState('');
  const [list, setList] = useState<SymbolSupportDatum[]>([]);
  const [selectToken, setSelectToken] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleAddToken = () => {
  //   props?.navigation.navigate('startBackup');
  // };
  const initList = async () => {
    const res = await getSymbolSupport({});
    if (res.data) {
      setList(res.data);
    }
  };

  const filterList = React.useMemo(() => {
    return (list || [])
      ?.filter((item) => item.hot)
      .reduce((total: Token[], supportChian) => {
        if (supportChian.token.length > 0) {
          const { chainName, symbol } = supportChian;
          const curTokens = supportChian.token
            .filter((currentToken) => currentToken.tokenHot)
            .map((item) => ({ ...item, chainName, symbol }));
          return [...total, ...curTokens];
        }
        return [...total];
      }, []) as ListItem[];
  }, [list]);

  React.useEffect(() => {
    initList();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: '#F6F7FC' }}>
      <Spinner visible={loading} />
      <View style={styles.top}>
        {/* <SearchBar placeholder="Type Here..." platform="ios" round onChangeText={updateSearch} value={search} /> */}
        <SearchBar
          platform="ios"
          containerStyle={{
            backgroundColor: '#F6F7FC',
          }}
          inputContainerStyle={{}}
          inputStyle={{}}
          leftIconContainerStyle={{}}
          rightIconContainerStyle={{}}
          loadingProps={{}}
          onChangeText={(newVal) => setSearch(newVal)}
          // onClearText={() => console.log(onClearText())}
          placeholder="Type query here..."
          placeholderTextColor="#888"
          // round
          // cancelButtonTitle="取消"
          // cancelButtonProps={{}}
          // onCancel={() => console.log(onCancel())}
          value={search}
        />
        <View style={styles.assetInfo}>
          <Text style={{ color: '#434343', fontSize: 14 }}>首页资产</Text>
          <Icon name="right" color={'#434343'} size={14} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>热门币种</Text>
        <ScrollView style={{ minHeight: '100%' }}>
          {(filterList || []).map((item) => (
            <TouchableOpacity
              key={`${item?.symbol}_${item.contractAddr}`}
              onPress={async () => {
                setSelectToken(`${item?.symbol}_${item.contractAddr}`);
                setLoading(true);
                const res = await addToken({
                  contract_addr: item.contractAddr || '',
                  symbol: item.symbol,
                  chain: item.chainName,
                }).finally(() => {
                  setLoading(false);
                });
                if (res) {
                  props.navigation.goBack();
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
                      <Text style={styles.listPrice}>$ {item.usdtRate}</Text>
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
                <Icon
                  name="checkcircle"
                  color={selectToken === `${item?.symbol}_${item.contractAddr}` ? '#3B28CC' : '#C8C8C8'}
                  size={16}
                />
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
