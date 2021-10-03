import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text,Image, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Context as AuthContext } from 'context/AuthContext';
import { navigate } from 'navigationRef';
import { GoogleSignin } from '@react-native-community/google-signin';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import { NaverLogin } from "@react-native-seoul/naver-login";
import { tmpWidth } from 'components/FontNormalize';
import appleAuth from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import * as config from 'config'

const SigninScreen = () => {
    const { state, signin, getGoogleInfo, getKakaoInfo, getNaverInfo, getAppleInfo,clearErrorMessage } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const iosKeys = {
        kConsumerKey: config.kConsumerKey,
        kConsumerSecret: config.kConsumerSecret,
        kServiceAppName: "umpa",
        kServiceAppUrlScheme: "naverlogin" // only for iOS
      };
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true, 
            hostedDomain: '', 
            forceConsentPrompt: true, 
        });
        TrackPlayer.setupPlayer({waitForBuffer: true}).then(async() => {
            await TrackPlayer.updateOptions({
                stopWithApp: false,
                capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE, TrackPlayer.CAPABILITY_STOP],
                compactCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP,
                ],
                notificationCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP,
                ],
            });        
        }); 
    }, []);
    const naverLogin = (iosKeys) => {
        NaverLogin.login(iosKeys, async (err, token) => {
            await getNaverInfo({ token: token.accessToken });
        });
    };

    const kakaoLogin = () => {
        KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
        .then(async (result) => {
            await getKakaoInfo({ token: result.accessToken });
        })
    };
    const googleLogin = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await getGoogleInfo({email: userInfo.user.email, id: userInfo.user.id})
    };
    const appleLogin = async() => {
        try {
            // performs login request
             const appleAuthRequestResponse = await appleAuth.performRequest({
               requestedOperation: appleAuth.Operation.LOGIN,
               requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
             });
           
             // get current authentication state for user
             const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
           
             // use credentialState response to ensure the user is authenticated
             if (credentialState === appleAuth.State.AUTHORIZED) {
                const decodedToken = jwtDecode(appleAuthRequestResponse.identityToken);
                await getAppleInfo({email: decodedToken.email, id: decodedToken.sub});

                  
             }
           
           } catch (error) {
               if (error.code === appleAuth.Error.CANCELED) {
                   // login canceled
               } else {
                   // login error
               }
        }
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor:'rgb(254,254,254)'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 15 * tmpWidth}}>
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{width: 194.9*tmpWidth, height: 119.9 * tmpWidth}}>
                        <Image style={{width:'100%', height:'100%'}} source={require('assets/icons/logo.png')} />
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.email}>
                        <TextInput 
                            value={email}
                            placeholder="이메일을 입력해주세요"
                            placeholderTextColor='rgb(196,196,196)'
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{marginLeft:17 * tmpWidth,width:251 * tmpWidth, height:42 * tmpWidth}}
                        />
                    </View>
                    <View style={styles.password}>
                        <TextInput 
                            value={password}
                            placeholder="비밀번호를 입력해주세요"
                            placeholderTextColor='rgb(196,196,196)'
                            onChangeText={setPassword}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{marginLeft:17 * tmpWidth,width:251 * tmpWidth, height:42 * tmpWidth}}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.login} onPress={() => signin({ email, password })}>
                        <Text style={{fontSize:16 * tmpWidth, color:'rgb(255,255,255)'}}>로그인</Text>
                    </TouchableOpacity>
                    <View style={{height:22 * tmpWidth, justifyContent:'center'}}>
                    {state.errorMessage ? <Text style={{color:'red',fontSize:12 * tmpWidth }}>{state.errorMessage}</Text> : null}
                    </View>
                    <View style={{width:375 * tmpWidth, height:14 * tmpWidth, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:12 * tmpWidth, color:'rgb(169,193,255)'}}>아이디 / 비밀번호 찾기</Text>
                    </View>
                    <View style={{width:240 * tmpWidth, height:60 * tmpWidth, marginTop:19 * tmpWidth, flexDirection:'row'}}>
                        <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth}} onPress={() => googleLogin()}  >
                          <Image style={{width:'100%', height:'100%'}} source={require('assets/icons/google.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth,}} onPress={() => naverLogin(iosKeys)}>
                          <Image style={{width:'100%', height:'100%'}} source={require('assets/icons/naver.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth}} onPress={() => kakaoLogin()}>
                          <Image style={{width:'100%', height:'100%'}} source={require('assets/icons/kakao.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth}} onPress={() => appleLogin()}  >
                            <Image style={{width:'100%', height:'100%'}} source={require('assets/icons/apple.png')} />
                        </TouchableOpacity>  
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={{flexDirection:'row', marginTop: 24* tmpWidth}}>
                <Text style={{fontSize:14 * tmpWidth, color:'rgb(153,153,153)'}}>계정이 없으신가요?  </Text>
                <TouchableOpacity onPress={() => navigate('Signupopt')} >
                    <View style={{ borderBottomWidth:1 * tmpWidth, borderBottomColor:'rgb(168,192,239)'}}>
                        <Text style={{fontSize:14 * tmpWidth, color:'rgb(169,193,255)'}}>회원가입</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logotext:{
        fontSize:52 * tmpWidth,
        color:'rgb(168,192,239)',
        fontWeight:'bold',
        marginLeft:116 * tmpWidth
    },
    email:{
        width:285 * tmpWidth,
        height:42 * tmpWidth,
        borderRadius:100 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgba(169,193,255,0.8)',
    },
    password:{
        marginTop:10 * tmpWidth,
        width:285 * tmpWidth,
        height:42 * tmpWidth,
        borderRadius:100 * tmpWidth,
        borderWidth:1 * tmpWidth,
        borderColor:'rgba(169,193,255,0.8)',
    },
    login:{
        justifyContent:'center',
        alignItems:'center',
        width:285 * tmpWidth,
        height:42 * tmpWidth,
        backgroundColor:'rgb(169,193,255)',
        borderRadius:100 * tmpWidth,
        marginTop:10 * tmpWidth
    },
    footer:{
        height: 68 * tmpWidth,
        width:375 * tmpWidth,
        alignItems:'center',
        borderTopWidth:1 * tmpWidth,
        borderTopColor:'rgba(168,193,255,0.1)',
    },

});
export default SigninScreen;