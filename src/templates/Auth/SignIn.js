import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Context as AuthContext } from 'context/Auth';
import { navigate } from 'lib/utils/navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import { NaverLogin } from '@react-native-seoul/naver-login';
import appleAuth from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import * as env from 'constants/app';
import FastImage from 'react-native-fast-image';

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

const SignIn = () => {
  const { state, signIn, getGoogleInfo, getNaverInfo, getKakaoInfo, getAppleInfo } =
    useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webclientid,
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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(254,254,254)' }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 15,
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: 194.9, height: 119.9 }}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('public/icons/logo.png')}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.email}>
            <TextInput
              value={email}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="rgb(196,196,196)"
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ marginLeft: 17, width: 251, height: 42 }}
            />
          </View>
          <View style={styles.password}>
            <TextInput
              value={password}
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor="rgb(196,196,196)"
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ marginLeft: 17, width: 251, height: 42 }}
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.login} onPress={() => signIn({ email, password })}>
            <Text style={{ fontSize: 16, color: 'rgb(255,255,255)' }}>로그인</Text>
          </TouchableOpacity>
          <View style={{ height: 22, justifyContent: 'center' }}>
            {state.errorMessage ? (
              <Text style={{ color: 'red', fontSize: 12 }}>{state.errorMessage}</Text>
            ) : null}
          </View>
          <View
            style={{
              width: 375,
              height: 14,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: 'rgb(169,193,255)' }}>아이디 / 비밀번호 찾기</Text>
          </View>
          <View
            style={{
              width: 240,
              height: 60,
              marginTop: 19,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity style={{ width: 60, height: 60 }} onPress={() => googleLogin()}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('public/icons/google.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, height: 60 }} onPress={() => naverLogin(naverid)}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('../../public/icons/naver.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, height: 60 }} onPress={() => kakaoLogin()}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('public/icons/kakao.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, height: 60 }} onPress={() => appleLogin()}>
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={require('public/icons/apple.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', marginTop: 24 }}>
          <Text style={{ fontSize: 14, color: 'rgb(153,153,153)' }}>계정이 없으신가요? </Text>
          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgb(168,192,239)' }}>
              <Text style={{ fontSize: 14, color: 'rgb(169,193,255)' }}>회원가입</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logotext: {
    fontSize: 52,
    color: 'rgb(168,192,239)',
    fontWeight: 'bold',
    marginLeft: 116,
  },
  email: {
    width: 285,
    height: 42,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(169,193,255,0.8)',
  },
  password: {
    marginTop: 10,
    width: 285,
    height: 42,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(169,193,255,0.8)',
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 285,
    height: 42,
    backgroundColor: 'rgb(169,193,255)',
    borderRadius: 100,
    marginTop: 10,
  },
  footer: {
    height: 68,
    width: 375,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(168,193,255,0.1)',
  },
});
export default SignIn;
