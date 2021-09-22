import React, { useContext } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useSearch } from 'providers/search';

export default SearchBar = () => {
    const { setIsHint, setText, textRef } = useSearch()
    const { initHint, searchsong } = useContext(SearchContext);

    const onClickCancel = () => {
        initHint()
        setIsHint(true)
        textRef.current.clear()
        Keyboard.dismiss()
    }

    const onSubmitEditing = () => {
        searchsong({ songname: textRef.current.value })
        setIsHint(false)
    }

    const onChangeText = (text) => {
        textRef.current.value = text
        setText(text)
        setIsHint(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image source={require('assets/icons/playlistSearch.png')} style={styles.icon} />
                <TextInput
                    ref={textRef}
                    onChangeText={(text)=> onChangeText(text)}
                    onSubmitEditing={onSubmitEditing}
                    placeholder="곡, 아티스트를 입력해주세요"
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.textInput}
                    placeholderTextColor='#999999'
                />
                <TouchableOpacity onPress={onClickCancel}>
                    <SvgUri style={styles.icon} source={require('assets/icons/playlistDelete.svg')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        height: 48 * tmpWidth,
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        width: 339 * tmpWidth,
        height: 40 * tmpWidth,
        borderWidth: 1.5 * tmpWidth,
        borderColor: '#8bc0ff',
        borderRadius: 10 * tmpWidth,
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 34 * tmpWidth,
        height: 34 * tmpWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        width: 260 * tmpWidth,
    }
})