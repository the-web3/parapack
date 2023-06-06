/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
const Stack = createNativeStackNavigator();
import { ThemeProvider, createTheme } from '@rneui/themed';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screen/SplashScreen';
import Guide from './screen/Guide';
import CreateWallet from './screen/Asset/CreateWallet';
import StartBackup from './screen/Asset/StartBackup';
import BackupMnemonics from './screen/Asset/BackupMnemonics';
import VerifyMnemonics from './screen/Asset/VerifyMnemonics';
import { defineTheme } from './style/them';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

function App(): JSX.Element {
  const mode = useColorScheme() || 'light';
  const theme = createTheme({
    ...defineTheme,
    mode,
  });
  // const {LightTheme, DarkTheme} = adaptNavigationTheme({
  //   reactNavigationLight: NavigationDefaultTheme,
  //   reactNavigationDark: NavigationDarkTheme,
  // });
  // const theme = {
  //   // ...DefaultTheme,
  //   // Specify custom property
  //   // myOwnProperty: true,
  //   // Specify custom property in nested object
  //   // colors: {
  //   //   myOwnColor: '#BADA55',
  //   // },
  //   // mode: 'exact', // 设置模式为精确匹配
  //   components: {
  //     colors: mode !== 'dark' ? DarkTheme : LightTheme,
  //     Button: {
  //       //   backgroundColor: 'white',
  //       color: 'red',
  //     },
  //     TextInput: {
  //       containerStyle: {
  //         paddingHorizontal: 0,
  //       },
  //       //   inputStyle: {
  //       //     padding: 0,
  //       //   },
  //       inputContainerStyle: {
  //         height: 58,
  //         borderRadius: 9,
  //         borderWidth: 1,
  //         borderColor: '#D7D7FA',
  //       },
  //     },
  //   },
  // };
  // const screenOptions = {
  //   // headerStyle: {
  //   //   backgroundColor: 'blue',
  //   // },
  //   // headerTintColor: 'white',
  //   cardStyle: {
  //     backgroundColor: 'white',
  //   },
  // };
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <NavigationContainer
          theme={
            mode === 'dark'
              ? {
                  dark: true,
                  colors: DarkTheme.colors,
                }
              : {
                  dark: false,
                  colors: DefaultTheme.colors,
                }
          }
        >
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
            {/* <Stack.Screen
            name="创建钱包"
            component={CreateWallet}
            // options={{headerShown: false}}
          />
          <Stack.Screen
            name="开始备份"
            component={StartBackup}
            // options={{headerShown: false}}
          /> */}
            <Stack.Screen name="备份助记词" component={BackupMnemonics} />
            <Stack.Screen name="验证助记词" component={VerifyMnemonics} />
          </Stack.Navigator>

          {/* <SafeAreaView style={backgroundStyle}>
        <Button title="Hey!" />
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            <Section title="Debug">
              <DebugInstructions />
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */}
        </NavigationContainer>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
