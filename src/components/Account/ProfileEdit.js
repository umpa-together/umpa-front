import React, { useState, useContext } from 'react'
import { Text, View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Context as AuthContext } from 'context/AuthContext';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';

export default ProfileEdit = ({ nameValidity, doubleCheck, information }) => {
    const { state: authState } = useContext(AuthContext);
    const [name, setName] = useState(information.userName)
    const [introduction, setIntroduction] = useState(information.introduction)

    const onChangeName = (text) => {
        if(text.length <= 15) information.userName = text
        setName(information.userName)
    }

    const onChangeIntroduction = (text) => {
        information.introduction = text
        setIntroduction(information.introduction)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <View style={styles.nameBox}>
                    <Text style={styles.title}>이름</Text>
                    <View style={styles.flex}>
                        <View style={nameValidity ? styles.input : styles.validityInput}>
                            <TextInput
                                value={name}
                                onChangeText={(text) => onChangeName(text)}
                                placeholder="사용자 이름을 적어주세요. (15자 이내)"
                                placeholderTextColor='rgb(196,196,196)'
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={styles.textArea}
                            />
                        </View>
                        { doubleCheck && !authState.doubleCheck && 
                        <View style={styles.warningBox}>
                            <SvgUri width='14' height='14' source={require('assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>현재 사용중인 아이디입니다.</Text>
                        </View> }
                        { !nameValidity  &&
                        <View style={styles.warningBox}>
                            <SvgUri width='14' height='14' source={require('assets/icons/warning.svg')}/>
                            <Text style={styles.warningText}>사용자 이름을 입력해주세요.</Text>
                        </View> }
                    </View>
                </View>
                <View style={styles.introduceContainer}>
                    <Text style={styles.title}>소개</Text>
                    <View style={styles.introduceBox}>
                        <TextInput
                            value={introduction}
                            onChangeText={(text) =>  onChangeIntroduction(text)}
                            placeholder="소개글을 적어주세요."
                            placeholderTextColor='rgb(196,196,196)'
                            autoCapitalize='none'
                            autoCorrect={false}
                            multiline={true}
                            style={styles.introducetextinput}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    nameBox: {
        width: 327 * tmpWidth,
        height: 44 * tmpWidth,
        marginTop: 27.5 * tmpWidth,
        flexDirection: 'row',
    },
    title: {
        fontSize: 16 * tmpWidth
    },
    flex: {
        flex: 1
    },
    input: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(196,196,196)',
        marginLeft: 14 * tmpWidth,
        width: 283 * tmpWidth
    },
    validityInput: {
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(238,98,92)',
        marginLeft: 14 * tmpWidth,
        width: 283 * tmpWidth
    },
    textArea: {
        fontSize: 14 * tmpWidth, 
        paddingBottom: 9 * tmpWidth
    },
    introduceBox: {
        width: 327  * tmpWidth,
        height: 160.5  * tmpWidth,
        borderWidth: 1 * tmpWidth,
        borderColor: 'rgb(196,196,196)',
        borderRadius: 8 * tmpWidth,
        marginTop: 10 * tmpWidth,
    },
    warningBox: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth, 
        marginLeft: 14 * tmpWidth
    },
    warningText: {
        color:'rgb(238, 98, 92)', 
        marginLeft: 4 * tmpWidth , 
        fontSize: 12 * tmpWidth
    },
    introducetextinput:{
        fontSize: 14 * tmpWidth,
        marginLeft: 12 * tmpWidth,
        marginTop: 12 * tmpWidth,
        marginRight: 12 * tmpWidth,
    },
    introduceContainer: {
        marginTop: 20 * tmpWidth
    }
})