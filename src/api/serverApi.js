import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const instance = axios.create({
  baseURL: 'http://5c79-211-200-53-218.ngrok.io',
  //http://13.124.243.48
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
