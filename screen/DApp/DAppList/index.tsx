import { makeStyles } from '@rneui/themed';
import { ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DAppItem } from '@screen/DApp/Components/DAppItem';
import { getActivity } from '@api/home';
import { getDAppGroup } from '@api/dApp';

interface DAppListProps {
  navigation?: any;
}

export const DAppList = (props: DAppListProps) => {
  // const [dAppGroup, setDAppGroup] = useState<Record<string, any>>({});
  // const [activity, setActivity] = useState<Record<string, any>>({});
  const [dAppData, setDAppData] = useState<Record<string, any>>({});

  const onPress = (params: any) => {
    props?.navigation.navigate('DAppDetail', { params });
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const { type, tag } = props.route?.params.params;
    let sourceData;
    if (type == 'group') {
      let params = {
        pageNum: 1,
        pageSize: 50,
        symbol: 'eth',
      };
      if (tag) {
        params = { ...params, tag } as any;
      }

      sourceData = await getDAppGroup(params);
      console.warn('sourceData222:', sourceData);
    } else if (type === 'activity') {
      let params = {
        pageNum: '1',
        pageSize: '50',
        status: 1,
      };
      if (tag) {
        params = { ...params, tag } as any;
      }
      sourceData = await getActivity(params);
    }
    console.warn('sourceData11:', sourceData);
    setDAppData(sourceData?.data);
  };

  const styles = useStyles(props);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 46 }}>
        {(dAppData?.lists || []).map((v, i) => (
          <DAppItem
            {...v}
            key={v.title + String(i)}
            contentStyles={{ paddingVertical: 14 }}
            onPress={() => onPress(v)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme, props: DAppListProps) => ({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
}));
