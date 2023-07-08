import IconFont from '@assets/iconfont';
import { Button, Input, Image, Text } from '@rneui/themed';
import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

const Activity = ({ navigation }) => {
  const [arr] = React.useState(new Array(10).fill(1));
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Input
          // containerStyle={{}}
          // // disabledInputStyle={{ background: '#ddd' }}
          inputContainerStyle={styles.inputContainer}
          // errorMessage="Oops! that's not correct."
          // errorStyle={{}}
          errorProps={{ display: 'none' }}
          inputStyle={{
            minHeight: 17,
            fontSize: 12,
          }}
          // // label="User Form"
          // labelStyle={{}}
          // labelProps={{}}
          // // leftIcon={<Icon name="account-outline" size={20} color={'#000'} />}
          // leftIconContainerStyle={{}}
          rightIcon={<IconFont name="a-huaban1" />}
          // rightIconContainerStyle={{}}
          placeholder="搜索你想要了解的活动..."
        />
      </View>
      <ScrollView style={styles.main}>
        {arr.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.bannerContainer}>
              <Image
                source={require('@assets/images/banner.png')}
                style={styles.banner}
                // PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {index}传“XXX”完成3.5亿美元e轮...融资，估值超过10亿美元，ceo已发内部邮件确认。
              </Text>
              <Text style={styles.time}>2020.10.01-2020.12.01</Text>
            </View>
            <View style={styles.titleContainer}>
              <View style={{ flexDirection: 'row' }}>
                <IconFont name="shoukuanzhanghao" />
                <Text style={styles.people}>747</Text>
                <IconFont name="a-lujing1" />
                <Text style={styles.dollar}>1633.11</Text>
              </View>

              <Button
                buttonStyle={styles.btn}
                titleStyle={{ fontWeight: 'bold', fontSize: 11, lineHeight: 16 }}
                size="sm"
                onPress={() => {
                  navigation?.navigate('createWallet');
                }}
              >
                进入活动
              </Button>
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    paddingTop: 4,
    paddingHorizontal: 25,
    paddingBottom: 19,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  inputContainer: {
    paddingHorizontal: 11,
    borderRadius: 8,
    // borderWidth: 0,
    // elevation: 5,
    shadowColor: '#F7F7F7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    height: 36,
    borderColor: '#F7F7F7',
  },
  main: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 15,
  },
  bannerContainer: {
    height: 94,
  },
  banner: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  title: {
    color: 'rgba(51, 51, 51, 1)',
    flex: 1,
    marginRight: 16,
  },
  time: {
    color: 'rgba(153, 153, 153, 1)',
  },
  people: {
    color: 'rgba(99, 79, 247, 1)',
    fontWeight: '500',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 13,
  },
  dollar: {
    color: 'rgba(252, 183, 43, 1)',
    fontWeight: '500',
    alignItems: 'center',
    marginLeft: 4,
  },
  btn: {
    borderRadius: 30,
    width: 84,
  },
});

export default Activity;
