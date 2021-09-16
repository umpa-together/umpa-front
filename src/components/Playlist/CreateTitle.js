import React, { useEffect } from 'react'
import { TextInput, StyleSheet, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { tmpWidth } from 'components/FontNormalize'
import { usePlaylist } from 'providers/playlist';

export default CreateTitle = () => {
    const { informationRef, validity, setValidity, title, setTitle } = usePlaylist()

    const onChangeTitle = (text) => {
        setTitle(text)
        informationRef.current.title = text
        if(informationRef.current.title !== '' && !validity.title) {
            setValidity((prev) => ({
                ...prev,
                title: true
            }))   
        }
    }

    useEffect(() => {
        setTitle(informationRef.current.title)
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput
                value={title}
                onChangeText={(text) => onChangeTitle(text)}
                placeholder="플레이리스트 제목을 입력해주세요."
                placeholderTextColor={validity.title ? 'rgb(196,196,196)' : 'rgb(238, 98, 92)'}
                autoCapitalize='none'
                autoCorrect={false}
                style={[styles.input, !validity.title && styles.warning ]}
            />
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    input: {
        borderBottomWidth: 0.5 * tmpWidth,
        marginLeft: 18 * tmpWidth,
        marginRight: 18 * tmpWidth,
        fontSize: 18 * tmpWidth,
        fontWeight: '700',
        paddingBottom: 14 * tmpWidth,
        borderBottomColor: '#b4b4b4'
    },
    warning: {
        borderBottomColor: 'rgb(238, 98, 92)'
    },
})