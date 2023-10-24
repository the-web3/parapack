import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, useColorScheme, Appearance } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReportQuestion = () => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Top 3 Boxes with Icons */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View
          style={{
            ...squareBoxStyles,
            marginRight: 10,
            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
          }}
        >
          <Icon name="user" size={30} color={isDarkMode ? 'white' : 'black'} />
          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>页面闪退</Text>
        </View>
        <View
          style={{
            ...squareBoxStyles,
            marginRight: 10,
            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
          }}
        >
          <Icon name="user" size={30} color={isDarkMode ? 'white' : 'black'} />
          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>交易问题</Text>
        </View>
        <View
          style={{
            ...squareBoxStyles,
            marginRight: 10,
            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
          }}
        >
          <Icon name="user" size={30} color={isDarkMode ? 'white' : 'black'} />
          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>操作体验</Text>
        </View>
      </View>

      {/* Two Square Boxes with Icons */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View
          style={{
            ...squareBoxStyles,
            marginRight: 10,
            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
          }}
        >
          <Icon name="star" size={30} color={isDarkMode ? 'white' : 'black'} />
          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>功能建议</Text>
        </View>
        <View
          style={{
            ...squareBoxStyles,
            marginLeft: 10,
            backgroundColor: isDarkMode ? '#444' : '#f5f5f5',
          }}
        >
          <Icon name="heart" size={30} color={isDarkMode ? 'white' : 'black'} />
          <Text style={{ color: isDarkMode ? 'white' : 'black' }}>其它反馈</Text>
        </View>
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
        <View style={styles.lineStyles}>
          <Text
            style={{
              ...styles.reviewText,
              color: isDarkMode ? 'white' : 'black',
              marginBottom: 48,
            }}
          >
            Review
          </Text>
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
        </View>
      </View>

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
      <View style={contentInputStyles}>
        <TextInput
          placeholder="请留下任意一个联系方式"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          multiline
          style={{
            color: isDarkMode ? 'white' : 'black',
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            /* Handle button press here */
          }}
        >
          <Text style={styles.buttonText}>提交</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingHorizontal: 20,
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
