import { makeStyles } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import MockData from "./index.mock.json";
import React, {useEffect, useState} from "react";
import { DAppItem } from "@screen/DApp/Components/DAppItem";
import { getActivity } from "@api/home";
import { getDAppGroup } from "@api/dApp";

interface DAppListProps {
  navigation?: any
}

export const DAppList = (props: DAppListProps) => {

  const [dAppGroup, setDAppGroup] = useState<Record<string, any>>({});
  const [activity, setActivity] = useState<Record<string, any>>({});

  const onPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', {params});
  }

useEffect(() => {
  initData();
},[]);

const initData = async () => {
  const activityRes = await getActivity({
    pageNum: "1",
    pageSize: "10",
    status: 1,
  });
  setActivity(activityRes.data);

  const dAppGroupRes = await getDAppGroup({
    pageNum: 1,
    pageSize: 10,
    symbol: 'eth',
    walletLanguage: 'zh_CN',
  });
  setDAppGroup(dAppGroupRes.data);
  console.log('dAppGroup:',dAppGroup);
}

  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 46 }}>
        {
          (dAppGroup?.lists || []).map((v, i) => (
            <DAppItem {...v} key={v.title + String(i)} contentStyles={{ paddingVertical: 14 }} onPress={() => onPress(v)}/>
          ))
        }
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme, props: DAppListProps) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex:1
  }
}))