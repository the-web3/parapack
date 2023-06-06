import * as React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const Screen1 = () => {
  return <Text>11111</Text>;
};
const Screen2 = () => {
  return <Text>22222</Text>;
};
const Screen3 = () => {
  return <Text>33333</Text>;
};
const Home = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* <Tab.Navigator>
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
      </Tab.Navigator> */}
    </View>
  );
};

export default Home;
