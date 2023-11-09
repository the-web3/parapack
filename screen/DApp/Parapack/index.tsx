import IconFont from '@assets/iconfont';
import { View, Text, StyleSheet, TouchableOpacity, Appearance, useWindowDimensions } from 'react-native';

const ParaPack = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 350;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View
        style={[
          styles.box,
          { width: isSmallScreen ? width * 0.3 : width * 0.4, height: isSmallScreen ? width * 0.3 : width * 0.4 },
        ]}
      >
        <IconFont name="a-logopeise" size={isSmallScreen ? width * 0.2 : width * 0.3} color="#fff" />
      </View>
      <Text style={{ marginBottom: width * 0.03, fontSize: isSmallScreen ? width * 0.04 : width * 0.05 }}>
        {' '}
        Parapack
      </Text>
      <Text style={styles.texts}>v1.0.1 </Text>
      <Text
        style={{
          marginBottom: isSmallScreen ? height * 0.2 : height * 0.4,
          fontSize: isSmallScreen ? width * 0.025 : width * 0.03,
        }}
      >
        当前已是最新版本
      </Text>
      <Text style={{ marginBottom: width * 0.03, fontSize: isSmallScreen ? width * 0.025 : width * 0.03 }}>
        苹方-简 常规体
      </Text>
      <Text style={{ marginBottom: width * 0.03, fontSize: isSmallScreen ? width * 0.02 : width * 0.03 }}>
        Copyright ©️ 1998 - 2023
      </Text>
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
    marginBottom: 10,
  },
  texts: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ParaPack;
