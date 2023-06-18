import Layout from '@components/Layout';
import LayoutNormal from '@components/LayoutNormal';
import { makeStyles } from '@rneui/base';
import Asset from '@screen/Asset';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const Screen1 = () => {
  return <Text>11111</Text>;
};
const Screen2 = () => {
  return <Text>22222</Text>;
};
const Screen3 = () => {
  return <Text>33333</Text>;
};
const BAR = [
  {
    icon: 'appstore1',
    title: 'ecology',
  },
  {
    icon: 'appstore1',
    title: 'activity',
  },
  {
    icon: 'appstore1',
    title: 'exchange',
  },
  {
    icon: 'appstore1',
    title: 'chat',
  },
  {
    icon: 'appstore1',
    title: 'asset',
  },
];
const App = (props) => {
  const { t } = useTranslation();

  const styles = useStyles(props);
  const [activeScreen, setActiveScreen] = useState('asset');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Screen1':
        return <Screen1 />;
      case 'Screen2':
        return <Screen2 />;
      case 'Screen3':
        return <Screen3 />;
      case 'asset':
        return <Asset navigation={undefined} />;
      default:
        return null;
    }
  };

  return (
    <View
    // fixedStyle={styles.bottom}

    // containerStyle={{
    //   paddingHorizontal: 0,
    //   paddingVertical: 0,
    //   marginBottom: 0,
    //   height: '100%',
    // }}
    // fixedChildren={
    //   <View style={styles.bar}>
    //     {BAR.map((item) => {
    //       const color = activeScreen !== item.title ? '#C9C9C9' : '#3B28CC';
    //       return (
    //         <TouchableOpacity style={styles.barItem} key={item.title} onPress={() => setActiveScreen(item.title)}>
    //           <Icon name={item.icon} size={15} color={color} />
    //           <Text
    //             style={{
    //               ...styles.title,
    //               color,
    //             }}
    //           >
    //             {t(`common.${item.title}`)}
    //           </Text>
    //         </TouchableOpacity>
    //       );
    //     })}
    //   </View>
    // }
    >
      {renderScreen()}
    </View>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    bottom: {
      paddingHorizontal: 0,
      paddingBottom: 30,
      paddingTop: 5,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 24, // 左上角边框半径
      borderTopRightRadius: 24, // 右上角边框半径
      borderBottomRightRadius: 0, // 右下角边框半径
      borderBottomLeftRadius: 0, // 左下角边框半径
      //       background: #FFFFFF;
      // box-shadow: 0px -8px 30px 0px rgba(0,0,0,0.06);
      // border-radius: 24px 24px 0px 0px;
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.6,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    bar: { flexDirection: 'row' },
    barItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
    title: {
      color: '#C9C9C9',
      fontSize: 10,
      marginTop: 4,
    },
  };
});
export default App;
