import React, { useContext } from 'react'
import { View, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { useSearch } from 'providers/search'
import { tmpWidth } from 'components/FontNormalize';
import { goBack } from 'navigationRef';
import SvgUri from 'react-native-svg-uri';

export default SearchBar = () => {
    const { searchsong, initHint } = useContext(SearchContext);
    const { textRef, setIsHint, searchOption, setText, setIsResultClick } = useSearch()

    const onChangeText = (text) => {
        textRef.current.value = text
        setText(text)
    }

    const onClickCancel = () => {
        initHint()
        setIsResultClick(false)
        setIsHint(true)
        textRef.current.clear()
        Keyboard.dismiss()
    }

    const onFocus = () => {
        setIsHint(true)
    }

    const onChange = () => {
        setIsHint(true)
    }

    const onSubmitEditing =() => {
        setIsHint(false)
           if(searchOption === 'Song'){
                searchsong({songname: textRef.current.value})
           }
           
           //else if (searchOption ==='Hashtag') {
           //}else{
           //    searchsong({songname: textRef.current.value})
           //}
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={goBack} 
                style={styles.backIcon}
            >
                <SvgUri source={require('assets/icons/back.svg')} />
            </TouchableOpacity>
            <View style={styles.inputbox}>
                <SvgUri source={require('assets/icons/search.svg')} style={styles.searchIcon}/>
                <TextInput 
                    style={styles.textInput}
                    ref={textRef}
                    onChangeText={(text) => onChangeText(text)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus ={true}
                    onFocus = {onFocus}
                    onChange = {onChange}
                    onSubmitEditing={onSubmitEditing}
                    placeholderTextColor ="#999"
                />
                <TouchableOpacity 
                    onPress={onClickCancel} 
                    style={styles.cancelIcon}
                >
                   <SvgUri width={40 * tmpWidth} height={40 * tmpWidth} source={require('assets/icons/cancel.svg')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 44 * tmpWidth,
        backgroundColor: "#fff",
        alignItems: 'center',
        marginTop: 10 * tmpWidth,
    },
    backIcon:{
        width: 40 * tmpWidth,
        height: 40 * tmpWidth,
        marginLeft: 10 * tmpWidth,
    },
    inputbox:{
        flexDirection:'row',
        alignItems:'center',
        width: 300 * tmpWidth,
        height: 44 * tmpWidth,
        borderRadius: 10 * tmpWidth,
        backgroundColor: "#eee",
    },
    searchIcon:{
        width: 30 * tmpWidth,
        height: 30 * tmpWidth,
        marginLeft: 5 * tmpWidth,
        marginRight:5 * tmpWidth,
    },
    textInput:{
        fontSize: 14 * tmpWidth,
        width: 213 * tmpWidth,
    },
    cancelIcon: {
        width:40 * tmpWidth,
        height:40 * tmpWidth,
        marginRight: 12 * tmpWidth,
    },
})