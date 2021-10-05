import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput } from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat} from 'providers/chat';

export default SearchBox = ({setSearch}) => {
    const { text, setText,textRef} = useChat()

    const onChangeText = (text) => {
        textRef.current.value = text
        setText(text)
        if(text){
            setSearch(true)
        }else{
            setSearch(false)
        }

    }
    return (
        <View style={styles.inputbox} >
            <View style={styles.flexRow}>
                <Image source={require('assets/icons/mainSearch.png')} style={styles.icon} />
                <TextInput
                    ref={textRef}
                    onChangeText={(text)=> onChangeText(text)}
                    onSubmitEditing={()=>{}}
                    placeholder="검색"
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.textInput}
                    placeholderTextColor='#999999'
                />           
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    inputbox:{
        width: 339 * tmpWidth,
        height: 40 * tmpWidth,
        backgroundColor: '#ffffff',
        borderRadius: 10 * tmpWidth,
        borderWidth: 1.5 * tmpWidth,
        borderColor: '#8bc0ff',
        marginTop: 22 * tmpWidth,
        justifyContent: 'center',
        marginLeft: 18 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row', 
        alignItems:'center'
    },
    placeholder: {
        color: 'rgba(139,192,255,0.5)', 
        fontSize: 14 * tmpWidth, 
        fontWeight: '400'
    },
    icon: {
        width: 34 * tmpWidth,
        height: 34 * tmpWidth,
    },
    textInput: {
        height: 30*tmpWidth,
        width:250*tmpWidth,
    },
})