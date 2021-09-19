import React, { useContext } from 'react'
import { View, StyleSheet, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import { useSearch } from 'providers/search'

export default SongSearch = () => {
    const { searchsong, initHint } = useContext(SearchContext);
    const { textRef, setIsHint, setText } = useSearch()

    const onChangeText = (text) => {
        textRef.current.value = text
        setText(text)
        setIsHint(true)
    }

    const onSubmit = () => {
        setIsHint(false)
        searchsong({songname: textRef.current.value})
    }

    const onClickCancel = () => {
        initHint()
        setIsHint(true)
        textRef.current.clear()
        Keyboard.dismiss()
    }

    const onFocus = () => {
        setIsHint(true)
    }

    return (
        <View style={styles.container}>
            <SvgUri style={styles.searchIcon} source={require('assets/icons/songeditsearch.svg')}/>
            <TextInput
                ref={textRef}
                onChangeText={(text) => onChangeText(text)}
                placeholder="곡, 아티스트를 검색해주세요."
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                onFocus={onFocus}
                onSubmitEditing= {onSubmit}
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