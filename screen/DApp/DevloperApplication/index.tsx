import instance from '@common/utils/http';
import { useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, StyleSheet, Appearance, View, Dimensions } from 'react-native';
import { Button } from 'react-native-ui-lib';
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
  const onConfirm = () => {
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
      device_id: 'your-device-id',
    };
    instance
      .post('/dev/apply', data)
      .then((response) => {
        console.log(data);
        // Handle success
        console.log('Response data:', response);
        // Navigate to SubmitScreen
        props?.navigation.navigate('SubmitScreen');
        console.log({ data: response.data }, 'data is submitted');
      })
      .catch((error) => {
        console.error('Error Response:', error.response);
        console.error('Error Details:', error.message);
        props?.navigation.navigate('SubmitScreen');
      });
  };

  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 375;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
      paddingHorizontal: isSmallScreen ? 10 : 30,
      paddingVertical: isSmallScreen ? 5 : 10,
      paddingBottom: isSmallScreen ? 10 : 20,
    },
    label: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: isSmallScreen ? 8 : 10,
      marginBottom: isSmallScreen ? 5 : 10,
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: isSmallScreen ? 12 : 14,
      marginBottom: isSmallScreen ? 5 : 10,
    },
    labels: {
      color: isDarkMode ? '#808080' : '#000',
      fontSize: isSmallScreen ? 10 : 12,
      marginBottom: isSmallScreen ? 5 : 10,
    },
    input: {
      // backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
      color: isDarkMode ? '#fff' : '#000',
      borderRadius: 5,
      padding: isSmallScreen ? 5 : 10,
      marginBottom: isSmallScreen ? 5 : 10, // Updated marginBottom
      fontSize: isSmallScreen ? 12 : 14,
    },
    button: {
      borderRadius: isSmallScreen ? 5 : 10,
      paddingVertical: isSmallScreen ? 10 : 15,
      paddingHorizontal: isSmallScreen ? 15 : 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: isSmallScreen ? 14 : 16,
    },
    divider: {
      borderBottomColor: isDarkMode ? '#999' : '#ccc',
      borderBottomWidth: 1,
      marginBottom: isSmallScreen ? 5 : 10, // Updated marginBottom
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>开发者申请</Text>
      <Text style={styles.labels}>需 审核， 需 KYC， 需签署 免责协议</Text>
      <Text style={[styles.label, { marginTop: 20 }]}>开发者联系邮箱</Text>
      <TextInput
        style={styles.input}
        placeholder="ninsoidnk@gmail.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setEmail}
        value={email}
      />
      <View style={styles.divider} />
      <Text style={styles.label}>电话 (+082)</Text>
      <TextInput
        style={styles.input}
        placeholder="08214992848395"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setPhone}
        value={phone}
      />
      <View style={styles.divider} />
      <View>
        <Text style={styles.label}>电报 (Telegram)</Text>
        <TextInput
          style={styles.input}
          placeholder="windy0293"
          placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
          onChangeText={setTelegram}
          value={telegram}
        />
      </View>
      <View style={styles.divider} />
      <Text style={styles.label}>Twitter</Text>
      <TextInput style={styles.input} placeholder="windy0293" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />
      <View style={styles.divider} />
      <Text style={styles.label}>Discord</Text>
      <TextInput
        style={styles.input}
        placeholder="windy0293"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setDiscord}
        value={discord}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>项目/应用名称</Text>
      <TextInput
        style={styles.input}
        placeholder="windy0293"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setProject}
        value={project}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>项目/应用名称</Text>
      <TextInput
        style={styles.input}
        placeholder="opensea"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setDomain}
        value={domain}
      />
      <View style={styles.divider} />
      <Text style={styles.label}>项目/应用官网</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setType}
        value={type}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>应⽤团队创始⼈kyc，及对应⽩⽪书</Text>
      <TextInput
        style={styles.input}
        placeholder="NFT发行, NFT交易平台"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setFounder}
        value={founder}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>Token名称</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setToken}
        value={token}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>Token合约</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setContract}
        value={contract}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>Token上所信息</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setExchange}
        value={exchange}
      />
      <View style={styles.divider} />

      <Text style={styles.label}>资本机构信息</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
        onChangeText={setCapital}
        value={capital}
      />
      <View style={styles.divider} />

      <Text style={styles.labels}>*需签署免责声明及协议（平台免责，且有权下架）等法律⽂件</Text>
      <View style={{ height: 20 }} />
      <View style={{ paddingBottom: isSmallScreen ? 30 : 50 }}>
        <Button onPress={() => onConfirm()} style={styles.button}>
          <Text style={styles.buttonText}>{t('dApp.submit')} </Text>
        </Button>
      </View>
    </ScrollView>
  );
};
export default DeveloperApplication;
