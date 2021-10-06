import React, {useEffect, useContext, useState} from 'react';
import { StyleSheet, View,Text,FlatList,TextInput,SafeAreaView } from 'react-native';
import { Context as AuthContext } from 'context/AuthContext';
import { Context as ChatContext } from 'context/ChatContext';
import { tmpWidth, tmpHeight } from 'components/FontNormalize';
import  {ChatHeader}  from 'components/Header';
import  SearchBox from 'components/Chat/SearchBox';
import  ChatList from 'components/Chat/ChatList';

import ChatProvider from 'providers/chat';

import { goBack,navigate} from 'navigationRef';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Chat= ({route}) => {
    const {state: chatState, gotoChat } = useContext(ChatContext);
    const [search, setSearch] = useState(false)
    const [chatlist, setChatlist] = useState(chatState.chatlist);
  
    useEffect(() => {
        if(chatState.chatlist != null)  setChatlist(chatState.chatlist)
    }, [chatState.chatlist])
    return (
        <View style={{flex:1 ,backgroundColor:'#fff'}}>
        <ChatHeader title={"메시지"} />
        <ChatProvider>
            <SearchBox setSearch={setSearch}/>
            {chatlist == null || chatlist== undefined ? null :

                <ChatList search ={search} data={chatlist} />
           
        
            }   
        </ChatProvider>

        </View>
    );
};
const styles=StyleSheet.create({
 


});
export default Chat;