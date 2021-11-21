import React, { useContext, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Context as AuthContext } from 'context/AuthContext';
import { navigate } from 'lib/utils/navigation';
import { tmpWidth } from 'components/FontNormalize';
import { GoogleSignin } from '@react-native-community/google-signin';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { NaverLogin } from '@react-native-seoul/naver-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import SvgUri from 'react-native-svg-uri';
import jwtDecode from 'jwt-decode';
import * as config from 'config';
import Header from 'components/Header';

const SignUpOpt = () => {
  const { getGoogleInfo, getKakaoInfo, getNaverInfo, getAppleInfo } = useContext(AuthContext);
  const iosKeys = {
    kConsumerKey: config.kConsumerKey,
    kConsumerSecret: config.kConsumerSecret,
    kServiceAppName: 'umpa',
    kServiceAppUrlScheme: 'naverlogin', // only for iOS
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: config.webClientId,
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });
  }, []);
  const naverLogin = (keys) => {
    NaverLogin.login(keys, async (err, token) => {
      await getNaverInfo({ token: token.accessToken });
    });
  };

  const kakaoLogin = async () => {
    await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account]).then(
      async (result) => {
        await getKakaoInfo({ token: result.accessToken });
      },
    );
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
  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(254,254,254)' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 106 * tmpWidth,
        }}
      >
        <Header title="회원가입" />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ width: 194.9 * tmpWidth, height: 119.9 * tmpWidth }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={require('assets/icons/logo.png')}
            />
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.signupbutton}
            onPress={() => navigate('Signup', { email: '', isSNS: false })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SvgUri width="145" height="40" source={require('assets/icons/email.svg')} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: 375 * tmpWidth,
              height: 14 * tmpWidth,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 25 * tmpWidth,
            }}
          >
            <Text style={{ fontSize: 14 * tmpWidth, color: 'rgb(153,153,153)' }}>
              SNS 계정으로 가입하기
            </Text>
          </View>
          <View
            style={{
              width: 240 * tmpWidth,
              height: 60 * tmpWidth,
              marginTop: 11 * tmpWidth,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{ width: 60 * tmpWidth, height: 60 * tmpWidth }}
              onPress={() => googleLogin()}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('assets/icons/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 60 * tmpWidth, height: 60 * tmpWidth }}
              onPress={() => naverLogin(iosKeys)}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('assets/icons/naver.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 60 * tmpWidth, height: 60 * tmpWidth }}
              onPress={() => kakaoLogin()}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('assets/icons/kakao.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 60 * tmpWidth, height: 60 * tmpWidth }}
              onPress={() => appleLogin()}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('assets/icons/apple.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={{ flexDirection: 'row', marginTop: 24 * tmpWidth }}>
          <Text style={{ fontSize: 14 * tmpWidth, color: 'rgb(153,153,153)' }}>
            아이디 / 비밀번호 찾기{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signupbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1 * tmpWidth,
    borderColor: 'rgb(169,193,255)',
    width: 295 * tmpWidth,
    height: 42 * tmpWidth,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 54 * tmpWidth,
  },
  footer: {
    height: 68 * tmpWidth,
    width: 375 * tmpWidth,
    alignItems: 'center',
    borderTopWidth: 1 * tmpWidth,
    borderTopColor: 'rgba(168,193,255,0.1)',
  },
});
export default SignUpOpt;
