import React, { useState, useCallback, useEffect, useRef,useContext } from 'react';
import { View, Text, StyleSheet, Keyboard ,TouchableOpacity, Image,TextInput ,FlatList} from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as UserContext } from 'context/UserContext';
import { useFocusEffect } from '@react-navigation/native';

export default ChatInput = ({id,socket}) => {
    const commentRef = useRef();
    const { state:userState} = useContext(UserContext);
    const [keyboardHeight, setKeyboardHeight] = useState(0);


    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }

    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }

    const addEventListener = () => {
        Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    }

    const removeEventListener = () => {
        Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
        Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
    }
    const onClickAdd = () => {
        Keyboard.dismiss()
        setKeyboardHeight(0)
        addComment({ id: dailyId, text: commentRef.current.value });
        commentRef.current.value = '';
        commentRef.current.clear();
    }

    console.log(keyboardHeight)
    useFocusEffect(
        useCallback(() => {
            addEventListener()
            return () => removeEventListener()
        }, [])
    )
    return (
        <View>
            <View style={{alignItems:'center',marginBottom:keyboardHeight,paddingTop:10*tmpWidth,backgroundColor:'#fff' }}> 
                <View  style={styles.inputbox}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text=> commentRef.current.value = text}
                        placeholder="댓글을 입력해주세요"
                        placeholderTextColor="rgb(164,164,164)"
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={commentRef}
                        multiline={true}
                    />            
                    <TouchableOpacity onPress={async () => {
                        await socket.emit("chat message", {room:id, text:commentRef.current.value, msg:commentRef.current.value, chatid:id,type:'text', id:userState.myInfo._id })
                        commentRef.current.value = '';
                        commentRef.current.clear();
                        Keyboard.dismiss()
                        setKeyboardHeight(0)
                    }}>
                        <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(69,67,80)'}}>등록</Text>
                    </TouchableOpacity>   
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    inputbox:{
        marginBottom:(30*tmpWidth), 
        height:44*tmpWidth,
        width:351*tmpWidth,
        borderWidth:1*tmpWidth, 
        borderColor:'#8bc0ff', 
        borderRadius:10*tmpWidth,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    textInput:{
        width: 300*tmpWidth,
        height:31*tmpWidth,
        fontSize:16*tmpWidth,
        
    }
    

})