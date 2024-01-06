import instance from '@common/utils/http';
import { Button, useTheme } from '@rneui/themed';
import { useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, StyleSheet, View, Dimensions } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
// replace with your button component
interface DAppProps {
  navigation?: any;
  mode?: string;
}

const DeveloperApplication = (props: DAppProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [discord, setDiscord] = useState('');
  const [project, setProject] = useState('');
  const [domain, setDomain] = useState('');
  const [type, setType] = useState('');
  const [founder, setFounder] = useState('');
  const [token, setToken] = useState('');
  const [contract, setContract] = useState('');
  const [exchange, setExchange] = useState('');
  const [capital, setCapital] = useState('');
  const { t } = useTranslation();

  const onConfirm = async () => {
    const [device_id] = await Promise.all([getUniqueId()]);
    const data = {
      email,
      phone,
      telegram,
      discord,
      project,
      domain,
      type,
      founder,
      token,
      contract,
      exchange,
      capital,
      device_id,
    };
    instance
      .post('/dev/apply', data)
      .then((response) => {
        props?.navigation.navigate('SubmitScreen');
        // console.log({ data: response.data }, 'data is submitted');
      })
      .catch((error) => {
        // console.error('Error Response:', error.response);
        // console.error('Error Details:', error.message);
        props?.navigation.navigate('SubmitScreen');
      });
  };

  const { theme } = useTheme();

  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 375;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingHorizontal: isSmallScreen ? 10 : 30,
      paddingVertical: isSmallScreen ? 5 : 10,
      paddingBottom: isSmallScreen ? 10 : 20,
    },
    label: {
      color: theme.colors.black,
      fontSize: isSmallScreen ? 8 : 10,
      marginLeft: isSmallScreen ? 10 : 20,
      marginBottom: isSmallScreen ? 5 : 10,
    },
    text: {
      color: theme.colors.black,
      fontSize: isSmallScreen ? 12 : 14,
      marginLeft: isSmallScreen ? 10 : 20,
      marginBottom: isSmallScreen ? 5 : 10,
    },
    labels: {
      color: theme.colors.grey1,
      fontSize: isSmallScreen ? 10 : 12,
      marginBottom: isSmallScreen ? 5 : 10,
      marginLeft: isSmallScreen ? 10 : 20,
    },
    input: {
      // backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
      color: theme.colors.black,
      // color: isDarkMode ? '#fff' : '#000',
      borderRadius: 5,
      padding: isSmallScreen ? 5 : 10,
      marginLeft: isSmallScreen ? 10 : 20,
      marginBottom: isSmallScreen ? 5 : 10, // Updated marginBottom
      fontSize: isSmallScreen ? 12 : 14,
    },
    buttonText: {
      color: '#fff',
      fontSize: isSmallScreen ? 14 : 16,
      marginLeft: isSmallScreen ? 10 : 20,
    },
    divider: {
      // borderBottomColor: theme.colors.grey1,
      borderBottomWidth: 1,
      marginLeft: isSmallScreen ? 10 : 20,
      marginBottom: isSmallScreen ? 5 : 10, // Updated marginBottom
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>开发者申请</Text>
      <Text style={styles.labels}>需审核， 需 KYC， 需签署 免责协议</Text>
      <Text style={[styles.label, { marginTop: 20 }]}>开发者联系邮箱</Text>
      <TextInput style={styles.input} placeholderTextColor={theme.colors.grey1} onChangeText={setEmail} value={email} />
      <View style={styles.divider} />
      <Text style={styles.label}>电话 (+082)</Text>
      <TextInput style={styles.input} placeholderTextColor={theme.colors.grey1} onChangeText={setPhone} value={phone} />
      <View style={styles.divider} />
      <View>
        <Text style={styles.label}>
          {t('developerApplication.telegram')}
          (Telegram)</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.grey1}
          onChangeText={setTelegram}
          value={telegram}
        />
      </View>
      <View style={styles.divider} />
      <Text style={styles.label}>Twitter</Text>
      <TextInput style={styles.input} placeholderTextColor={theme.colors.grey1} />
      <View style={styles.divider} />
      <Text style={styles.label}>Discord</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setDiscord}
        value={discord}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>
        {t('developerApplication.project')}/
        {t('developerApplication.applicationName')}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setProject}
        value={project}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>
        {t('developerApplication.project')}/
        {t('developerApplication.applicationName')}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setDomain}
        value={domain}
      />
      <View style={styles.divider} />
      <Text style={styles.label}>项目/应用官网</Text>
      <TextInput style={styles.input} placeholderTextColor={theme.colors.grey1} onChangeText={setType} value={type} />
      <View style={styles.divider} />

      <Text style={styles.label}>
        {t('developerApplication.applicationFounderKYCandCorrespondingWhitePaper')}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setFounder}
        value={founder}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>Token名称</Text>
      <TextInput style={styles.input} placeholderTextColor={theme.colors.grey1} onChangeText={setToken} value={token} />
      <View style={styles.divider} />

      <Text style={styles.label}>
        {t('developerApplication.contractToken')}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setContract}
        value={contract}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>
        {t('developerApplication.tokenInformation')}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setExchange}
        value={exchange}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>
        {t('developerApplication.capitalInstitutionInformation')}
      </Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setCapital}
        value={capital}
      />
      <View style={styles.divider} />

      <Text style={styles.labels}>*
        {t('developerApplication.needToSignADisclaimerAndAgreement')}
      </Text>
      <View style={{ height: 20 }} />
      <View style={{ paddingBottom: isSmallScreen ? 30 : 50 }}>
        <Button onPress={() => onConfirm()}>
          <Text style={styles.buttonText}>{t('dApp.submit')} </Text>
        </Button>
      </View>
    </ScrollView>
  );
};
export default DeveloperApplication;
