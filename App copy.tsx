import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Guide from './screen/Guide';
import Home from './screen/Home';
import SplashScreen from './screen/SplashScreen';
import CreateWallet from './screen/Asset/CreateWallet';
import BackupMnemonics from './screen/Asset/BackupMnemonics';
import StartBackup from './screen/Asset/StartBackup';
import VerifyMnemonics from './screen/Asset/VerifyMnemonics';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Guide"
          options={{headerShown: false}}
          component={Guide}
        /> */}
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="创建钱包" component={CreateWallet} />
        <Stack.Screen name="开始备份" component={StartBackup} />
        <Stack.Screen name="备份助记词" component={BackupMnemonics} />
        <Stack.Screen name="验证助记词" component={VerifyMnemonics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
