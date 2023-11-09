import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

export const Settings = (props: DAppProps) => {
  const onSetting = () => {
    props?.navigation.navigate('Setting');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg?size=626&ext=jpg',
      }}
      style={{ flex: 10, height: '30%' }}
    >
      <StatusBar
        backgroundColor="#3B28CC" // 替换为你想要的背景颜色
        barStyle="light-content" // 替换为你想要的图标和文字颜色
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', top: 30, left: 20 }}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1987313552.1698824392&semt=sph',
            }}
            style={{ width: 43, height: 43, borderRadius: 40 }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'semibold', color: 'white' }}>我的钱包</Text>
            <TouchableOpacity style={{ marginLeft: 5, marginTop: 11 }}>
              <MaterialIcons name="chevron-right" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ position: 'absolute', top: 50, right: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 21.5,
              width: 96,
              height: 40,
              justifyContent: 'space-between',
              paddingHorizontal: 19,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => onSetting()}>
              <MaterialIcons name="settings" size={19} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="wifi" size={19} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 20,
          height: '82.75%',
        }}
      >
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 20,
              marginBottom: 60,
              marginLeft: 25,
              marginRight: 25,
            }}
          >
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <MaterialIcons name="mail" size={30} color="gray" />
              <Text style={{ marginTop: 10 }}>红包</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <MaterialIcons name="ballot" size={30} color="gray" />
              <Text style={{ marginTop: 10 }}>空投</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <MaterialIcons name="people" size={30} color="gray" />
              <Text style={{ marginTop: 10 }}>邀请</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <MaterialIcons name="scatter-plot" size={30} color="gray" />
              <Text style={{ marginTop: 10 }}>钱包学院</Text>
            </TouchableOpacity>
          </View>

          {/* roww */}
          <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 20, color: 'black' }}>账户</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="people" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black', fontSize: 14 }}>地址本</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="folder" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black', fontSize: 14 }}>云钱包</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="crop-square" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>活动通知</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="request-page" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>备份助记词</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 20,
              marginBottom: 40,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="library-add-check" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>安全与隐私</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 16, color: 'black' }}>我参与的活动</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
            <MaterialIcons name="request-page" size={43} color="gray" />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: 'black', fontWeight: 'regular', fontSize: 13 }}>Bitget合约</Text>
              <Text style={{ color: 'gray', fontSize: 11 }}>在银河系中最受欢迎的去中心化平台上交..</Text>
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="request-page" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black', fontSize: 14 }}>备份助记词</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 20,
              marginBottom: 60,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="library-add-check" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>安全与隐私</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={{ marginLeft: 5, fontWeight: 'bold', fontSize: 16, color: 'black' }}>加入我们</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="request-page" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>备份助记词</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="library-add-check" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>安全与隐私</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="request-page" size={30} color="gray" />
              <Text style={{ marginLeft: 10, color: 'black' }}>备份助记词</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="chevron-right" size={30} color="gray" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Settings;
