import * as React from 'react';
import type { FC } from 'react';
import { Text, Overlay, makeStyles, useTheme } from '@rneui/themed';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootSiblingParent } from 'react-native-root-siblings';

type Props = {
  visible: boolean;
  title: string;
  after?: React.ReactNode;
  children: React.ReactNode;
  onBackdropPress?: () => void;
};

const BottomOverlay: FC<Props> = ({ visible, title, after, onBackdropPress, children }) => {
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();
  const styles = useStyles(theme);
  return (
    <Overlay isVisible={visible} onBackdropPress={onBackdropPress} overlayStyle={styles.container}>
      <RootSiblingParent>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.maskBack} />
        </TouchableWithoutFeedback>
        <View style={styles.contentBox}>
          <View style={styles.containerContent}>
            <TouchableOpacity onPress={onBackdropPress} style={styles.close}>
              <Icon name="closecircleo" style={styles.closeIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>
            {after && after}
          </View>
          <View style={{ maxHeight: 300 }}>
            <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
          </View>
        </View>
      </RootSiblingParent>
    </Overlay>
  );
};
const useStyles = makeStyles((theme: any) => {
  return {
    container: {
      height: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    maskBack: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100%',
    },
    contentBox: {
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
      alignItems: 'center',
      // justifyContent: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      // paddingHorizontal: 32,
      paddingBottom: 12,
      // borderBottomWidth: 1,
      // borderBottomColor: '#E9E9E9',
    },
    title: { color: '#000', fontSize: 14, fontWeight: 500 },
    after: {
      // position: 'absolute', right: 0, top: 6
    },
    close: {
      // position: 'absolute', left: 0, top: 6
    },
    closeIcon: { color: 'rgba(93, 93, 93, 1)', fontSize: 16 },
  };
});
export default BottomOverlay;
