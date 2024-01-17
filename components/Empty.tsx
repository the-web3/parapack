import * as React from 'react';
import type { FC } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { Text, makeStyles, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

const Empty: FC<any> = ({ text }) => {
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const styles = useStyles(theme);
  const { t } = useTranslation();
  return (
    <View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Image
            // source={BASE_URI}
            source={require('@assets/images/emptyRecord.png')}
            style={styles.img}
            // containerStyle={styles.item}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <Text style={{ fontSize: 10, marginTop: 18, marginBottom: 28, color: '#AEAEAE' }}>
          {' '}
          {text || t(`common.emptyTransaction`)}
        </Text>
      </View>
    </View>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    img: {
      width: 156,
      height: 102,
      aspectRatio: 1,
      marginTop: 50,
    },
  };
});
export default Empty;
