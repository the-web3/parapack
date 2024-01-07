import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { makeStyles } from '@rneui/themed';

interface DAppItemProps {
  avatar: string;
  title: string;
  description: string;
  onPress?: (e: any) => void;
  styles?: any;
  contentStyles?: any;
  summary?: any;
  coverPicture?: any;
}
interface DAppItemsProps {
  avatar: string;
  title: string;
  description: string;
  onPress?: (e: any) => void;
  styles?: any;
  contentStyles?: any;
  summary?: any;
  coverPicture?: any;
}
export const DAppItem = (props: DAppItemProps) => {
  const styles = useStyles();
  const summary = props.summary;
  const title = props.title;
  return (
    <TouchableOpacity style={[styles.container, props?.styles]} key={props.title} onPress={props?.onPress}>
      <View style={[styles.content, props?.contentStyles]}>
        <Image source={{ uri: props.miniCoverPicture }} style={styles.avatar} />
        <View style={styles.rightBg}>
          <Text children={title} style={styles.title} numberOfLines={1} />
          <Text children={summary} style={styles.description} numberOfLines={1} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 20,
    height: 60,
  },
  content: {
    paddingVertical: 10,
    borderBottomColor: theme.colors.grey5,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  rightBg: {
    marginLeft: 10,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    color: theme.colors.black,
  },
  description: {
    fontSize: 13,
    color: theme.colors.grey4,
  },
}));

export const DAppItems = (props: DAppItemsProps) => {
  const styles = useStyle();
  const summary = props.summary.substring(0, 7) + '...';
  const title = props.title.substring(0, 10) + '...';
  return (
    <TouchableOpacity style={[styles.container, props?.styles]} key={props.title} onPress={props?.onPress}>
      <View style={[styles.content, props?.contentStyles]}>
        <Image source={{ uri: props.coverPicture }} style={styles.avatar} />
        <View style={styles.rightBg}>
          <Text children={title} style={styles.title} />
          <Text children={summary} style={styles.description} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useStyle = makeStyles((theme) => ({
  container: {
    paddingHorizontal: 20,
    height: 60,
  },
  content: {
    paddingVertical: 10,
    borderBottomColor: theme.colors.grey5,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  rightBg: {
    marginLeft: 10,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    color: theme.colors.black,
  },
  description: {
    fontSize: 13,
    color: theme.colors.grey4,
  },
}));
