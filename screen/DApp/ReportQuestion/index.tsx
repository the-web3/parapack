import { SUCCESS_CODE } from '@common/constants';
import instance from '@common/utils/http';
import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker, { ImageLibraryOptions, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';

interface DAppProps {
  navigation?: any;
  mode?: string;
}

const ReportQuestion = (props: DAppProps) => {
  const [imgs, setImgs] = useState<Array<string>>([]);

  const handleImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        console.log('response', source);
        setImgs([...imgs, source]);
      }
    });
  };

  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');

  const handlePress = async () => {
    const typeToSubmit = type || 'defaultType';
    console.log('Submitting type:', typeToSubmit); // Debug log
    const [device_id] = await Promise.all([getUniqueId()]);
    const formData = new FormData();
    formData.append('type', typeToSubmit);
    formData.append('content', content);
    formData.append('contact', contact);
    formData.append('deviceId', device_id);

    if (imgs.length === 0) {
      formData.append('imgs', null);
    } else {
      imgs.forEach((img, index) => {
        formData.append(`imgs[${index}]`, img);
      });
    }

    console.log('Submitting data:', formData);

    instance
      .post('/issue', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 设置正确的内容类型
        },
      })
      .then((response) => {
        console.log('Response data:', response);
        if (response?.code === SUCCESS_CODE) {
          props?.navigate('home', {
            tab: 'ecology',
          });
        }
      })
      .catch((error) => {
        console.error('Error Response:', error.response);
        console.error('Error Details:', error.message);
      });
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}>
        {/* Four Square Boxes with Icons */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: type === '账户问题' ? '#d9f7be' : '#f5f5f5',
              borderRadius: 4,
            }}
            onPress={() => {
              setType(type === '账户问题' ? '' : '账户问题');
            }}
          >
            <Image
              source={require('assets/images/Electric.png')}
              style={{ width: 30, height: 30, tintColor: '#999b9a' }}
            />
            <Text style={{ color: '#999b9a' }}>账户问题</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: type === '交易问题' ? '#d9f7be' : '#f5f5f5',
              borderRadius: 4,
            }}
            onPress={() => {
              setType(type === '交易问题' ? '' : '交易问题');
            }}
          >
            <Image source={require('assets/images/mode.png')} style={{ width: 30, height: 30, tintColor: '#999b9a' }} />
            <Text style={{ color: '#999b9a' }}>交易问题</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: type === '操作体验' ? '#d9f7be' : '#f5f5f5',
              borderRadius: 4,
            }}
            onPress={() => {
              setType(type === '操作体验' ? '' : '操作体验');
            }}
          >
            <Image
              source={require('assets/images/telegram.png')}
              style={{ width: 30, height: 30, tintColor: '#999b9a' }}
            />
            <Text style={{ color: '#999b9a' }}>操作体验</Text>
          </TouchableOpacity>
        </View>

        {/* Two Square Boxes with Icons */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: type === '功能建议' ? '#d9f7be' : '#f5f5f5',
              borderRadius: 4,
            }}
            onPress={() => {
              setType(type === '功能建议' ? '' : '功能建议');
            }}
          >
            <Image
              source={require('assets/images/icons.png')}
              style={{ width: 30, height: 30, tintColor: '#999b9a' }}
            />
            <Text style={{ color: '#999b9a' }}>功能建议</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: type === '其它反馈' ? '#d9f7be' : '#f5f5f5',
              borderRadius: 4,
            }}
            onPress={() => {
              setType(type === '其它反馈' ? '' : '其它反馈');
            }}
          >
            <MaterialIcons name="mail" size={30} color={'#999b9a'} />
            <Text style={{ color: '#999b9a' }}>其它反馈</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            padding: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
              color: 'black',
            }}
          >
            我要反馈
          </Text>
        </View>

        {/* Review Line */}

        <View
          style={{
            ...styles.reviewContainer,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            height: 200,
            width: 320,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <TextInput
            style={{
              ...styles.reviewText,
              color: '#999b9a',
              marginBottom: 10,
              marginLeft: 15,
              fontSize: 16,
              padding: 10,
            }}
            value={content}
            onChangeText={setContent}
            placeholder="Write your review here"
            placeholderTextColor={'#999b9a'}
            multiline
          />
          <TouchableOpacity
            style={{
              marginLeft: 15,
              marginTop: 40,
              marginBottom: 15,
            }}
            onPress={() => {
              handleImagePicker();
              console.log('Image picker pressed');
            }}
          >
            <View style={styles.plusBoxStyles}>
              <Text
                style={{
                  ...styles.plusText,
                  color: '#999b9a',
                }}
              >
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* </View> */}

        <View
          style={{
            padding: 10,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
                color: 'black',
              }}
            >
              联系方式
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 10,
                color: 'black',
                marginLeft: 10,
              }}
            >
              注：手机号/微信/QQ
            </Text>
          </View>
        </View>

        {/* Content Text Input */}
        <View
          style={{
            ...styles.reviewContainers,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            marginBottom: 40.5,
          }}
        >
          <TextInput
            placeholder="请留下任意一个联系方式"
            placeholderTextColor={'#555'}
            multiline
            onChangeText={setContact}
            value={contact}
            style={{
              marginLeft: 16,
              color: 'black',
            }}
          />
        </View>
        <Button onPress={handlePress}>提交</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
  },

  reviewContainers: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    height: 44,
  },

  lineStyles: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    width: '80%',
    height: 100,
    borderRadius: 10,
  },
  plusBoxStyles: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: 'black',
  },

  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  reviewText: {
    fontSize: 18,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonStyle: {
    backgroundColor: 'blue',
    paddingHorizontal: 6.2,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 315,
    textAlign: 'center',
    borderRadius: 10,
  },
});

const squareBoxStyles = {
  width: '30%',
  aspectRatio: 1,
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
};

const contentInputStyles = {
  borderColor: 'lightgray',
  borderWidth: 1,
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
};
export default ReportQuestion;
