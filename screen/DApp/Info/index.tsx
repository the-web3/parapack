import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoComponent = () => {
  const data = [
    {
      title: '閥杆不佳使桶嘴新和安全性提醒的通知',
      time: '2023年8月28日22:00 - 8月29日11:00am',
      timestamp: '2022年7月6日 10:36:21',
    },
    {
      title: '閥月系統更新，發佈公告',
      time: '一, 无佳使桶嘴更新',
      timestamp: '2022年7月6日 10:36:21',
    },
  ];

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.infoBox}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  infoBox: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    marginTop: 10,
    fontSize: 16,
  },
  timestamp: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
});

export default InfoComponent;
