import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import DocumentPicker from 'react-native-document-picker';

const ReportQuestion = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const handlePress = async () => {
    // try {
    //   const result = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.allFiles],
    //   });
    //   console.log(
    //     'URI: ' + result.uri,
    //     'Type: ' + result.type,
    //     'File Name: ' + result.name,
    //     'File Size: ' + result.size
    //   );
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     Alert.alert('File selection was cancelled');
    //   } else {
    //     throw err;
    //   }
    // }
  };
  const [reviewText, setReviewText] = useState('');
  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20, backgroundColor: '#ffffff' }}>
        {/* Four Square Boxes with Icons */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
            }}
            onPress={() => {
              /* Handle button press here */
            }}
          >
            <Icon name="user" size={30} color={isDarkMode ? 'white' : 'black'} />
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>账户问题</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
            }}
            onPress={() => {
              /* Handle button press here */
            }}
          >
            <Icon name="user" size={30} color={isDarkMode ? 'white' : 'black'} />
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>交易问题</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
            }}
            onPress={() => {
              /* Handle button press here */
            }}
          >
            <Icon name="user" size={30} color={isDarkMode ? 'white' : 'black'} />
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>操作体验</Text>
          </TouchableOpacity>
        </View>

        {/* Two Square Boxes with Icons */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginRight: 10,
              backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
            }}
            onPress={() => {
              /* Handle button press here */
            }}
          >
            <Icon name="star" size={30} color={isDarkMode ? 'white' : 'black'} />
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>功能建议</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...squareBoxStyles,
              marginLeft: 10,
              backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
            }}
            onPress={() => {
              /* Handle button press here */
            }}
          >
            <Icon name="heart" size={30} color={isDarkMode ? 'white' : 'black'} />
            <Text style={{ color: isDarkMode ? 'white' : 'black' }}>其它反馈</Text>
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
              color: isDarkMode ? 'white' : 'black',
            }}
          >
            我要反馈
          </Text>
        </View>

        {/* Review Line */}

        <View
          style={{
            ...styles.reviewContainer,
            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
          }}
        >
          <TextInput
            style={{
              ...styles.reviewText,
              color: isDarkMode ? 'white' : 'black',
              marginBottom: 48,
            }}
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="Write your review here"
            placeholderTextColor={isDarkMode ? 'gray' : '#a9a9a9'}
            multiline
          />
          <TouchableOpacity
            style={{
              backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
              marginLeft: 10,
            }}
            onPress={() => {
              /* Handle button press here */
            }}
          >
            <View style={styles.plusBoxStyles}>
              <Text
                style={{
                  ...styles.plusText,
                  color: isDarkMode ? 'white' : 'black',
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
                color: isDarkMode ? 'white' : 'black',
              }}
            >
              联系方式
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 10,
                color: isDarkMode ? 'white' : 'black',
                marginLeft: 10,
              }}
            >
              注：手机号/微信/QQ
            </Text>
          </View>
        </View>

        {/* Content Text Input */}
        <TouchableOpacity
          style={contentInputStyles}
          onPress={() => {
            /* Handle button press here */
          }}
        >
          <TextInput
            placeholder="请留下任意一个联系方式"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            multiline
            style={{
              color: isDarkMode ? 'white' : 'black',
            }}
          />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    height: 180,
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
