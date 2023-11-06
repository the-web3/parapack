import { getNotices } from '@api/dApp';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

const NewsScreen = (props: DAppProps) => {
  const onRecommendPress = (params: any) => {
    props?.navigation.navigate('News', { params });
  };
  const navigation = useNavigation();
  const [notices, setNotices] = useState<
    {
      id: number;
      title: string;
      summary: string;
      ctime: string;
      coverPicture: string;
      miniCoverPicture: string;
      content: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const noticesRes = await getNotices({
        pageNum: 1,
        pageSize: 10,
        symbol: 'eth',
      });
      console.log('noticesRes', noticesRes);
      setNotices(noticesRes.data.lists);
    };
    fetchNotices();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {notices.map((notice) => (
          <View style={styles.noticeContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{notice.title}</Text>
            </View>
            <Text style={styles.date}>{moment(notice.ctime).format('yy/MM/DD')}</Text>
            <View style={styles.summaryContainer}>
              <Text style={styles.summary}>{notice.summary}</Text>
            </View>
            <View style={styles.dateImageContainer}>
              <Image style={styles.image} source={{ uri: notice.miniCoverPicture }} />
            </View>
            <View>
              <RenderHTML contentWidth={320} source={{ html: notice.content }} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 15,
    marginBottom: 40.5,
  },
  noticeContainer: {
    color: 'black',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    color: 'black',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  summaryContainer: {
    marginBottom: 15,
    color: 'black',
  },
  summary: {
    fontSize: 16,
    color: 'black',
  },
  dateImageContainer: {
    marginBottom: 5,
    color: 'black',
  },
  date: {
    fontSize: 14,
    marginRight: 10,
    marginBottom: 30.5,
    color: 'black',
  },
  image: {
    width: 320,
    height: 177.5,
    borderRadius: 15,
    color: 'black',
  },
  content: {
    fontSize: 14,
  },
});

export default NewsScreen;
