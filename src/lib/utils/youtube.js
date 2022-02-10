import { Linking } from 'react-native';

export default function OpenYoutube() {
  Linking.canOpenURL('vnd.youtube://channel/UCgXncrrjH8ROg9KW9_EIg9A').then((supported) => {
    if (supported) {
      return Linking.openURL('vnd.youtube://channel/UCgXncrrjH8ROg9KW9_EIg9A');
    }
    return Linking.openURL('https://www.youtube.com/channel/UCgXncrrjH8ROg9KW9_EIg9A');
  });
}

export const OpenPlaylist = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }
    return Linking.openURL(url);
  });
};
