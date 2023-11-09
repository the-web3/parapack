import { View, Text, StyleSheet, TouchableOpacity, Appearance, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface DAppProps {
  navigation?: any;
  mode?: string;
}
const Review = (props: DAppProps) => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { width, height } = Dimensions.get('window');
  const iconSize = width * 0.5;
  const buttonWidth = width * 0.8;
  const buttonHeight = height * 0.07;
  const borderRadius = width * 0.02;
  const fontTextSize = width * 0.05;
  const textSize = width * 0.03;
  const marginBottom = height * 0.05;
  const textsMarginBottom = height * 0.35;
  const marginTop = height * 0.01;

  const Onreview = () => {
    props?.navigation.navigate('Review'); // pass screen name as a prop
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff', marginBottom: 10 }]}>
      <View style={[styles.iconContainer, { marginBottom, marginTop }]}>
        <Icon name="check" size={iconSize} color="#3b28cc" />
      </View>
      <Text style={[styles.fonttext, { fontSize: fontTextSize, marginTop }]}>资料审核中...</Text>

      <Text style={[styles.texts, { fontSize: textSize, marginBottom: textsMarginBottom }]}>
        审核通过后, 会以邮件形式通知
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: '#3b28cc',
            width: buttonWidth,
            height: buttonHeight,
            borderRadius,
            marginTop: height * 0.02, // Adjusted marginTop
          },
        ]}
        onPress={() => Onreview()}
      >
        <Text
          style={[
            styles.buttonText,
            { fontSize: fontTextSize, fontWeight: 'bold', color: isDarkMode ? 'white' : '#fff' },
          ]}
        >
          取消申请
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    marginBottom: '10%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  fonttext: {
    fontWeight: 'bold',
  },
  texts: {
    marginBottom: 0.1 * Dimensions.get('window').height,
  },
});

export default Review;
