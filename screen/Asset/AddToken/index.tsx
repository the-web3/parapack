import * as React from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  // StyleSheet,
  View,
} from 'react-native';
import { Avatar, Button, Input, ListItem, SearchBar, Text, makeStyles } from '@rneui/themed';
import Layout from '@components/Layout';
import Icon from 'react-native-vector-icons/AntDesign';
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
const aa = [1, 2, 3, 4, 5, 6, 7];
const AddToken = (props: Props) => {
  const styles = useStyles(props);
  const [search, setSearch] = useState('');
  // const handleAddToken = () => {
  //   props?.navigation.navigate('startBackup');
  // };
  return (
    <SafeAreaView style={{ backgroundColor: '#F6F7FC' }}>
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
          <Text style={{ color: '#434343', fontSize: 14 }}>首页资产123213123</Text>
          <Icon name="right" color={'#434343'} size={14} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>热门币种</Text>
        <ScrollView style={{ minHeight: '100%' }}>
          {aa.map((item) => (
            <View
              key={item}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#F9F9F9',
                paddingVertical: 10,
              }}
            >
              <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
              <View style={{ flex: 1, marginRight: 14, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Text>BTC</Text>
                  <Text>0</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.listPrice}>¥ 195，457</Text>
                    <Text style={styles.green}>+1.93%</Text>
                  </View>
                  <View>
                    <Text style={{ color: '#999999' }}>¥0</Text>
                  </View>
                </View>
              </View>
              <Icon name="checkcircle" color={item === 1 ? '#3B28CC' : '#C8C8C8'} size={16} />
            </View>
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
  };
});
export default AddToken;
