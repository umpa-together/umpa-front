/**
 * @format
 */
import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreAllLogs(true);
TrackPlayer.registerPlaybackService(() => require('lib/utils/trackPlayerService'));
LogBox.ignoreLogs(['Sending']);
