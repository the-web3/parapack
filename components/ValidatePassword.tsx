import * as React from 'react';
import type { FC } from 'react';
import { Button, Input } from '@rneui/themed';
import { View } from 'react-native';
import { useState } from 'react';
import BottomOverlay from '@components/BottomOverlay';
import { executeQuery } from '@common/utils/sqlite';
import { getData } from '@common/utils/storage';
import { getTableInfo } from '@common/wallet';

type Props = {
  visible: boolean;
  onBackdropPress?: () => void;
  validateCorrect: () => void;
};

const ValidatePassword: FC<Props> = ({ visible, onBackdropPress, validateCorrect }) => {
  const [password, setPassword] = useState('');
  const handleValidate = async () => {
    const [wallet_uuid] = await Promise.all([getData('wallet_uuid')]);
    const sqliteData = await executeQuery({
      customExec: (tx, resolve, reject) => {
        return tx.executeSql(
          `SELECT * FROM wallet WHERE wallet_uuid = ?`,
          [wallet_uuid],
          (txObj, resultSet) => {
            console.log(111111, JSON.stringify(txObj), JSON.stringify(resultSet));
            if (resultSet.rows.length > 0) {
              const walletData = resultSet.rows.item(0);
              resolve(walletData);
            } else {
              reject('Wallet not found.');
            }
          },
          (txObj, error) => {
            reject('Wallet Found Error.');
          }
        );
      },
    });
    if (sqliteData) {
      if (sqliteData?.[0]?.password === password) {
        validateCorrect();
      }
    }
  };

  return (
    <BottomOverlay visible={visible} title={'验证密码'} onBackdropPress={onBackdropPress}>
      <View style={{ marginTop: 16 }}>
        <Input
          placeholder="输入钱包密码"
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />
      </View>
      <Button onPress={handleValidate}>确定</Button>
    </BottomOverlay>
  );
};

export default ValidatePassword;
