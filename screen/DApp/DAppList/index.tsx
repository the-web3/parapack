import { makeStyles } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import MockData from "./index.mock.json";
import React from "react";
import { DAppItem } from "@screen/DApp/Components/DAppItem";

interface DAppListProps {
  navigation?: any
}

export const DAppList = (props: DAppListProps) => {

  const onPress = () => {
    props?.navigation.navigate('DAppDetail');
  }

  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 46 }}>
        {
          MockData.map((v, i) => (
            <DAppItem {...v} key={v.title + String(i)} contentStyles={{ paddingVertical: 14 }} onPress={onPress}/>
          ))
        }
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme, props: DAppListProps) => ({
  container: {
    backgroundColor: theme.colors.white
  }
}))