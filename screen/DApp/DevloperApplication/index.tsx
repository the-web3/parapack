import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, StyleSheet, Appearance, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-lib';
interface DAppProps {
  navigation?: any;
  mode?: string;
}

const DeveloperApplication = (props: DAppProps) => {
  const { t } = useTranslation();
  const onConfirm = () => {
    props?.navigation.navigate('SubmitScreen');
  };

  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
      paddingHorizontal: 30,
      paddingVertical: 10,
      paddingBottom: 20,
    },
    label: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 10,
      marginBottom: 10,
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
      marginBottom: 10,
    },
    labels: {
      color: isDarkMode ? '#808080' : '#000',
      fontSize: 12,
      marginBottom: 10,
    },
    input: {
      backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
      color: isDarkMode ? '#fff' : '#000',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>开发者申请</Text>
      <Text style={styles.labels}>需 审核， 需 KYC， 需签署 免责协议</Text>
      <Text style={styles.label}>开发者联系邮箱</Text>
      <TextInput
        style={styles.input}
        placeholder="ninsoidnk@gmail.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />
      <Text style={styles.label}>电话 (+082)</Text>
      <TextInput
        style={styles.input}
        placeholder="08214992848395"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />
      <Text style={styles.label}>电报 (Telegram)</Text>
      <TextInput style={styles.input} placeholder="windy0293" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />
      <Text style={styles.label}>Twitter</Text>
      <TextInput style={styles.input} placeholder="windy0293" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />
      <Text style={styles.label}>Discord</Text>
      <TextInput style={styles.input} placeholder="windy0293" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />

      <Text style={styles.label}>项目/应用名称</Text>
      <TextInput style={styles.input} placeholder="windy0293" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />

      <Text style={styles.label}>项目/应用名称</Text>
      <TextInput style={styles.input} placeholder="opensea" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />
      <Text style={styles.label}>项目/应用官网</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />

      <Text style={styles.label}>应⽤团队创始⼈kyc，及对应⽩⽪书</Text>
      <TextInput
        style={styles.input}
        placeholder="NFT发行, NFT交易平台"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />

      <Text style={styles.label}>项目/应用简介及所属类型</Text>
      <TextInput style={styles.input} placeholder="SimonDirth" placeholderTextColor={isDarkMode ? '#999' : '#ccc'} />
      <Text style={styles.label}>Token名称</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />

      <Text style={styles.label}>Token合约</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />
      <Text style={styles.label}>Token上所信息</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />
      <Text style={styles.label}>资本机构信息</Text>
      <TextInput
        style={styles.input}
        placeholder="www.opeasea.com"
        placeholderTextColor={isDarkMode ? '#999' : '#ccc'}
      />

      <Text style={styles.labels}>*需签署免责声明及协议（平台免责，且有权</Text>

      <View style={{ paddingBottom: 50 }}>
        <Button onPress={() => onConfirm()}>
          <Text>{t('dApp.submit')} </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default DeveloperApplication;
