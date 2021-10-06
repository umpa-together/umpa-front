import { StyleSheet, View,Text,FlatList,Keyboard ,TextInput,SafeAreaView, TouchableOpacity} from 'react-native';

import React, {useEffect, useContext,useRef,useState} from 'react';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';
import { io } from 'socket.io-client'

import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as ChatContext } from '../../context/ChatContext';

import  {ChatHeader}  from 'components/Header';

import { goBack } from '../../navigationRef';
import  ChatText from 'components/Chat/ChatText';
import  ReportBar from 'components/Chat/ReportBar';

import ChatInput from 'components/Chat/ChatInput';

const SelectedChat= ({route}) => {
    const {state, receiveMsg,getlist  } = useContext(ChatContext);
    const { state:userState} = useContext(UserContext);
    const { target } = route.params

    const [socket, setSocket] = useState(io(`http://5c79-211-200-53-218.ngrok.io/chat`));
    const [modal, setModal] = useState(false);
    const [data, setData]= useState(state.chatroom.messages)

    const commentRef = useRef();
    


    useEffect(async()=>{
        await socket.emit('joinroom', {room:state.chatroom._id});
        socket.on('chat message', function(data){

            receiveMsg ({chat:data})
        })

        return () => {
            

        };
    }, []);

    useEffect(() => {
        if(state.chatroom.messages != null)  setData(state.chatroom.messages.reverse())
    }, [state.chatroom.messages])

    const back =async()=>{
        await socket.emit('end',{}); 
        await socket.disconnect(); 
        await getlist(); 
        
        goBack(); 

    }


 

    return (
        <>
        <View style={{flex:1, backgroundColor:'#fff', }} >
            <ChatHeader title={target.name} callback={back} setModal={setModal} />

            { state.chatroom == null ||state.chatroom == undefined  ? null :
            <View style={{flex:1}}>
            <ChatText data={data}/>


            </View> 
            }       
            <ChatInput id={state.chatroom._id} socket={socket} />
                        
            {modal &&
            <ReportBar modal={modal} setModal={setModal} user={target} /> 
            }

        </View>
        </>
    
        
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


