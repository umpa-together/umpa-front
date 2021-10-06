import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as config from 'config'

const instance = axios.create({
  baseURL: config.serverURL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
