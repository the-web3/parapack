import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import ImagePicker, { ImageLibraryOptions, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import IconFont from '@assets/iconfont';
import Layout from '@components/Layout';
import { report } from '@api/dApp';
import Icon from 'react-native-vector-icons/AntDesign';
import { SUCCESS_CODE } from '@common/constants';
import { showToast } from '@common/utils/platform';
const FormData = require('form-data');

interface DAppProps {
  navigation?: any;
  mode?: string;
}
const typeList = [
  {
    icon: 'a-21',
    text: '页面闪退',
    type: 'broken',
  },
  {
    icon: 'a-22',
    text: '交易问题',
    type: 'trade',
  },
  {
    icon: 'a-23',
    text: '操作体验',
    type: 'operate',
  },
  {
    icon: 'a-24',
    text: '功能建议',
    type: 'suggestion',
  },
  {
    icon: 'a-25',
    text: '其他反馈',
    type: 'other',
  },
];
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
        setImgs([...imgs, source]);
      }
    });
  };

  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');

  const handlePress = async () => {
    const typeToSubmit = type || 'defaultType';
    const [device_id] = await Promise.all([getUniqueId()]);
    const formdata = new FormData();
    formdata.append('type', typeToSubmit);
    formdata.append('content', content);
    formdata.append('contact', contact);
    formdata.append('deviceId', device_id);

    if (imgs.length === 0) {
      // formdata.append('imgs', null);
    } else {
      imgs.forEach(async (filePath, index) => {
        try {
          const uriParts = filePath.uri.split('.');
          const fileType = uriParts[uriParts.length - 1];
          formdata.append(`imgs`, {
            uri: filePath.uri,
            type: `image/${fileType}`,
            name: `photo${index}.${fileType}`,
          });
        } catch (e) {
          console.log(111111, e);
        }
      });
    }
    // console.log('Submitting data:', JSON.stringify(formdata));
    report(formdata)
      .then((response) => {
        // console.log('Response data:', JSON.stringify(response));
        // console.log('Data is Submitted', { response });
        if (response?.code === SUCCESS_CODE) {
          showToast('提交成功!', {
            onHide: () => {
              props?.navigation?.navigate('home', {
                tab: 'ecology',
              });
            },
          });
        }
      })
      .catch((error) => {
        console.error('Error Response:', JSON.stringify(error));
      });
  };
  const removeImage = (index) => {
    const updatedImageList = [...imgs];
    updatedImageList.splice(index, 1);
    setImgs(updatedImageList);
  };
  return (
    <Layout>
      <SafeAreaView>
        <View style={{ flex: 1, backgroundColor: '#ffffff', marginBottom: 100 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {typeList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.type}
                  style={{
                    ...squareBoxStyles,
                    backgroundColor: type === item.type ? '#d9f7be' : '#f5f5f5',
                  }}
                  onPress={() => {
                    setType(item.type);
                  }}
                >
                  <IconFont name={item.icon} size={16} style={{ marginBottom: 9 }} />
                  <Text style={{ color: '#999b9a' }}>{item.text}</Text>
                </TouchableOpacity>
              );
            })}
            <View style={{ width: '30%' }} />
          </View>

          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 20,
                color: 'black',
                marginTop: 30,
              }}
            >
              我要反馈
            </Text>
          </View>

          <View
            style={{
              ...styles.reviewContainer,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingHorizontal: 15,
            }}
          >
            <TextInput
              style={{
                color: '#999b9a',
                fontSize: 16,
                paddingVertical: 20,
              }}
              value={content}
              onChangeText={setContent}
              placeholder="Write your review here"
              placeholderTextColor={'#999b9a'}
              multiline
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: 40,
                marginBottom: 15,
              }}
            >
              {imgs?.map((item, i) => (
                <View key={i} style={{ position: 'relative' }}>
                  <Image source={{ uri: item?.uri }} style={styles.imgs} />
                  <TouchableOpacity onPress={removeImage} style={{ position: 'absolute', top: 4, right: 16 }}>
                    <Icon name="closecircleo" style={{ color: '#fff' }} />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={{}} onPress={handleImagePicker}>
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
              {(imgs.length + 1) % 3 === 0 ? null : <View style={styles.imgs} />}
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 30 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'black',
                }}
              >
                联系方式
              </Text>
              <Text
                style={{
                  fontSize: 12,
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
                marginLeft: 15,
                color: 'black',
              }}
            />
          </View>
          <Button onPress={handlePress}>提交</Button>
        </View>
      </SafeAreaView>
    </Layout>
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
    marginBottom: 10,
    marginRight: 10,
  },
  imgs: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },

  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginBottom: 15,
  paddingVertical: 15,
};

export default ReportQuestion;
