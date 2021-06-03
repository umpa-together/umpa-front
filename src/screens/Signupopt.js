import React, { useContext, useEffect } from 'react';
import { View, Image,StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { navigate } from '../navigationRef';
import { tmpWidth } from '../components/FontNormalize';
import { GoogleSignin } from '@react-native-community/google-signin';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import { NaverLogin } from "@react-native-seoul/naver-login";


import SvgUri from 'react-native-svg-uri';

const Signupopt = () => {
    const { getGoogleInfo, getKakaoInfo, getNaverInfo } = useContext(AuthContext);
    const iosKeys = {
        kConsumerKey: "O2vg3UJdkCPHv1RFRbWo",
        kConsumerSecret: "6UI8oEPz6O",
        kServiceAppName: "umpa",
        kServiceAppUrlScheme: "naverlogin" // only for iOS
      };
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '217008100787-dmpqcjn1lj44u5jr124rhqaomhol8ic6.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
        });
    }, []);
    const naverLogin = (iosKeys) => {
        NaverLogin.login(iosKeys, async (err, token) => {
            await getNaverInfo({ token: token.accessToken });
        });
    };

    const kakaoLogin = async() => {
        KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
        .then(async (result) => {
            console.log(result);
            await getKakaoInfo({ token: result.accessToken });
        })
    };
    const googleLogin = async () => {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await getGoogleInfo({email: userInfo.user.email, id: userInfo.user.id});
    };
    return (
        <View style={{flex: 1, backgroundColor:'rgb(254,254,254)'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 106 * tmpWidth}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{width: 194.9*tmpWidth, height: 119.9 * tmpWidth}}>
                        <Image style={{width:'100%', height:'100%'}} source={require('../assets/icons/loadingLogo.png')} />
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.signupbutton} onPress={() => navigate('Signup', { email: '', isSNS: false })}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <SvgUri width= '145' height='40' source={require('../assets/icons/email.svg')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{width:375 * tmpWidth, height:14 * tmpWidth, justifyContent:'center', alignItems:'center', flexDirection: 'row',marginTop: 25 * tmpWidth,}}>
                        <Text style={{fontSize:14 * tmpWidth, color: 'rgb(153,153,153)'}}>SNS 계정으로 가입하기</Text>
                    </View>
                    <View style={{width:180 * tmpWidth, height:60 * tmpWidth, marginTop:11 * tmpWidth, flexDirection:'row'}}>
                    <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth}} onPress={() => googleLogin()}  >
                      <Image style={{width:'100%', height:'100%'}} source={require('../assets/icons/google.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth,}} onPress={() => naverLogin(iosKeys)}>
                      <Image style={{width:'100%', height:'100%'}} source={require('../assets/icons/naver.png')} />
                      </TouchableOpacity>
                    <TouchableOpacity style={{width:60 * tmpWidth, height:60 * tmpWidth}} onPress={() => kakaoLogin()}>
                      <Image style={{width:'100%', height:'100%'}} source={require('../assets/icons/kakao.png')} />
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{flexDirection:'row', marginTop: 24* tmpWidth}}>
                    <Text style={{fontSize:14 * tmpWidth, color:'rgb(153,153,153)'}}>아이디 / 비밀번호 찾기  </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

Signupopt.navigationOptions = ({navigation}) =>{
    return {
        title: '회원가입',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth
        },
        headerStyle: {
            backgroundColor: 'rgb(254,254,254)',
            height: 92 * tmpWidth ,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowRadius: 0,
            shadowOpacity: 0,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth }} onPress={() => navigation.goBack()}>
                    <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};

const styles = StyleSheet.create({
    signupbutton:{
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1 * tmpWidth,
        borderColor:'rgb(169,193,255)',
        width:295 * tmpWidth,
        height:42 * tmpWidth,
        backgroundColor:'rgb(255,255,255)',
        borderRadius:54 * tmpWidth,
    },
    footer:{
        height: 68 * tmpWidth,
        width:375 * tmpWidth,
        alignItems:'center',
        borderTopWidth:1 * tmpWidth,
        borderTopColor:'rgba(168,193,255,0.1)',
    },
});
export default Signupopt;