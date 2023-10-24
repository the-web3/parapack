import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Box = () => {
  return <View style={styles.box} />;
};

type UploadProps = {
  onUpload: () => void;
};

const Upload = ({ onUpload }: UploadProps) => {
  return (
    <View style={styles.uploadBox}>
      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const ReportQuestion = () => {
  const handleUpload = () => {
    alert('File upload triggered!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} />
        ))}
      </View>
      <View style={[styles.boxContainer, { justifyContent: 'space-between' }]}>
        {[...Array(2)].map((_, index) => (
          <Box key={index + 3} />
        ))}
      </View>

      <Upload onUpload={handleUpload} />
      <TextInput style={styles.textInput} placeholder="Enter text..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    flex: 1,
    backgroundColor: 'gray',
    marginHorizontal: 5,
    borderRadius: 10,
    height: 60,
  },
  uploadBox: {
    height: 60,
    borderRadius: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  uploadButtonText: {
    color: 'gray',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default ReportQuestion;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
