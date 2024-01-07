import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import { makeStyles } from '@rneui/themed';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

const NewsScreen = (props: DAppProps) => {
  const styles = useStyles(props);
  const { width } = Dimensions.get('window');
  const [notice] = useState<{
    id: number;
    title: string;
    summary: string;
    ctime: string;
    coverPicture: string;
    miniCoverPicture: string;
    content: string;
  }>({ ...props?.route?.params });
  console.log('notice.content ', notice.content);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.wrap}>
      <View style={styles.container}>
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
            <RenderHTML contentWidth={width - 32} source={{ html: notice.content }} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const useStyles = makeStyles((theme, props: DAppProps) => {
  return {
    wrap: { backgroundColor: theme.colors.white },
    container: {
      // flex: 1,
      paddingHorizontal: 16,
      overflow: 'hidden',
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
  };
});

export default NewsScreen;
