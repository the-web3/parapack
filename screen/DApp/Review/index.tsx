import { View, Text, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Review = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={styles.iconContainer}>
        <Icon name="check" size={150} color="blue" />
      </View>
      <Text style={styles.fonttext}> 资料审核中...</Text>

      <Text style={styles.texts}>审核通过后, 会以邮件形式通知</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]}>
        <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : '#fff' }]}>取消申请</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 50,
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
  texts: {
    fontSize: 12,
    marginBottom: 350,
  },
});

export default Review;
