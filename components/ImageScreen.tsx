import React from 'react';
// import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { View, Image, TouchableOpacity, PermissionsAndroid, Platform, Alert, Text } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import * as Permissions from 'react-native-permissions';

const ImageScreen = ({ url, styles }) => {
  const getCheckPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };
  const getRequestPermissionPromise = () => {
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  };

  const hasAndroidPermission = async () => {
    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }

    return await getRequestPermissionPromise();
  };

  const saveImage = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    // CameraRoll.save(url, { type: 'photo' });
  };

  return (
    <TouchableOpacity onLongPress={saveImage}>
      <Image source={{ uri: url }} style={styles} />
    </TouchableOpacity>
  );
};

export default ImageScreen;
