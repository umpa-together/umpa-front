import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as ChatContext } from 'context/ChatContext';
import { Context as UserContext } from 'context/UserContext';
import { ChatHeader } from 'components/Header';
import  SearchBox from 'components/Chat/SearchBox';
import  ChatUserList from 'components/Chat/ChatUserList';
import ChatProvider from 'providers/chat';
import LoadingIndicator from 'components/LoadingIndicator'

const CreateChat= () => {
    const { getChatList } = useContext(ChatContext);
    const { state: userState } = useContext(UserContext);
    const [, setSearch] = useState(false)
    const [userLists, setUserLists] = useState(null);
  
    useEffect(() => {
        if(userState.myInfo.following !== null)  setUserLists(userState.myInfo.following)
    }, [userState.myInfo.following])

    return (
        <View style={styles.container}>
            <ChatProvider>
                <ChatHeader title={"새 메시지"} isCreate={true} callback={getChatList} />
                <SearchBox setSearch={setSearch} />
                { userLists == null ? <LoadingIndicator /> : <ChatUserList data={userLists} /> }   
            </ChatProvider>
        </View>
    );
};
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});
export default CreateChat;