import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { Avatar, Button, Text, makeStyles, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFont from '@assets/iconfont';
import { CustomColors } from 'style/them';
import { useTranslation } from 'react-i18next';
import SwapPage from './components/SwapPage';
type Props = {
  fullWidth?: boolean;
  navigation: any;
};

const Swap = (props: Props) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [active] = useState('swap');
  const { t } = useTranslation()
  const [money, setMoney] = useState<{
    buy: string;
    sell: string;
  }>({
    buy: '0.00',
    sell: '0.00',
  });
  const handleSwap = () => {
    props?.navigation.navigate('startBackup');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.tabs}>
          <Text style={active === 'swap' ? styles.activeTabsTitle : styles.tabsTitle}>
            {t('swap.Swap')}
          </Text>
          <Text style={styles.tabsTitle}>
            {t('swap.Market')}
          </Text>
          <Text style={styles.tabsTitle}>
            {t('swap.LaunchPad')}
          </Text>
        </View>
        <IconFont name="xiangqing" />
      </View>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <SwapPage />
      </ScrollView>
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme: CustomTheme<CustomColors>) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    main: {
      padding: 24,
      flex: 1,
      backgroundColor: theme.colors?.backgroundGrey,
    },
    searchBar: {
      backgroundColor: theme.colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingVertical: 15,
      alignItems: 'center',
    },
    tabs: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    activeTabsTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: theme.colors.black,
      marginLeft: 12,
      lineHeight: 25,
    },
    tabsTitle: {
      fontSize: 18,
      fontWeight: '500',
      color: 'rgba(153, 153, 153, 1)',
      marginLeft: 12,
      lineHeight: 25,
    },
    swapCard: {
      backgroundColor: theme.colors.backgroundWhite,
      borderRadius: 12,
      marginBottom: 20,
      paddingHorizontal: 24,
      // paddingVertical: 12,
    },
    swapCardTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    sell: {
      color: theme.colors.grey2,
      // color: '#161414',
      fontSize: 11,
    },
    balance: {
      color: theme.colors.grey0,
      // color: '#1F1D1D',
      fontSize: 11,
    },
    chain: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 35,
      paddingTop: 36,
    },
    chainRight: {
      flex: 1,
      marginLeft: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    chainTitle: {
      color: theme.colors.black,
      fontWeight: '600',
      fontSize: 18,
    },
    chainSubTitle: {
      color: theme.colors.grey4,
      fontWeight: '400',
      fontSize: 11,
      lineHeight: 16,
    },
    money: {
      color: theme.colors.grey4,
      fontSize: 26,
      lineHeight: 30,
      fontWeight: 'bold',
      textAlign: 'right',
    },
  };
});
export default Swap;
