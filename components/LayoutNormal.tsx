import * as React from 'react';
import type { FC } from 'react';
import { makeStyles } from '@rneui/base';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@rneui/themed';
type Props = {
  children: React.ReactNode;
  fixedChildren?: React.ReactNode;
  fixedStyle?: any;
  containerStyle?: any;
};
const Layout: FC<Props> = ({ children, fixedChildren, fixedStyle = {}, containerStyle = {} }) => {
  const theme = useTheme();
  const styles = useStyles(theme.theme);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          ...styles.containerContent,
          ...containerStyle,
        }}
      >
        {children}
      </View>
      <View
        style={{
          ...styles.fixedContainer,
          ...fixedStyle,
        }}
      >
        {fixedChildren}
      </View>
    </SafeAreaView>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.white,
    },
    containerContent: {
      backgroundColor: theme.colors.white,
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
      backgroundColor: '#fff',
    },
  };
});
export default Layout;
