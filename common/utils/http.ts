import { SUCCESS_CODE } from '@common/constants';
import axios from 'axios';
import { showToast } from './platform';
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
      showToast(response.data.msg);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
