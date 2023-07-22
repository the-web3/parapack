import { SUCCESS_CODE } from '@common/constants';
import axios from 'axios';
import Toast from 'react-native-toast-message';
const instance = axios.create({
  baseURL: 'http://walletapi.parapack.net/wallet-app-api',
  timeout: 5000,
  // withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.code !== SUCCESS_CODE) {
      Toast.show({
        type: 'error',
        text1: response.data.msg,
      });
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
