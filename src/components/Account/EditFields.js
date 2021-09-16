import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';

export default EditFields = ({ title, information, validity }) => {
    const [text, setText] = useState()

    const onChangeText = (text) => {
        setText(text)
        if(title === '닉네임') { 
            information.nickName = text
        } else if (title === '이름') {
            information.name = text
        } else {
            information.introduction = text
        }
        textRef = text
    }

    useEffect(() => {
        if(title === '닉네임') { 
            setText(information.nickName)
        } else if (title === '이름') {
            setText(information.name)
        } else {
            setText(information.introduction)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput 
                value={text}
                onChangeText={(text) => onChangeText(text)}
                placeholder={`${title}을 적어주세요.`}
                placeholderTextColor={!validity ? styles.text : {color: '#c4c4c4'}}
                style={[styles.textinput, !validity && styles.warning]}
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={title !== '소개글' ? 15 : null}
                multiline={title === '소개글'}
            />
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        marginBottom: 24 * tmpWidth
    },
    title: {
        fontSize: 14 * tmpWidth,
        fontWeight: '400',
        marginBottom: 8 * tmpWidth
    },
    textinput: {
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1 * tmpWidth,
        paddingBottom: 5 * tmpWidth,
        fontSize: 14 * tmpWidth,
        fontWeight: '400'
    },
    text: {
        color: 'rgb(238, 98, 92)'
    },
    warning: {
        borderBottomColor: 'rgb(238, 98, 92)'
    },
})