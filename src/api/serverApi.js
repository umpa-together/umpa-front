import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const instance = axios.create({
  baseURL: 'http://104a-175-193-213-153.ngrok.io',
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
