import React, {useEffect, useContext, useState} from 'react';
import { StyleSheet, View,Text,FlatList,TextInput,SafeAreaView } from 'react-native';
import { Context as AuthContext } from 'context/AuthContext';
import { Context as ChatContext } from 'context/ChatContext';
import { Context as UserContext } from 'context/UserContext';

import { tmpWidth, tmpHeight } from 'components/FontNormalize';
import  {ChatHeader}  from 'components/Header';
import  SearchBox from 'components/Chat/SearchBox';
import  ChatUserList from 'components/Chat/ChatUserList';

import ChatProvider from 'providers/chat';

import { goBack,navigate} from 'navigationRef';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateChat= ({route}) => {
    const {state: chatState, gotoChat,getlist } = useContext(ChatContext);
    const { state:userState} = useContext(UserContext);

    const [search, setSearch] = useState(false)
    const [chatuserlist, setChatuserlist] = useState(userState.myInfo.following);
  
    useEffect(() => {
        if(userState.myInfo.following!= null)  setChatuserlist(userState.myInfo.following)
    }, [userState.myInfo.following])
    return (
        <View style={{flex:1 ,backgroundColor:'#fff'}}>
        <ChatHeader title={"새 메시지"} isCreate={true} callback={getlist} />
        <ChatProvider>
            <SearchBox setSearch={setSearch}/>
            {chatuserlist == null || chatuserlist== undefined ? null :

                <ChatUserList search ={search} data={chatuserlist} />
           
        
            }   
        </ChatProvider>

        </View>
    );
};
const styles=StyleSheet.create({
 


});
export default CreateChat;