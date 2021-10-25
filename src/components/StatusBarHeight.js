import { Platform, StatusBar } from 'react-native';

const StatusBarHeight = Platform.select({
  ios: 44,
  android: StatusBar.currentHeight,
  default: 0,
});

export default StatusBarHeight;
