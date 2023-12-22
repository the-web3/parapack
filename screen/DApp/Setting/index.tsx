import { Button, Dialog, Input, ListItem, Switch } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DeviceBalanceData, deleteWallet, getDeviceBalance, updateWallet } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { showToast } from '@common/utils/platform';
import { executeQuery } from '@common/utils/sqlite';
import { getData } from '@common/utils/storage';
import { updateWalletTable } from '@common/wallet';
import BottomOverlay from '@components/BottomOverlay';
import Layout from '@components/Layout';
import ValidatePassword from '@components/ValidatePassword';
import { getUniqueId } from 'react-native-device-info';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

const Setting = (props) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [walletInfo, setWalletInfo] = useState<DeviceBalanceData>();
  const [device_id, setDeviceId] = useState('');
  const [privateDialog, setPrivate] = useState({
    visible: false,
    text: '',
  });
  const [walletNameDialog, setWalletNameDialog] = useState({
    visible: false,
    wallet_name: '',
    device_id: '',
    wallet_uuid: '',
  });
  const [validate, setValidate] = useState({
    visible: false,
    type: 'private',
  });
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [wallet_uuid, setWalletUuid] = useState('');
  const getWalletInfo = async () => {
    const [device_id, wallet_uuid] = await Promise.all([getUniqueId(), getData('wallet_uuid')]);
    setDeviceId(device_id);
    setWalletUuid(wallet_uuid);
    const res = await getDeviceBalance({
      device_id,
      wallet_uuid,
    });
    if (res.code === SUCCESS_CODE && res?.data) {
      setWalletInfo(res?.data);
      setWalletNameDialog((prev) => {
        return {
          ...prev,
          wallet_name: res?.data?.token_list?.[0]?.wallet_name || '',
          device_id,
          wallet_uuid,
        };
      });
    }
  };

  useEffect(() => {
    getWalletInfo();
  }, [props.navigation]);

  const toggleDialog = () => {
    setPrivate({
      visible: !privateDialog.visible,
      text: '',
    });
  };

  const handleEditor = async () => {
    const { visible, ...rest } = walletNameDialog;
    const res = await updateWallet(rest);
    if (res.code === SUCCESS_CODE) {
      getWalletInfo();
      setWalletNameDialog((prev) => {
        return {
          ...prev,
          visible: false,
        };
      });
      showToast('修改成功');
    }
  };
  const toggleDialogDelete = () => {
    setDeleteVisible((visible) => {
      return !visible;
    });
  };
  const toggleWalletName = () => {
    setWalletNameDialog((prev) => {
      return {
        ...prev,
        visible: !prev.visible,
      };
    });
  };

  const handleDelete = async () => {
    try {
      const res = await deleteWallet({
        device_id,
        wallet_uuid,
      });
      if (res.code === SUCCESS_CODE) {
        toggleDialogDelete();
        updateWalletTable(wallet_uuid, {
          key: 'is_del = ?',
          value: [1],
        });
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

  const toggleValidate = async () => {
    setValidate((prev) => {
      return {
        ...prev,
        visible: !prev.visible,
      };
    });
  };

  return (
    <>
      <View style={styles.container}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>语言</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#8C8C8C', textAlign: 'right', width: 90 }}>设置语言版本</Text>
            <ListItem.Chevron />
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>用户设置协议</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>隐私协议</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>关于</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 14, color: '#8C8C8C', textAlign: 'right', width: 90 }}>V7.3.4</Text>
            <ListItem.Chevron />
          </ListItem.Content>
        </ListItem>
      </View>
      <BottomOverlay visible={deleteVisible} title={'确定要删除钱包吗？'} onBackdropPress={toggleDialogDelete}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 16 }}>
          <Text>删除后，您可通过已备份的助记词重新导入钱包</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Button title="确定" onPress={handleDelete} />
        </View>
        <Button title="取消" onPress={toggleDialogDelete} type="outline" />
      </BottomOverlay>
      <ValidatePassword
        visible={validate.visible}
        onBackdropPress={toggleValidate}
        validateCorrect={() => {
          toggleValidate();
        }}
      />
      <BottomOverlay visible={walletNameDialog.visible} title={'修改钱包名称'} onBackdropPress={toggleWalletName}>
        <View style={{ marginTop: 16 }}>
          <Input
            placeholder="请输入钱包名称"
            value={walletNameDialog.wallet_name}
            onChangeText={(wallet_name) => {
              setWalletNameDialog((prev) => {
                return {
                  ...prev,
                  wallet_name,
                };
              });
            }}
          />
        </View>
        <Button onPress={handleEditor}>确定</Button>
      </BottomOverlay>
      <Dialog isVisible={privateDialog.visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="私钥" />
        <Text>{privateDialog.text}</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="复制"
            onPress={() => {
              Clipboard.setString(privateDialog?.text || '');
            }}
          />
          <Dialog.Button title="取消" onPress={toggleDialog} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 20, // to center the title
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});

export default Setting;
