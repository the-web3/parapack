import IconFont from '@assets/iconfont';
import { Button, Input, Image, Text } from '@rneui/themed';
import * as React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
const Activity = ({ navigation }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [arr] = React.useState(new Array(10).fill(1));
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <View
          style={{
            width: '100%',
            height: 36,
            backgroundColor: theme.colors.white,
            borderRadius: 9,
            shadowColor: '#999999', // 阴影颜色
            shadowOffset: { width: 0, height: 0 }, // 阴影偏移为 (0, 0)
            shadowOpacity: 0.5, // 阴影透明度
            shadowRadius: 10, // 模糊半径为 10
            elevation: 2, // 仅在 Android 上需要，设置为 0 表示不要阴影
          }}
        >
          <Input
            inputContainerStyle={styles.inputContainer}
            errorProps={{ display: 'none' }}
            inputStyle={{
              fontSize: 12,
            }}
            rightIcon={<IconFont name="a-huaban1" />}
            placeholder="搜索你想要了解的活动..."
          />
        </View>
      </View>
      <ScrollView style={styles.main}>
        {arr.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.bannerContainer}>
              <Image
                source={require('@assets/images/banner1.png')}
                style={styles.banner}
                // PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                传“XXX”完成3.5亿美元e轮...融资，估值超过10亿美元，ceo已发内部邮件确认。
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
                  navigation?.navigate('guide');
                }}
              >
                进入活动
              </Button>
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
const useStyles = makeStyles((theme) => {
  return {
    container: {
      flex: 1,
    },
    searchBar: {
      paddingTop: 4,
      paddingHorizontal: 25,
      paddingBottom: 19,
      backgroundColor: theme.colors.white,
    },
    inputContainer: {
      paddingHorizontal: 12,
      borderWidth: 0,
      height: 36,
      minHeight: 36,
      borderColor: theme.colors.white,
    },
    main: {
      paddingHorizontal: 15,
      paddingVertical: 16,
      backgroundColor: theme.colors.grey5,
      flex: 1,
    },
    card: {
      backgroundColor: theme.colors.white,
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
      color: theme.colors.black,
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
  };
});

export default Activity;
