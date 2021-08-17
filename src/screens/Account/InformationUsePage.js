import React from 'react';
import { ScrollView } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import TosForm from 'components/Setting/TosForm';
import PrivacyPolicyForm from 'components/Setting/PrivacyPolicyForm';
import OpenSourceForm from 'components/Setting/OpenSourceForm';
import NoticeForm from 'components/Setting/NoticeForm';
import Header from 'components/Header';

const InformationUsePage = ({ route }) => {
    const { type } = route.params
    return (
        <>
            <Header title={type} />
            <ScrollView 
                contentContainerStyle={{paddingBottom: 24 * tmpWidth, backgroundColor: 'rgb(254, 254, 254)'}}
                style={{backgroundColor: 'rgb(254, 254, 254)'}}
            >
                { type == '서비스 이용약관' ? <TosForm /> :  
                  type == '개인정보 처리방침' ? <PrivacyPolicyForm /> :
                  type == '공지사항' ? <NoticeForm /> : <OpenSourceForm /> }
            </ScrollView>
        </>
    )
}

export default InformationUsePage;