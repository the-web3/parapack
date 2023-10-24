import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer

const ReportQuestion = () => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Top 3 Boxes with Icons */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ ...squareBoxStyles, marginRight: 10 }}>
          <Icon name="user" size={30} />
          <Text>Name 1</Text>
        </View>
        <View style={{ ...squareBoxStyles, marginRight: 10 }}>
          <Icon name="user" size={30} />
          <Text>Name 2</Text>
        </View>
        <View style={{ ...squareBoxStyles, marginRight: 10 }}>
          <Icon name="user" size={30} />
          <Text>Name 3</Text>
        </View>
      </View>

      {/* Two Square Boxes with Icons */}
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <View style={{ ...squareBoxStyles, marginRight: 10 }}>
          <Icon name="star" size={30} />
          <Text>Icon 1</Text>
        </View>
        <View style={{ ...squareBoxStyles, marginLeft: 10 }}>
          <Icon name="heart" size={30} />
          <Text>Icon 2</Text>
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>开发者申请</Text>
      </View>

      {/* Review Line */}
      <View style={{ width: 40, height: 40, flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View style={plusBoxStyles}>
          <Text>+</Text>
        </View>
        <Text>Review</Text>
      </View>

      {/* Content Text Input */}
      <View style={contentInputStyles}>
        <TextInput placeholder="Enter your content here" multiline />
      </View>
    </View>
  );
};

// Rest of the styles remain the same as in the previous response
const boxStyles = {
  width: '30%',
  height: 50,
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
};

const squareBoxStyles = {
  width: '30%',
  aspectRatio: 1, // Makes it a square
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
};

const lineStyles = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
};

const plusBoxStyles = {
  width: 30,
  height: 30,
  backgroundColor: 'lightgray',
  justifyContent: 'center',
  alignItems: 'center',
};

const contentInputStyles = {
  borderColor: 'lightgray',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 5,
};
export default ReportQuestion;
