import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as NoticeContext } from '../../context/NoticeContext';

import { NaverLogin } from "@react-native-seoul/naver-login";
import { tmpWidth } from '../../components/FontNormalize';
import { navigate } from '../../navigationRef';
import Header from '../../components/Header';

const SettingPage = () => {
    const { signout } = useContext(AuthContext);
    const {deletenoticetoken} = useContext(NoticeContext);
    return (
        <>
            <Header title="설정" />
            <ScrollView 
                contentContainerStyle={{paddingTop: 15 * tmpWidth, paddingBottom: 24 * tmpWidth, backgroundColor: 'rgb(254, 254, 254)'}}
                style={{backgroundColor: 'rgb(254, 254, 254)'}}
            >
                <View style={styles.section}>
                    <Text style={{fontSize: 16 * tmpWidth , marginBottom: 16 * tmpWidth   }}>계정</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)'}}>비밀번호 변경</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={{fontSize: 16 * tmpWidth , marginBottom: 16  * tmpWidth  }}>앱 설정</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)'}}>알림 설정</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={{fontSize: 16 * tmpWidth , marginBottom: 14  * tmpWidth  }}>이용 안내</Text>
                    <TouchableOpacity onPress={() => navigate('InformationUse', {type: '공지사항'})}>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 14 * tmpWidth }}>공지사항</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('InformationUse', {type: '서비스 이용약관'})}>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 14 * tmpWidth }}>서비스 이용약관</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('InformationUse', {type: '개인정보 처리방침'})}>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 14 * tmpWidth }}>개인정보 처리방침</Text>
                    </TouchableOpacity>
                    {/* 
                    <TouchableOpacity onPress={() => navigate('InformationUse', {type: '오픈소스 라이선스'})}>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)', marginBottom: 14 * tmpWidth }}>오픈소스 라이선스</Text>
                    </TouchableOpacity>
                    */}
                    <TouchableOpacity onPress={() => navigate('FeedBack')}>
                        <Text style={{fontSize: 16 * tmpWidth , color: 'rgb(118,118,118)' }}>피드백 및 건의사항</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft: 25 * tmpWidth, paddingTop: 24 * tmpWidth}}>
                    <TouchableOpacity>
                    <Text style={{fontSize: 16 * tmpWidth, marginBottom: 22 * tmpWidth   }}>회원 탈퇴</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async() => {
                        await NaverLogin.logout();
                        await deletenoticetoken();
                        await signout()}}>
                        <Text style={{fontSize: 16 * tmpWidth}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{marginLeft: 25 * tmpWidth, marginTop:tmpWidth*24,fontSize: 13 * tmpWidth , color: 'rgb(118,118,118)'}}>비밀번호 변경 및 계정 삭제는 </Text>
                <Text style={{marginLeft: 25 * tmpWidth, marginTop:tmpWidth*5,fontSize: 13 * tmpWidth , color: 'rgb(118,118,118)'}}>Umpa.together@gmail.com로 문의 부탁드립니다.</Text>
            </ScrollView>
        </>
    )
}

const styles=StyleSheet.create({
    section: {
        borderBottomWidth: 4  * tmpWidth ,
        borderBottomColor: 'rgba(196,196,196,0.2)',
        paddingLeft: 25  * tmpWidth ,
        paddingBottom: 18  * tmpWidth ,
        paddingTop: 18 * tmpWidth
    }
});

export default SettingPage;