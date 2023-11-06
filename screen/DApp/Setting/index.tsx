import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Setting = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>语言</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#8C8C8C' }}>设置语言版本</Text>
          <MaterialIcons name="chevron-right" size={18} color="gray" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text>查看私钥</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#8C8C8C' }}>设置法币单位</Text>
          <MaterialIcons name="chevron-right" size={18} color="gray" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>备份钱包</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="info" size={18} color="#3B2ACE" />
          <Text style={{ color: '#3B2ACE' }}>未备份</Text>
          <MaterialIcons name="chevron-right" size={18} color="gray" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>修改钱包名</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>查看私钥</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>备份钱包</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>音频/振动权限</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>通讯录权限</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>授权权限</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>用户设置协议</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>用户设置协议</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>隐私协议</Text>
        <MaterialIcons name="chevron-right" size={18} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={{ fontSize: 14, color: 'black' }}>关于</Text>
        <Text style={{ fontSize: 14, color: '#8C8C8C' }}>V7.3.4</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  backText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 20, // to center the title
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
});

export default Setting;
