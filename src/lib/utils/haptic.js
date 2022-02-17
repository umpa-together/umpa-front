import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const hapticTriggerType = Platform.select({
  ios: 'selection',
  android: 'impactMedium',
});

const HapticFeedback = () => {
  ReactNativeHapticFeedback.trigger(hapticTriggerType, hapticOptions);
};

export default HapticFeedback;
