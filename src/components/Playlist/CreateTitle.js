import React, { useState } from 'react'
import { TextInput, StyleSheet, View, Text, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import SvgUri from 'react-native-svg-uri'
import { tmpWidth } from 'components/FontNormalize'

export default CreateTitle = ({ informationRef, validity }) => {
    const [title, setTitle] = useState(informationRef.current.title)
    const onChangeTitle = (text) => {
        setTitle(text)
        informationRef.current.title = text
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput
            value={title}
            onChangeText={(text) => onChangeTitle(text)}
            placeholder="플레이리스트 제목을 적어주세요."
            placeholderTextColor='rgb(196,196,196)'
            autoCapitalize='none'
            autoCorrect={false}
        />
        {!validity.title &&
        <View style={styles.warningTitleContainer}>
            <SvgUri width='14' height='14' source={require('../../assets/icons/warning.svg')}/>
            <Text style={styles.warningText}>제목을 입력해주세요.</Text>
        </View>}
        </TouchableWithoutFeedback>
    )
}

const styles=StyleSheet.create({
    warningTitleContainer: {
        flexDirection: 'row', 
        marginTop: 4 * tmpWidth,  
        marginLeft: 14 * tmpWidth
    },
    warningText: {
        color:'rgb(238, 98, 92)', 
        marginLeft: 4 * tmpWidth, 
        fontSize: 12 * tmpWidth
    },
})