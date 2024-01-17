import * as React from 'react';
import type { FC } from 'react';
import { makeStyles } from '@rneui/base';
import { ScrollView, StatusBar, View } from 'react-native';
import { useTheme, useThemeMode } from '@rneui/themed';
type Props = {
  children: React.ReactNode;
  fixedChildren?: React.ReactNode;
  fixedStyle?: any;
  containerStyle?: any;
};
const Layout: FC<Props> = ({ children, fixedChildren, fixedStyle = {}, containerStyle = {} }) => {
  const { mode } = useThemeMode()
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background} // 替换为你想要的背景颜色
        barStyle={`${mode === 'light' ? 'dark' : 'light'}-content`} // 替换为你想要的图标和文字颜色
      />
      <ScrollView
        style={{
          ...styles.containerContent,
          ...containerStyle,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <View
        style={{
          ...styles.fixedContainer,
          ...fixedStyle,
        }}
      >
        {fixedChildren}
      </View>
    </View>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.background,
    },
    containerContent: {
      backgroundColor: theme.colors.background,
      height: '100%',
      minHeight: '100%',
      paddingHorizontal: 25,
      paddingVertical: 28,
      marginBottom: 10,
    },
    fixedContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      marginTop: 100,
      paddingHorizontal: 25,
      paddingVertical: 16,
      paddingBottom: 25,
    },
  };
});
export default Layout;
