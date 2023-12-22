import IconFont from '@assets/iconfont';
import LayoutNormal from '@components/LayoutNormal';
import { makeStyles, useTheme, useThemeMode, ThemeMode } from '@rneui/themed';
import Activity from '@screen/Activity';
import Asset from '@screen/Asset';
import Test from '@screen/Asset/Test';
import { DAppScreen } from '@screen/DApp';
import Swap from '@screen/Swap';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { getData } from '@common/utils/storage';
const BAR = [
  {
    icon: 'shengtaidianjiqian',
    title: 'ecology',
  },
  {
    icon: 'huodongdianjiqian',
    title: 'activity',
  },
  {
    icon: 'a-3',
    title: 'swap',
  },
  {
    icon: 'a-41',
    title: 'video',
  },
  {
    icon: 'zichandianjiqian',
    title: 'asset',
  },
];
const App = (props: any) => {
  const { mode, setMode } = useThemeMode()
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const { t } = useTranslation();
  // 获取传递的参数
  const tab = props.route.params?.tab || 'ecology';
  const styles = useStyles();

  const renderScreen = (prop: any) => {
    switch (tab) {
      case 'ecology':
        return <DAppScreen {...prop} />;
      case 'activity':
        return <Activity {...prop} />;
      case 'swap':
        return <Swap {...prop} />;
      case 'video':
        return <Test {...prop} />;
      case 'asset':
        return <Asset {...prop} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    // 在这里执行你想要的操作
    console.log('Home 页面重新渲染了');
  }, [props.navigation]);

  useEffect(() => {
    // init the color Theme
    getData("colorTheme").then((value) => {
      if (value !== '{}') {
        setMode(value as ThemeMode)
      } else {
        setMode(mode)
      }
    })
  }, [])

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background} // 替换为你想要的背景颜色
        barStyle={`${mode === 'light' ? 'dark' : 'light'}-content`} // 替换为你想要的图标和文字颜色
        translucent={false}
      // backgroundColor="transparent"
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
                  <IconFont name={item.icon} color={color} />
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
    },
    bottom: {
      height: 40,
      position: 'relative',
      top: -30,
    },
    bar: {
      height: 70,
      flexDirection: 'row',
      paddingHorizontal: 0,
      paddingVertical: 11,
      backgroundColor: theme.colors.background,
      // backgroundColor: theme.colors.black,
      borderTopLeftRadius: 24, // 左上角边框半径
      borderTopRightRadius: 24, // 右上角边框半径
      borderBottomRightRadius: 0, // 右下角边框半径
      borderBottomLeftRadius: 0, // 左下角边框半径
      // shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      shadowColor: '#000', // 阴影颜色
      elevation: 5, // 添加阴影效果，可以根据需要调整阴影深度
    },
    barItem: { flex: 1, alignItems: 'center' },
    title: {
      color: '#C9C9C9',
      fontSize: 10,
      marginTop: 4,
    },
  };
});
export default App;
