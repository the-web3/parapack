import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

const NewsArticle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>在线销售额全国领先，降低计算成本能够帮助您的企业和顾客。</Text>
      <Text style={styles.date}>2023-10-29 14:21:32</Text>
      <Image
        source={{ uri: 'URL_TO_YOUR_IMAGE' }} // replace with your image URL
        style={styles.image}
      />
      <Text style={styles.content}>
        2021年9月19日 - 2021年10月8日之間的離線，實際銷售額，每個星期只賣了3500美金,
        每個星期只賣了7000美金，提升至目標最重要的時候大約是每次大會。
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.baidu.com/sie-utf-8...')}>
        <Text style={styles.link}>点击查看更多详情</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>市场部 2023年8月25日</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 20,
  },
  footer: {
    fontSize: 14,
    color: '#666',
  },
});

export default NewsArticle;
