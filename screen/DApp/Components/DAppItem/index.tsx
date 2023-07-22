import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { makeStyles } from "@rneui/themed";

interface DAppItemProps {
  avatar: string
  title: string
  description: string
  onPress?: (e: any) => void
  styles?: any
  contentStyles?: any
}

export const DAppItem = (props: DAppItemProps) => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={[styles.container, props?.styles]} key={props.title} onPress={props?.onPress}>
      <View style={[styles.content, props?.contentStyles]}>
        <Image source={{ uri: props.avatar }} style={styles.avatar}/>
        <View style={styles.rightBg}>
          <Text children={props.title} style={styles.title}/>
          <Text children={props.description} style={styles.description}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles(theme => ({
    container: {
      paddingHorizontal: 20,
    },
    content: {
      paddingVertical: 10,
      borderBottomColor: theme.colors.grey5,
      borderBottomWidth: 1,
      flexDirection: "row"
    },
    avatar: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
    rightBg: {
      marginLeft: 10,
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
      gap: 8
    },
    title: {
      fontSize: 16,
      color: theme.colors.black
    },
    description: {
      fontSize: 13,
      color: theme.colors.grey4
    }

  }
))
