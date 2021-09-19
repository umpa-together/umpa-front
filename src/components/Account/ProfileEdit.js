import React from 'react'
import { View, StyleSheet, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { tmpWidth } from 'components/FontNormalize';
import EditFields from './EditFields'

export default ProfileEdit = ({ nameValidity, information }) => {

    const fieldLists = [{
        title: '닉네임',
        validity: nameValidity,
    }, {
        title: '이름',
        validity: true,
    }, {
        title: '소개글',
        validity: true,
    }]

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {fieldLists.map(({ title, validity }) => {
                    return (
                        <EditFields 
                            title={title} 
                            information={information} 
                            validity={validity}
                            key={title}
                        />
                    )
                })}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    container: {
        marginLeft: 18 * tmpWidth,
        marginRight: 18 * tmpWidth
    },
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