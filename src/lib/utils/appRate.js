import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'react-native-store-review';

const OPEN_CYCLE = 5;

const appRate = async () => {
  const countStartApp = await AsyncStorage.getItem('countStartApp');
  const count = countStartApp ? parseInt(countStartApp, 10) : 1;
  if (StoreReview.isAvailable && count % OPEN_CYCLE === 0) {
    setTimeout(() => {
      StoreReview.requestReview();
    }, 2000);
  }
  await AsyncStorage.setItem('countStartApp', `${count + 1}`);
};

export default appRate;
