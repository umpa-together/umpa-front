import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';

export default SongSearch = ({ setTok }) => {
    const { searchsong, searchHint, initHint } = useContext(SearchContext);
    const [text, setText] = useState('');

    const onChangeText = (text) => {
        setText(text)
        if(text=='')  setTok(false)
    }

    const onSubmit = (text) => {
        searchsong({songname: text})
        setTok(true)
    }

    const onClickCancel = () => {
        Keyboard.dismiss()
        setText('')
        setTok(false)
    }

    useEffect(() => {
        if(text == ''){
            initHint();
        }else{
            searchHint({term: text});
        }
    }, [text]);

    return (
        <View style={styles.container}>
            <SvgUri style={styles.searchIcon} source={require('assets/icons/songeditsearch.svg')}/>
            <TextInput
                value={text}
                onChangeText={(text) => onChangeText(text)}
                placeholder="곡, 아티스트를 검색해주세요."
                autoCapitalize='none'
                autoCorrect={false}
                onSubmitEditing= {() => onSubmit(text)}
                placeholderTextColor= 'rgb(196,196,196)'
                style={styles.textArea}
            />
            <TouchableOpacity 
                style={styles.cancelIcon}
                onPress={onClickCancel}
            >
                <SvgUri source={require('assets/icons/resultDelete.svg')}/>
            </TouchableOpacity>                    
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        width : 375 * tmpWidth ,
        height: 60 * tmpWidth ,
        backgroundColor: 'rgb(255,255,255)', 
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25 * tmpWidth
    },
    searchIcon: {
        height: 19 * tmpWidth,
        width: 18 * tmpWidth,
        marginRight: 14 * tmpWidth
    },
    textArea: {
        backgroundColor: "rgb(255,255,255)", 
        fontSize: 16 * tmpWidth, 
        width: 270 * tmpWidth, 
    },
    cancelIcon: {
        width: 28 * tmpWidth, 
        height: 28 * tmpWidth,
    }
})