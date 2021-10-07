import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as ChatContext } from 'context/ChatContext';
import { ChatHeader }  from 'components/Header';
import SearchBox from 'components/Chat/SearchBox';
import ChatList from 'components/Chat/ChatList';
import ChatProvider from 'providers/chat';
import LoadingIndicator from 'components/LoadingIndicator'

const Chat= () => {
    const { state: chatState } = useContext(ChatContext);
    const [, setSearch] = useState(false)
    const [chatLists, setChatLists] = useState(null);
  
    useEffect(() => {
        setChatLists(chatState.chatlist)
    }, [chatState.chatlist])

    return (
        <View style={styles.container}>
            <ChatProvider>
                <ChatHeader title={"메시지"} />
                <SearchBox setSearch={setSearch} />
                { chatLists === null ? <LoadingIndicator /> : <ChatList data={chatLists} /> }   
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

export default Chat;