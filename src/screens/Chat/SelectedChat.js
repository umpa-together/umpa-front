import { StyleSheet, View,Text,FlatList,Keyboard ,TextInput,TouchableOpacity} from 'react-native';

import React, {useEffect, useContext,useRef,useState} from 'react';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';
import { io } from 'socket.io-client'

import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as ChatContext } from '../../context/ChatContext';

import { navigate } from '../../navigationRef';

const SelectedChat= ({navigation}) => {
    const {state, gotoChat, sendMsg } = useContext(ChatContext);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const commentRef = useRef();
    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }
    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }
    useEffect(()=>{
        const socket = io(`http://091b6f381d7a.ngrok.io/chat`)

        const listener =navigation.addListener('didFocus', ()=>{
            Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
        });
        return () => {
            socket.disconnect()
            Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
            listener.remove();
        };
    }, []);
    //const { tryLocalSignin } = useContext(AuthContext);
    //const { state, getMyInfo } = useContext(UserContext);
    /*
    useEffect(()=>{
        tryLocalSignin();
        getMyInfo();
    }, []);
    useEffect(() => {
        if(state.myInfo != null)    navigate('Loading')
    }, [state.myInfo]);*/

    return (
        <View >
            <Text>selectedChat</Text>
            <FlatList
                            data={state.chatroom.messages}
                            keyExtractor={term=>term._id}
                            renderItem={({item, index})=> {
                                return (
                                        
                                        <Text style={{fontSize: 16 , marginBottom: 24  }}>{item.text}</Text>
                                );
                                
                            }}            
            />
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
                await sendMsg({text:commentRef.current.value, chatid:state.chatroom._id, type:'text'})
                commentRef.current.value = '';
                commentRef.current.clear();
                Keyboard.dismiss()
                setKeyboardHeight(0)
            }}>
                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(69,67,80)'}}>등록</Text>
            </TouchableOpacity>            
        </View>
        
    );
};
const styles=StyleSheet.create({
 
    textInput: {
        width: '80%',
        marginTop: 4 * tmpWidth,
        padding: 0,
    },



});
export default SelectedChat;