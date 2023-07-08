import * as React from 'react';
import type { FC } from 'react';
import { makeStyles } from '@rneui/base';
import { View } from 'react-native';
import { useTheme } from '@rneui/themed';
type Props = {
  children: React.ReactNode;
  fixedChildren?: React.ReactNode;
  fixedStyle?: any;
  containerStyle?: any;
};
const LayoutNormal: FC<Props> = ({ children, fixedChildren, fixedStyle = {}, containerStyle = {} }) => {
  const theme = useTheme();
  const styles = useStyles(theme.theme);
  return (
    <View style={styles.container}>
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
    </View>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    containerContent: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: 25,
      paddingVertical: 28,
      marginBottom: 10,
      flex: 1,
    },
    fixedContainer: {},
  };
});
export default LayoutNormal;
