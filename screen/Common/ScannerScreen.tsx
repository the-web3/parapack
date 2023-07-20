import React, { useState } from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScannerScreen = (props) => {
  const handleBarcodeScan = (event) => {
    props?.navigation.navigate('transferPayment', {
      address: event.data,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <QRCodeScanner onRead={handleBarcodeScan} />
    </View>
  );
};

export default ScannerScreen;
