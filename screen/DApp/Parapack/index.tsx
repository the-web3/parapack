import IconFont from '@assets/iconfont';
import { View, Text, StyleSheet, TouchableOpacity, Appearance } from 'react-native';

const ParaPack = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.box}>
          <IconFont name="a-logopeise" size={100} color="#fff" />
        </View>
      </View>
      <Text style={{ marginBottom: 10, fontSize: 18 }}> Parapack</Text>
      <Text style={styles.texts}>v1.0.1 </Text>
      <Text style={{ marginBottom: 350, fontSize: 12 }}>当前已是最新版本</Text>
      <Text style={{ marginBottom: 10, fontSize: 12 }}>苹方-简 常规体</Text>
      <Text style={{ marginBottom: 10, fontSize: 12 }}>Copyright ©️ 1998 - 2023</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fonttext: {
    fontSize: 18,
  },
  fontChinese: {
    fontSize: 16,
    marginBottom: 10, // Adjust this value as needed
  },
  texts: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ParaPack;
