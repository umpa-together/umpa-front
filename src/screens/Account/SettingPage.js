import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as NoticeContext } from '../../context/NoticeContext';

import { NaverLogin } from "@react-native-seoul/naver-login";
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';
import { navigate } from '../../navigationRef';

const SettingPage = () => {
    const { signout } = useContext(AuthContext);
    const {deletenoticetoken} = useContext(NoticeContext);
    return (
        <ScrollView style={{flex: 1, backgroundColor: 'rgb(254,254,254)', paddingTop: 27 * tmpWidth  }}>
            <View style={styles.section}>
                <Text style={{fontSize: 18 * tmpWidth , marginBottom: 14 * tmpWidth   }}>계정</Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)'}}>비밀번호 변경</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={{fontSize: 18 * tmpWidth , marginBottom: 14  * tmpWidth  }}>앱 설정</Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)'}}>알림 설정</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={{fontSize: 18 * tmpWidth , marginBottom: 14  * tmpWidth  }}>이용 안내</Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 12 * tmpWidth }}>공지사항</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 12 * tmpWidth }}>서비스 이용약관</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 12 * tmpWidth }}>개인정보 처리방침</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 12 * tmpWidth }}>오픈소스 라이선스</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('FeedBack')}>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)' }}>피드백 및 건의사항</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginLeft: 25 * tmpWidth   , paddingTop: 22 * tmpWidth   }}>
                <TouchableOpacity>
                <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(169,193,255)', marginBottom: 16 * tmpWidth   }}>회원 탈퇴</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async() => {
                    await NaverLogin.logout();
                    await deletenoticetoken();
                    await signout()}}>
                    <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(169,193,255)'}}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

SettingPage.navigationOptions = ({navigation})=>{
    return {
        title: '설정',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
        }, 
        headerStyle: {
            backgroundColor: 'rgb(254,254,254)',
            height: 92 * tmpWidth  ,
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
                    <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        },
    };
};

const styles=StyleSheet.create({
    section: {
        borderBottomWidth: 4  * tmpWidth ,
        borderBottomColor: 'rgba(196,196,196,0.2)',
        paddingLeft: 25  * tmpWidth ,
        paddingBottom: 24  * tmpWidth ,
        paddingTop: 22 * tmpWidth
    }
});

export default SettingPage;