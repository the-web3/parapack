import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, makeStyles } from '@rneui/themed';
import { showToast } from '@common/utils/platform';
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

const Guide = (props: Props) => {
  const createNewWallet = () => {
    props?.navigation.navigate('createWallet');
  };
  const handleImportWallet = () => {
    props?.navigation.navigate('importWallet');
  };
  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          onPress={createNewWallet}
          title={
            <View>
              <Text style={{ color: '#fff', textAlign: 'center' }}>创建新钱包</Text>
              <Text style={{ color: '#fff', fontSize: 10, textAlign: 'center', marginTop: 8 }}>第一次使用</Text>
            </View>
          }
          titleStyle={{ color: 'white', flexDirection: 'column' }}
        />
        <Button
          onPress={handleImportWallet}
          buttonStyle={{
            backgroundColor: '#F1F1FF',
            marginTop: 12,
          }}
          title={
            <View>
              <Text style={{ textAlign: 'center' }}>导入钱包</Text>
              <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 8 }}>将已有钱包导入</Text>
            </View>
          }
          titleStyle={{ color: 'white', flexDirection: 'column' }}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.white,
      height: '100%',
      paddingTop: 28,
      paddingLeft: 25,
      paddingRight: 25,
    },
    button: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 25,
    },
    protocol: {
      color: '#4D6EF5',
    },
    logo: {
      backgroundColor: '#AEAEAE',
      height: 180,
      width: 180,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
    },
  };
});

export default Guide;
