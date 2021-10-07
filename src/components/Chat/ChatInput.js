import React, { useCallback, useRef, useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Keyboard ,TouchableOpacity, TextInput } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as UserContext } from 'context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { useChat } from 'providers/chat';

export default ChatInput = ({ chatroom, socket }) => {
    const commentRef = useRef();
    const { state:userState } = useContext(UserContext);
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const { _id: id, participate } = chatroom
    const { onMove } = useChat()

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

    const onClickSend = async () => {
        await socket.emit("chat message", {
            room: id, 
            text: commentRef.current.value, 
            msg: commentRef.current.value, 
            type:'text', 
            sender: userState.myInfo._id,
            receiver: participate[0] === userState.myInfo._id ? participate[1] : participate[0]
        })
        commentRef.current.value = '';
        commentRef.current.clear();
        Keyboard.dismiss()
        setKeyboardHeight(0)
    }

    useFocusEffect(
        useCallback(() => {
            addEventListener()
            return () => removeEventListener()
        }, [])
    )

    useEffect(() => {
        if(keyboardHeight !== 0)    onMove()
    }, [keyboardHeight])

    return (
        <View style={[styles.container, { marginBottom: keyboardHeight }]}> 
            <View style={styles.inputbox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text=> commentRef.current.value = text}
                    placeholder="메세지를 입력해주세요"
                    placeholderTextColor="#999999"
                    autoCapitalize='none'
                    autoCorrect={false}
                    ref={commentRef}
                    multiline={true}
                />            
                <TouchableOpacity onPress={onClickSend}>
                    <Text style={styles.send}>보내기</Text>
                </TouchableOpacity>   
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        alignItems:'center',
        paddingTop: 10 * tmpWidth,
        backgroundColor:'#fff', 
    },
    inputbox:{
        marginBottom: 20 * tmpWidth, 
        paddingTop: 8 * tmpWidth,
        paddingBottom: 8 * tmpWidth,
        width: 351 * tmpWidth,
        borderWidth: 1 * tmpWidth, 
        borderColor: '#8bc0ff', 
        borderRadius: 10 * tmpWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between'
    },
    textInput:{
        width: 250 * tmpWidth,
        fontSize: 16 * tmpWidth,
        fontWeight: '400',
        marginLeft: 14 * tmpWidth,
        lineHeight: 18 * tmpWidth,
    },
    send: {
        fontSize: 16 * tmpWidth, 
        color: '#8bc0ff', 
        marginRight: 14 * tmpWidth
    }
})