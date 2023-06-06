import * as React from 'react';
import type {FC} from 'react';
import {makeStyles} from '@rneui/base';
import {View} from 'react-native';
import {useTheme} from '@rneui/themed';
type Props = {
  children: React.ReactNode;
};
const Layout: FC<Props> = props => {
  const theme = useTheme();
  const styles = useStyles(theme.theme);
  return <View style={styles.container}>{props.children}</View>;
};
const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      position: 'relative',
      backgroundColor: theme.colors.white,
      minHeight: '100%',
      paddingTop: 28,
      paddingLeft: 25,
      paddingRight: 25,
    },
  };
});
export default Layout;
