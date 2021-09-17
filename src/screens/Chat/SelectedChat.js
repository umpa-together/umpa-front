import { StyleSheet, View,Text,FlatList,Keyboard ,TextInput,SafeAreaView, TouchableOpacity} from 'react-native';

import React, {useEffect, useContext,useRef,useState} from 'react';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';
import { io } from 'socket.io-client'

import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as ChatContext } from '../../context/ChatContext';

import { goBack } from '../../navigationRef';

const SelectedChat= ({navigation}) => {
    const {state, receiveMsg,blockchat ,unblockchat  } = useContext(ChatContext);
    const { state:userState} = useContext(UserContext);

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [socket, setSocket] = useState(io(`http://5fa5-125-143-163-26.ngrok.io/chat`));
    const commentRef = useRef();
    
    const onKeyboardDidShow =(e) =>{
        setKeyboardHeight(e.endCoordinates.height);
    }
    const onKeyboardDidHide=()=>{
        setKeyboardHeight(0);
    }

    useEffect(async()=>{
        await socket.emit('joinroom', {room:state.chatroom._id});
        socket.on('chat message', function(data){

            receiveMsg ({chat:data})
        })
        const listener =navigation.addListener('didFocus', ()=>{
            Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
            Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
        });
        return () => {
            
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
        <SafeAreaView>
        <View >
            <TouchableOpacity onPress={async()=>{ await socket.emit('end',{}); await socket.disconnect(); goBack(); 
            }}>
                <Text>뒤로가기</Text>
            </TouchableOpacity>
            { state.chatroom == null ||state.chatroom == undefined  ? null :
            <View>

            <Text>selectedChat</Text>
            <View style={{height: 420}}>
            <FlatList
                            inverted={true}
                            data={state.chatroom.messages}
                            keyExtractor={term=>term._id}
                            renderItem={({item, index})=> {
                                return (
                                    <View>
                                    { item.sender == userState.myInfo._id ? 
                                        <View style={{alignItems:'flex-end'}}>
                                            <Text style={{fontSize: 16 , marginBottom: 24  }}>{item.text}</Text>
                                        </View>
                                        : 
                                        <View style={{alignItems:'flex-start'}}>
                                            <Text style={{fontSize: 16 , marginBottom: 24  }}>{item.text}</Text>                                            
                                        </View>
                                    }
                                    </View>
                                );
                                
                            }}            
            />
            </View>
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
                await socket.emit("chat message", {room:state.chatroom._id, text:commentRef.current.value, msg:commentRef.current.value, chatid:state.chatroom._id,type:'text', id:userState.myInfo._id })
                commentRef.current.value = '';
                commentRef.current.clear();
                Keyboard.dismiss()
                setKeyboardHeight(0)
            }}>
                <Text style={{fontSize: 16 * tmpWidth, color: 'rgb(69,67,80)'}}>등록</Text>
            </TouchableOpacity>   

                {state.chatroom.Rejectperson.includes(userState.myInfo._id.toString()) ? 
                        <TouchableOpacity onPress={async()=>{await unblockchat({chatid:state.chatroom._id})}}>
                            <Text>차단풀기</Text>
                        </TouchableOpacity>
                :
                        <TouchableOpacity onPress={async()=>{await blockchat({chatid:state.chatroom._id})}}>
                            <Text>차단하기</Text>
                        </TouchableOpacity>
                }
             </View> 
            }       
        </View>
    
        </SafeAreaView>
        
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