import LayoutNormal from '@components/LayoutNormal';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { makeStyles } from '@rneui/base';
import Activity from '@screen/Activity';
import Asset from '@screen/Asset';
import { DAppScreen } from "@screen/DApp";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StatusBar, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
const App = (props: any) => {
  const mode = useColorScheme() || 'light';
  const { t } = useTranslation();
  // 获取传递的参数
  const tab = props.route.params?.tab || 'ecology';
  const styles = useStyles(props);

  const renderScreen = (prop: any) => {
    switch (tab) {
      case 'ecology':
        return <DAppScreen {...props} />;
      case 'activity':
        return <Activity {...props} />;
      case 'exchange':
        return <Screen3 {...props} />;
      case 'chat':
        return <Screen2 {...props} />;
      case 'asset':
        return <Asset {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={mode === 'light' ? DefaultTheme.colors.background : DarkTheme.colors.background} // 替换为你想要的背景颜色
        barStyle={`${mode === 'light' ? 'dark' : 'light'}-content`} // 替换为你想要的图标和文字颜色
      />
      <LayoutNormal
        fixedStyle={styles.bottom}
        containerStyle={styles.container}
        fixedChildren={
          <View style={styles.bar}>
            {BAR.map((item) => {
              const color = tab !== item.title ? '#C9C9C9' : '#3B28CC';
              return (
                <TouchableOpacity
                  style={styles.barItem}
                  key={item.title}
                  onPress={() => props.navigation.navigate('home', { tab: item.title })}
                >
                  <Icon name={item.icon} size={15} color={color} />
                  <Text
                    style={{
                      ...styles.title,
                      color,
                    }}
                  >
                    {t(`common.${item.title}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        }
      >
        {renderScreen(props)}
      </LayoutNormal>
    </>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    container: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginBottom: 0,
      height: '100%',
      // paddingBottom: 135,
    },
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
