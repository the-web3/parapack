import { Image, Text, View } from 'react-native';
import React from 'react';
import { Button, makeStyles } from '@rneui/themed';
import IconFont from '@assets/iconfont';
import moment from 'moment';

interface ActivityItemsProps {
  item: Record<string, any>;
  navigation: any;
}

export const ActivityItems = ({ item, navigation }: ActivityItemsProps) => {
  const styles = useStyles();
  return (
    <View style={styles.card}>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: item.coverPicture }}
          style={styles.banner}
          // PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.time}>{moment(item.ctime).format('YYYY-MM-DD')}</Text>
      </View>
      <View style={styles.subTitleContainer}>
        <View style={{ flexDirection: 'row' }}>
          <IconFont name="shoukuanzhanghao" />
          <Text style={styles.people}>{item.pv || 0}</Text>
          <IconFont name="a-lujing1" />
          <Text style={styles.dollar}>{item.value || 0}</Text>
        </View>

        <Button
          buttonStyle={styles.btn}
          titleStyle={{ fontWeight: 'bold', fontSize: 11, lineHeight: 16 }}
          size="sm"
          onPress={() => {
            navigation.navigate('DAppDetail', { params: item });
          }}
        >
          进入活动
        </Button>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginBottom: 15,
  },
  bannerContainer: {
    height: 94,
    borderRadius: 8,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  subTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
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
}));
