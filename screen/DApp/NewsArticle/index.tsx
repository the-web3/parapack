import { getNotices } from '@api/dApp';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

const NewsArticle = (props: DAppProps) => {
  const onRecommendPress = (params: any) => {
    props?.navigation.navigate('News', { params });
  };
  const navigation = useNavigation();
  const [notices, setNotices] = useState<{ id: number; title: string; summary: string; ctime: string }[]>([]);

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
    <View style={styles.container}>
      {notices?.map((notice, index) => (
        <TouchableOpacity style={styles.noticeContainer} key={index} onPress={() => onRecommendPress(index)}>
          <Text style={[styles.noticeId, { marginTop: 6 }]}>{notice.id}</Text>
          <View style={[styles.noticeContent, { marginLeft: 28 }]}>
            <Text style={[styles.noticeTitle, { marginTop: 0 }]} numberOfLines={1}>
              {notice.title}
            </Text>
            <Text style={[styles.noticeSummary, { marginBottom: '1.97%' }]} numberOfLines={2}>
              {notice.summary}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.timestamp}>{moment(notice.ctime).format('yy/MM/DD')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  noticeContainer: {
    padding: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noticeId: {
    color: '#7E7E7E',
    fontSize: 14,
    marginRight: 20,
  },
  noticeContent: {
    flex: 1,
    marginRight: 10,
  },
  noticeTitle: {
    color: '#0D1421',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noticeSummary: {
    color: '#7E7E7E',
    fontSize: 14,
  },
  timestamp: {
    color: '#7E7E7E',
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    marginRight: 10,
    marginBottom: 30.5,
    color: 'black',
  },
});

export default NewsArticle;
