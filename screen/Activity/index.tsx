import Layout from '@components/Layout';
import { Button } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';

const Activity = ({ navigation }) => {
  return (
    <Layout>
      <Button
        onPress={() => {
          navigation.navigate('createWallet');
        }}
      >
        活动详情
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  logo: {},
});

export default Activity;
