import Layout from '@components/Layout';
import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Appearance, Dimensions, SafeAreaView, Image } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { cancelApplication } from '@api/dApp';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

const Review = (props: DAppProps) => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { width, height } = Dimensions.get('window');
  const fontTextSize = width * 0.05;
  const textSize = width * 0.03;
  const marginBottom = height * 0.05;
  const textsMarginBottom = height * 0.35;
  const marginTop = height * 0.01;

  const onCancel = async () => {
    const [device_id] = await Promise.all([getUniqueId()]);
    cancelApplication({
      device_id,
    })
      .then((response) => {
        console.log('Cancel request sent successfully');
        props?.navigation.navigate('DevloperApplication');
      })
      .catch((error) => {
        console.error('Error cancelling request:', error);
      });
  };

  return (
    <Layout
      fixedChildren={
        <View>
          <Button onPress={onCancel}>取消申请</Button>
        </View>
      }
    >
      <SafeAreaView>
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff', marginBottom: 10 }]}>
          <View style={[styles.iconContainer, { marginBottom, marginTop }]}>
            <Image
              source={require('assets/images/iconfont.png')}
              style={{ width: 130, height: 130, tintColor: 'blue' }}
            />
          </View>
          <Text style={[styles.fonttext, { fontSize: fontTextSize, marginTop }]}>资料审核中...</Text>

          <Text style={[styles.texts, { fontSize: textSize, marginBottom: textsMarginBottom }]}>
            审核通过后, 会以邮件形式通知
          </Text>
        </View>
      </SafeAreaView>
    </Layout>
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
