import * as React from 'react';
import {useState} from 'react';
import {
  // StyleSheet,
  View,
} from 'react-native';
// import {Button, RadioButton, Text, TextInput} from 'react-native-paper';
import {Button, Input, Text, makeStyles} from '@rneui/themed';
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

const CreateWallet = (props: Props) => {
  const [text, setText] = useState<string>('');
  const handleCreateWallet = () => {
    props?.navigation.navigate('开始备份');
  };
  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.title}>设置身份钱包名</Text>
        <Input
          value={text}
          // style={styles.input}
          onChangeText={text => {
            const time = Date.now();
            // 复杂逻辑，输入文字不卡
            while (Date.now() - time <= 1000) {}
            setText(text);
          }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>设置密码</Text>
        <Input
          value={text}
          onChangeText={text => {
            const time = Date.now();
            // 复杂逻辑，输入文字不卡
            while (Date.now() - time <= 1000) {}
            setText(text);
          }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>确认密码</Text>
        <Input
          // style={styles.input}
          value={text}
          onChangeText={text => {
            const time = Date.now();
            // 复杂逻辑，输入文字不卡
            while (Date.now() - time <= 1000) {}
            setText(text);
          }}
          // errorStyle={{color: 'red'}}
          // errorMessage="ENTER A VALID ERROR HERE"
        />
      </View>
      <Text>
        我已阅读并同意 <Text style={styles.protocol}>《用户协议》</Text>
        以及
        <Text style={styles.protocol}>《隐私政策》</Text>
      </Text>
      <View style={styles.button}>
        <Button onPress={handleCreateWallet}>创建钱包</Button>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: Props) => {
  // console.log(11111, theme.colors, props);
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.white,
      height: '100%',
      paddingTop: 28,
      paddingLeft: 25,
      paddingRight: 25,
    },
    item: {
      // marginBottom: 26,
    },
    title: {
      fontWeight: 'bold',
      // color: '#434343',
      lineHeight: 22,
      fontSize: 16,
      marginBottom: 6,
      paddingLeft: 7,
    },
    button: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: 25,
    },
    // container: {
    //   background: theme.colors.white,
    //   width: props.fullWidth ? '100%' : 'auto',
    // },
    // text: {
    //   color: theme.colors.primary,
    // },
    protocol: {
      color: '#4D6EF5',
    },
  };
});
// const styles = StyleSheet.create({
//   input: {
//     height: 58,
//     borderRadius: 9,
//     borderWidth: 1,
//     borderColor: '#D7D7FA',
//   },
//   container: {
//     position: 'relative',
//     // backgroundColor: theme.colors.white,
//     height: '100%',
//     paddingTop: 28,
//     paddingLeft: 25,
//     paddingRight: 25,
//   },
//   item: {
//     marginBottom: 26,
//   },
//   title: {
//     fontWeight: 'bold',
//     // color: '#434343',
//     lineHeight: 22,
//     fontSize: 16,
//     marginBottom: 6,
//     paddingLeft: 7,
//   },
// });
export default CreateWallet;
