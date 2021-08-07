import { Platform, StatusBar } from 'react-native';

export const StatusBarHeight = Platform.select({
    ios: 44,
    android: StatusBar.currentHeight,
    default: 0
})