import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useContext, useEffect } from 'react';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_5 } from 'constants/colors';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import TouchableNoDouble from 'components/TouchableNoDouble';
import { Context as AuthContext } from 'context/Auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import { NaverLogin } from '@react-native-seoul/naver-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import * as env from 'constants/app';

const webclientid = Platform.select({
  ios: env.webClientIdIOS,
  android: env.webClientIdAndroid,
});

const naverid = Platform.select({
  ios: {
    kConsumerKey: env.kConsumerKey,
    kConsumerSecret: env.kConsumerSecret,
    kServiceAppName: 'umpa',
    kServiceAppUrlScheme: 'naverlogin', // only for iOS
  },
  android: {
    kConsumerKey: env.kConsumerKey,
    kConsumerSecret: env.kConsumerSecret,
    kServiceAppName: 'com.umpatogether',
  },
});

export default function SocialLogin() {
  const { getGoogleInfo, getNaverInfo, getKakaoInfo, getAppleInfo } = useContext(AuthContext);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webclientid,
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }, []);

  const naverLogin = () => {
    NaverLogin.login(naverid, async (err, token) => {
      await getNaverInfo({ token: token.accessToken });
    });
  };

  const kakaoLogin = async () => {
    const token = await login();
    await getKakaoInfo({ token: token.accessToken });
  };
  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    await getGoogleInfo({ email: userInfo.user.email, id: userInfo.user.id });
  };

  const appleLogin = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const decodedToken = jwtDecode(appleAuthRequestResponse.identityToken);
        await getAppleInfo({ email: decodedToken.email, id: decodedToken.sub });
      }
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        // login canceled
      } else {
        // login error
      }
    }
  };

  const socialList = [
    { key: 'google', img: require('public/icons/google-login.png'), onClick: googleLogin },
    { key: 'naver', img: require('public/icons/naver-login.png'), onClick: naverLogin },
    { key: 'kakao', img: require('public/icons/kakao-login.png'), onClick: kakaoLogin },
    Platform.OS === 'ios' && {
      key: 'apple',
      img: require('public/icons/apple-login.png'),
      onClick: appleLogin,
    },
  ];
  return (
    <View style={[style.alignCenter, styles.container]}>
      <Text style={styles.title}>소셜 로그인 / 회원가입</Text>
      <View style={[style.flexRow]}>
        {socialList.map((item) => {
          const { key, img, onClick } = item;
          return (
            key && (
              <TouchableNoDouble style={styles.iconMargin} key={key} onPress={onClick}>
                <Icon source={img} style={styles.icon} />
              </TouchableNoDouble>
            )
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 61 * SCALE_HEIGHT,
  },
  iconMargin: {
    marginTop: 19.5 * SCALE_HEIGHT,
    marginRight: 14 * SCALE_WIDTH,
  },
  title: {
    fontSize: FS(12),
    color: COLOR_5,
  },
  icon: {
    width: 58 * SCALE_WIDTH,
    height: 58 * SCALE_WIDTH,
  },
});
