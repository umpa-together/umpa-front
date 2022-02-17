import { Platform } from 'react-native';

export const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const hapticTriggerType = Platform.select({
  ios: 'selection',
  android: 'impactMedium',
});
