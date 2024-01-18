import IconFont from '@assets/iconfont';
import instance from '@common/utils/http';
import { showToast } from '@common/utils/platform';
import { Button, Input, useTheme } from '@rneui/themed';
import { useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
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
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const onConfirm = async () => {
    if (!checked) {
      return showToast('请勾选协议');
    }
    if (!email || !telegram || !project || !domain || !type) {
      return showToast('请填写表单');
    }
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
        console.log({ data: response.data }, 'data is submitted');
        props?.navigation.navigate('SubmitScreen');
      })
      .catch((error) => {
        console.error('Error Details:', error.message);
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
      paddingHorizontal: 16,
    },
    text: {
      color: '#3B28CC',
      fontSize: 18,
      fontWeight: '500',
    },
    labels: {
      color: '#3B28CC',
      marginBottom: 30,
      fontSize: 18,
      fontWeight: '600',
    },
    label: {
      color: theme.colors.grey9,
      fontSize: 14,
      fontWeight: '400',
      paddingLeft: 0,
    },
    input: {
      minHeight: 34,
      height: 34,
      paddingHorizontal: 0,
      borderRadius: 0,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: '#E5E5E5',
      backgroundColor: 'background',
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
    protocol: {
      color: '#4D6EF5',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.text}>{t('developerApplication.title')}</Text>
      <Text style={styles.labels}>{t('developerApplication.desc')}</Text>
      <Input
        inputContainerStyle={styles.input}
        onChangeText={setEmail}
        value={email}
        labelStyle={styles.label}
        label={
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'red' }}>* </Text>
            <Text>{t('developerApplication.developerContactEmail')}</Text>
          </View>
        }
      />

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setPhone}
        value={phone}
        labelStyle={styles.label}
        label={`${t('developerApplication.phone')} (+082)`}
      /> */}

      <View>
        <Input
          inputContainerStyle={styles.input}
          placeholderTextColor={theme.colors.grey1}
          onChangeText={setTelegram}
          value={telegram}
          labelStyle={styles.label}
          label={
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'red' }}>* </Text>
              <Text>{`${t('developerApplication.telegram')} (Telegram)`}</Text>
            </View>
          }
        />
      </View>

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        labelStyle={styles.label}
        label={`Twitter`}
      /> */}

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setDiscord}
        value={discord}
        labelStyle={styles.label}
        label={`Discord`}
      /> */}

      <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setProject}
        value={project}
        labelStyle={styles.label}
        label={
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'red' }}>* </Text>
            <Text>{`${t('developerApplication.project')}/${t('developerApplication.applicationName')}`}</Text>
          </View>
        }
      />

      <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setDomain}
        value={domain}
        labelStyle={styles.label}
        label={
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'red' }}>* </Text>
            <Text>{`${t('developerApplication.applicationWebsite')}`}</Text>
          </View>
        }
      />

      <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setType}
        value={type}
        labelStyle={styles.label}
        label={
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'red' }}>* </Text>
            <Text>{`${t('developerApplication.applicationType')}`}</Text>
          </View>
        }
      />

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setFounder}
        value={founder}
        labelStyle={styles.label}
        label={t('developerApplication.applicationFounderKYCandCorrespondingWhitePaper')}
      /> */}

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setToken}
        value={token}
        labelStyle={styles.label}
        label={t('developerApplication.tokenName')}
      /> */}

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setContract}
        value={contract}
        labelStyle={styles.label}
        label={t('developerApplication.contractToken')}
      /> */}

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setExchange}
        value={exchange}
        labelStyle={styles.label}
        label={t('developerApplication.tokenInformation')}
      /> */}

      {/* <Input
        inputContainerStyle={styles.input}
        placeholderTextColor={theme.colors.grey1}
        onChangeText={setCapital}
        value={capital}
        labelStyle={styles.label}
        label={t('developerApplication.capitalInstitutionInformation')}
      /> */}
      <View style={{ marginBottom: 60 }}>
        <Button onPress={() => onConfirm()}>
          <Text style={styles.buttonText}>{t('dApp.submit')} </Text>
        </Button>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
            }}
          >
            <IconFont name="a-101" color={checked ? '#3B28CC' : undefined} style={{ marginRight: 8 }} />
          </TouchableOpacity>

          <Text style={{ flexWrap: 'wrap' }}>
            {t('developerApplication.base')}
            <Text style={styles.protocol}>{t('developerApplication.platformProtocol')}</Text>
            {t('developerApplication.and')}
            <Text style={styles.protocol}>{t('developerApplication.clause')}</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default DeveloperApplication;
