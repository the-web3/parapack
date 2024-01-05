import * as React from 'react';
import type { FC } from 'react';
import { Text, makeStyles, useTheme, ListItem, Button } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { getDevInfo } from '@api/dApp';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: any;
  style?: any;
};

const ReportBottom: FC<Props> = ({ navigation, style }) => {
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const { t } = useTranslation();
  const styles = useStyles(theme);
  const onReport = () => {
    navigation.navigate('ReportQuestion');
  };

  const onDeveloperOnboarding = (tag?: string) => {
    navigation.navigate('DeveloperOnboarding');
  };

  const onParapack = () => {
    navigation.navigate('Parapack');
  };
  const onDeveloperApplication = async () => {
    const [device_id] = await Promise.all([getUniqueId()]);
    const res = await getDevInfo({ device_id });
    // 0:已申请，1:已通过，2:已拒绝
    if (res.data?.status === 0) {
      navigation.navigate('SubmitScreen');
    } else {
      navigation.navigate('DeveloperApplication');
    }
  };

  return (
    <View
      style={[
        {
          marginLeft: 16,
          marginRight: 16,
        },
        {
          ...style,
        },
      ]}
    >
      <Text style={styles.more}>{t('dApp.more')}</Text>
      <ListItem bottomDivider containerStyle={{ paddingVertical: 0, paddingLeft: 0, backgroundColor: 'transparent' }}>
        <TouchableOpacity onPress={() => onParapack()}>
          <Text style={styles.buttonTexts}>{t('dApp.aboutParapack')}</Text>
        </TouchableOpacity>
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={{ paddingTop: 10, paddingBottom: 0, paddingLeft: 0, backgroundColor: 'transparent' }}
      >
        <TouchableOpacity onPress={() => onReport()}>
          <Text style={styles.buttonTexts}>{t('dApp.reportQuestion')}</Text>
        </TouchableOpacity>
      </ListItem>
      <ListItem containerStyle={{ paddingTop: 10, paddingBottom: 0, paddingLeft: 0, backgroundColor: 'transparent' }}>
        <TouchableOpacity onPress={() => onDeveloperOnboarding('DeveloperOnboarding')}>
          <Text style={styles.buttonTexts}>{t('dApp.DeveloperOnboarding')}</Text>
        </TouchableOpacity>
      </ListItem>
      <Button
        onPress={onDeveloperApplication}
        buttonStyle={{
          backgroundColor: '#F2F3F6',
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#695BD4' }}>{t('dApp.developerApplication')}</Text>
      </Button>
    </View>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    more: {
      backgroundColor: 'transparent',
      paddingBottom: 10,
      color: 'black',
      fontSize: 16,
    },
    buttonTexts: {
      color: '#695BD4',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 10,
      marginLeft: 2,
      marginRight: 24,
    },
  };
});
export default ReportBottom;
