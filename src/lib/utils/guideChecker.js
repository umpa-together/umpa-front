import AsyncStorage from '@react-native-async-storage/async-storage';

const guideChecker = async (guide, setGuideModal) => {
  const checker = await AsyncStorage.getItem(guide);
  const currentState = checker === 'true';

  if (!currentState) {
    setGuideModal(guide);
  }
};

export const checkGuide = async (guide) => {
  await AsyncStorage.setItem(guide, 'true');
};

export default guideChecker;
