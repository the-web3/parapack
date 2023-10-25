import { View, Text, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SubmitScreen = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={150} color={isDarkMode ? '#fff' : '#000'} />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#fff' : '#000' }]}>
        <Text style={[styles.buttonText, { color: isDarkMode ? '#000' : '#fff' }]}>Finish</Text>
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
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubmitScreen;
