import React, { useState } from 'react';
import { View, Image,ScrollView } from "react-native";
import { makeStyles } from "@rneui/themed";

interface DAppProps {

}

export const DAppScreen = (props: DAppProps) => {

  const style = useStyles(props);
  return (
    <View style={style.container}>
      <View style={style.banner}>
      </View>
      <View style={style.notice}>
        <Image style={style.noticeIcon}/>
        <Text>据CoinDesk 4月 17日报道, 美国纽约吧啦吧吧吧吧吧</Text>
        <Image style={style.noticeIcon}/>
      </View>
      <ScrollView>

      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme, props: Props) => {
  return {
    container: {
      backgroundColor: theme.colors.white,
      flex: 1,
    },
    banner: {
      height: 150,
      padding: 20,
      borderRadius: 10,
    },
    notice: {
      width: '100%',
      height: 40,
      flexDirection: "row",
    },
    noticeIcon: {
      width: 40,
      height: 40,
      backgroundColor: theme.colors.grey1,
      borderRadius:5
    }

  };
});
