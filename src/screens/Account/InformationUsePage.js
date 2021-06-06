import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { tmpWidth } from '../../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import TosForm from '../../components/Setting/TosForm';
import PrivacyPolicyForm from '../../components/Setting/PrivacyPolicyForm';
import OpenSourceForm from '../../components/Setting/OpenSourceForm';
import NoticeForm from '../../components/Setting/NoticeForm';

const InformationUsePage = ({navigation}) => {
    const type = navigation.getParam('type')
    return (
        <ScrollView 
            contentContainerStyle={{backgroundColor: 'rgb(254,254,254)', paddingTop: 15 * tmpWidth, paddingBottom: 24 * tmpWidth}}
            style={{backgroundColor: 'rgb(254,254,254)',}}
        >
            { type == '서비스 이용약관' ? <TosForm /> :  
              type == '개인정보 처리방침' ? <PrivacyPolicyForm /> :
              type == '공지사항' ? <NoticeForm /> : <OpenSourceForm /> }
        </ScrollView>
    )
}

InformationUsePage.navigationOptions = ({navigation})=>{
    const type = navigation.getParam('type')
    return {
        title: type,
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

const styles=StyleSheet.create({})

export default InformationUsePage;