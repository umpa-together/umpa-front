import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as env from 'constants/app';

const instance = axios.create({
  baseURL: env.serverURL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

export default instance;
