import * as React from 'react';
import type { FC } from 'react';
import { Text, Overlay, makeStyles, useTheme } from '@rneui/themed';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onBackdropPress?: () => void;
};

const BottomOverlay: FC<Props> = ({ visible, title, onBackdropPress, children }) => {
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const styles = useStyles(theme);
  return (
    <Overlay isVisible={visible} onBackdropPress={onBackdropPress} overlayStyle={styles.container}>
      <>
        <View style={styles.containerContent}>
          <TouchableOpacity onPress={onBackdropPress} style={styles.close}>
            <Icon name="closecircleo" style={styles.closeIcon} />
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ maxHeight: 300 }}>
          <ScrollView>{children}</ScrollView>
        </View>
      </>
    </Overlay>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    containerContent: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      position: 'relative',
      // paddingHorizontal: 32,
      paddingBottom: 12,
      // borderBottomWidth: 1,
      // borderBottomColor: '#E9E9E9',
    },
    title: { color: '#000', fontSize: 14, fontWeight: 500 },
    close: { position: 'absolute', left: 0, top: 6 },
    closeIcon: { color: 'rgba(93, 93, 93, 1)', fontSize: 16 },
  };
});
export default BottomOverlay;