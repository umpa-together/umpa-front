import React, { useContext, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as ReportContext } from 'context/ReportContext';
import { Context as UserContext } from 'context/UserContext';
import { goBack } from 'navigationRef';

export default Feedback = () => {
    const feedbackRef = useRef()
    const { postReport } = useContext(ReportContext);
    const { state } = useContext(UserContext);

    const upload = () => {
        postReport({type: 'Feedback', reason: feedbackRef.current.value, subjectId: state.myInfo._id })
        goBack();
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
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
                <TouchableOpacity style={styles.uploadBox} onPress={upload}>
                    <Text style={styles.uploadText}>제출하기</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        backgroundColor: 'rgb(254, 254, 254)'
    },
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
