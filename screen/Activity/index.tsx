import IconFont from '@assets/iconfont';
import React, { useEffect, useState } from 'react';
import { Button, Input, Image, Text } from '@rneui/themed';
import { getActivity } from '@api/home';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { makeStyles, useTheme } from '@rneui/themed';
import moment from 'moment';
import { ActivityItems } from './Components/ActivityItems';
const Activity = ({ navigation }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [activity, setActivity] = useState<Record<string, any>>({});
  const rqDatas = async () => {
    try {
      const activityRes = await getActivity({
        pageNum: '1',
        pageSize: '10',
        status: 1,
        // symbol,
      });
      console.log(1111111, JSON.stringify(activityRes));
      setActivity(activityRes.data);
    } catch (e) {}
  };
  useEffect(() => {
    rqDatas();
  }, []);
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
        {activity?.lists?.map((item, index) => (
          <ActivityItems item={item} key={index} navigation={navigation} />
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
  };
});

export default Activity;
