import { DeviceBalanceData, deleteWallet, getDeviceBalance } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { showToast } from '@common/utils/platform';
import { executeQuery } from '@common/utils/sqlite';
import { getData } from '@common/utils/storage';
import Layout from '@components/Layout';
import { Avatar, Button, Dialog, ListItem, Switch } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Clipboard } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
const SettingScreen = (props) => {
  const [walletInfo, setWalletInfo] = useState<DeviceBalanceData>();
  const [device_id, setDeviceId] = useState('');
  const [privateDialog, setPrivate] = useState({
    visible: false,
    text: '',
  });
  const [wallet_uuid, setWalletUuid] = useState('');
  const getWalletInfo = async () => {
    const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
    setDeviceId(device_id);
    setWalletUuid(wallet_uuid);
    const res = await getDeviceBalance({
      device_id,
      wallet_uuid,
    });
    console.log(111111, JSON.stringify(res));
    if (res.code === SUCCESS_CODE && res?.data) {
      setWalletInfo(res?.data);
    }
  };

  useEffect(() => {
    getWalletInfo();
  }, [props.navigation]);

  const handleDelete = async () => {
    try {
      const res = await deleteWallet({
        device_id,
        wallet_uuid,
      });
      if (res.code === SUCCESS_CODE) {
        showToast('删除成功', {
          onHide: () => {
            props?.navigation?.navigate('home', {
              tab: 'asset',
            });
          },
        });
      }
    } catch (e) {
      console.log(111111, e);
    }
  };
  const toggleDialog = () => {
    setPrivate({
      visible: !privateDialog.visible,
      text: '',
    });
  };
  return (
    <Layout
      fixedChildren={
        <View>
          <Button
            onPress={handleDelete}
            buttonStyle={{
              backgroundColor: 'rgba(244, 244, 244, 1)',
              borderRadius: 3,
              borderColor: 'rgba(208, 31, 31, 1)',
            }}
            titleStyle={{ marginHorizontal: 20, color: 'rgba(208, 31, 31, 1)' }}
          >
            删除
          </Button>
        </View>
      }
    >
      <SafeAreaView>
        <View>
          <ListItem>
            <Avatar rounded source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }} />
            <View style={{ flex: 1, marginRight: 14, marginLeft: 10, flexDirection: 'row' }}>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                  <Text>{walletInfo?.token_list[0]?.wallet_name}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 150, alignItems: 'center' }}>
                  <Text numberOfLines={1} ellipsizeMode="tail">
                    Id: {walletInfo?.token_list[0]?.wallet_uuid}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(walletInfo?.token_list[0]?.wallet_uuid || '');
                    }}
                  >
                    <Icon name="copy1" />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#F1F1F1',
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ lineHeight: 17, fontSize: 12, color: 'rgba(0, 0, 0, 1)' }}>修改</Text>
                </View>
              </View>
            </View>
          </ListItem>
        </View>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>修改钱包名</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={() => {
            executeQuery({
              customExec: (tx) => {
                tx.executeSql(
                  `
                SELECT * 
                FROM account 
                WHERE wallet_id = (
                  SELECT id
                  FROM wallet
                  WHERE wallet_uuid = ?
                )
                AND address = ?
            `,
                  [wallet_uuid, walletInfo?.token_list[0]?.wallet_balance[0]?.address],
                  (txObj, resultSet) => {
                    if (resultSet.rows.length > 0) {
                      // 获取私钥
                      const privateKey = resultSet.rows.item(0).priv_key;
                      setPrivate({
                        visible: true,
                        text: privateKey,
                      });
                      console.log('Private key:', privateKey);
                    } else {
                      console.log(
                        'No matching record found',
                        wallet_uuid,
                        walletInfo?.token_list[0]?.wallet_balance[0]?.address,
                        JSON.stringify(resultSet)
                      );
                    }
                  },
                  (txObj, error) => {
                    console.log('Error executing SQL query:', error);
                  }
                );
              },
            });
          }}
        >
          <ListItem.Content>
            <ListItem.Title>查看私钥</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        {!walletInfo?.token_list?.[0].backup && (
          <ListItem
            onPress={() => {
              props?.navigation.navigate('startBackup');
            }}
          >
            <ListItem.Content>
              <ListItem.Title>备份钱包</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>面容/指纹支付</ListItem.Title>
          </ListItem.Content>
          <Switch />
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>免密支付</ListItem.Title>
          </ListItem.Content>
          <Switch />
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>授权检测</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>节点设置</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </SafeAreaView>
      <Dialog isVisible={privateDialog.visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="私钥" />
        <Text>{privateDialog.text}</Text>
        <Button
          onPress={() => {
            Clipboard.setString(privateDialog?.text || '');
          }}
        >
          复制
        </Button>
      </Dialog>
    </Layout>
  );
};

export default SettingScreen;
