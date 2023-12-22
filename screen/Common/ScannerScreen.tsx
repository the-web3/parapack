import { useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ScannerScreen = (props) => {
  const handleBarcodeScan = (event) => {
    props?.navigation.navigate('transferPayment', {
      address: event.data,
    });
  };
  const { theme }: { theme: CustomTheme<CustomColors> } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <QRCodeScanner onRead={handleBarcodeScan} />
    </View>
  );
};

export default ScannerScreen;
