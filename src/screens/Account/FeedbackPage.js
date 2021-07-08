import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Platform, StatusBar } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';
import { Context as ReportContext } from '../../context/ReportContext';
import { Context as UserContext } from '../../context/UserContext';

const FeedBackPage = ({navigation}) => {
    const feedbackRef = useRef()
    const { postReport } = useContext(ReportContext);
    const { state } = useContext(UserContext);
    const upload = () => {
        postReport({type: 'Feedback', reason: feedbackRef.current.value, subjectId: state.myInfo._id })
        navigation.goBack();
    }
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={{flex: 1, backgroundColor: 'rgb(254,254,254)', alignItems: 'center'}}>
                <View style={styles.commentBox}>
                    <TextInput 
                        ref={feedbackRef}
                        onChangeText={text=> feedbackRef.current.value = text}
                        placeholder="음파를 이용해주셔서 감사합니다. &#13;&#10;앱을 더 좋은 방향으로 발전시키고자, &#13;&#10;피드백을 받고 있습니다!! &#13;&#10;사소한 의견이라도 괜찮습니다.&#13;&#10;소중한 의견 감사합니다:)"
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline={true}
                        style={styles.commentBoxText}
                        placeholderTextColor='rgb(196,196,196)'
                    />
                </View>
                <TouchableOpacity style={styles.uploadBox} onPress={() => upload()}>
                    <Text style={styles.uploadText}>제출하기</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )

};

FeedBackPage.navigationOptions = ({navigation})=>{
    return {
        title: '피드백 및 건의사항',
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
            alignSelf: 'center',
            fontWeight: Platform.OS === 'ios' ? '500' : '700'
        }, 
        headerStyle: {
            backgroundColor: 'rgb(254,254,254)',
            height: Platform.OS === 'ios' ? 92 * tmpWidth : (48 + StatusBar.currentHeight) * tmpWidth,
            shadowColor: 'transparent',
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowRadius: 0,
            shadowOpacity: 0,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{position: 'absolute', left: 5 * tmpWidth }} onPress={() => navigation.goBack()}>
                    <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        },
        headerRight: () => {
            return (
                <View />
            )
        }
    };
};

const styles=StyleSheet.create({
    commentBox: {
        width: 327 * tmpWidth,
        height: '80%',
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        borderRadius: 8 * tmpWidth,
        marginTop: 10 * tmpWidth,
    },
    commentBoxText: {
        fontSize: 14 * tmpWidth, 
        paddingTop: 12 * tmpWidth,  
        paddingLeft: 12 * tmpWidth, 
        paddingRight: 12 * tmpWidth, 
        flex: 1,
        textAlignVertical: 'top'
    },
    uploadBox: {
        width: 327 * tmpWidth,
        height: 52 * tmpWidth,
        borderRadius: 100 * tmpWidth,
        backgroundColor: 'rgb(169,193,255)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30 * tmpWidth,
    },
    uploadText: {
        fontSize: 18 * tmpWidth, 
        color: '#fff'
    },
});

export default FeedBackPage;