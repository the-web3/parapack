import * as React from 'react';
import type { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Input, Text, makeStyles } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
const SearchInput: FC<{
  onChangeText: (newVal: string) => void;
  onCancel: () => void;
  placeholder?: string;
}> = ({ onChangeText, onCancel, placeholder }) => {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <View style={styles.searchBar}>
      <Input
        containerStyle={{ flex: 1 }}
        inputContainerStyle={styles.inputContainer}
        errorProps={{ display: 'none' }}
        inputStyle={{
          fontSize: 12,
        }}
        leftIcon={<Icon name="search1" />}
        placeholder={placeholder || ''}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onCancel}>
        <Text style={{ color: '#333333' }}>取消</Text>
      </TouchableOpacity>
    </View>
  );
};
const useStyles = makeStyles((theme, props: Props) => {
  return {
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      //   paddingTop: 4,
      //   paddingHorizontal: 20,
      //   paddingBottom: 15,
      //   backgroundColor: theme.colors.white,
    },
    inputContainer: {
      // marginHorizontal: 11,
      marginRight: 11,
      paddingHorizontal: 11,
      height: 36,
      minHeight: 36,
      borderRadius: 24,
      borderColor: theme.colors.grey5,
    },
    title: {
      fontSize: 14,
    },
    assetInfo: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginVertical: 13,
    },
    body: {
      backgroundColor: '#fff',
    },
  };
});
export default SearchInput;
