import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
import { useThemeMode } from '@rneui/themed';

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#f2f3f6',
    color: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flex: 1,
    marginBottom: height * 0.1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  text: {
    color: 'black',
    fontSize: width * 0.04,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: width * 0.04,
  },
});

const DeveloperOnboarding = () => {
  const { mode } = useThemeMode()
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  return (
    <ScrollView style={theme.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={theme.container}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={theme.text}>ParaPack钱包开发者注入规则及协议</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>1. 定义</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            1.1. ParaPack钱包：指由公司开发和维护的加密货币钱包应用程序，包括但不限于“ParaPack”钱包。
          </Text>
          <Text style={{ fontSize: width * 0.035 }}>
            1.2. 开发者：指希望入驻ParaPack钱包并在其平台上开发或部署应用程序、智能合约或其他相关内容的个人或实体。
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>2. 入驻申请</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            2.1. 条件：开发者须满足公司规定的入驻条件，并提交相关材料和信息。
          </Text>
          <Text style={{ fontSize: width * 0.035 }}>
            2.2. 审批： 公司将酌情批准或拒绝开发者的入驻申请。公司有权自行决定批准或拒绝任何入驻申请，无需提供理由。
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>3. 开发者注入 </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            3.1. 条款：一旦入驻申请被批准，开发者可以向ParaPack钱包注入其开发的应用程序或内容。
          </Text>
          <Text style={{ fontSize: width * 0.035 }}>
            3.2.
            安全性：开发者必须确保其应用程序或内容不包含恶意代码、病毒、木马或其他可能对ParaPack钱包用户造成损害的内容。
          </Text>
          <Text style={{ fontSize: width * 0.035 }}>
            3.3.
            更新和维护：开发者有责任及时更新其应用程序或内容，以确保其与ParaPack钱包的最新版本兼容，并解决可能的安全漏洞或问题。
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>4. 安全性和合规性 </Text>
        </View>
        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            4.1.
            法律遵从：开发者必须遵守所有适用的法律法规，并确保其应用程序或内容不涉及非法活动、侵犯知识产权或其他违法行为。
          </Text>
          <Text style={{ fontSize: width * 0.035 }}>
            4.2.
            安全审查：公司有权随时对开发者的应用程序或内容进行安全审查，以确保其不对ParaPack钱包的安全性产生不利影响。
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>5. 免责声明 </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            公司对于开发者注入的应用程序或内容不承担任何责任，包括但不限于直接或间接的损失或损害。开发者应自行承担其应用程序或内容可能带来的风险。
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>6. 终止</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            公司有权随时终止开发者的入驻资格，无需提前通知，如果开发者违反了本协议的任何规定或公司认为其应用程序或内容对ParaPack钱包或其用户构成威胁。
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>7. 修改 </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>
            公司有权随时修改本协议的内容，修改后的协议将在公司网站或ParaPack钱包内发布。开发者应定期查看协议变更。
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>8. 适用法律 </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>本协议受[您所在地区]法律管辖，并应按其解释和执行。 </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>9. 生效</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>本协议自[日期]起生效，自开发者首次入驻ParaPack钱包起生效。</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeveloperOnboarding;
