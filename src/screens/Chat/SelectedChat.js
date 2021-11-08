import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { io } from 'socket.io-client';
import { Context as ChatContext } from 'context/ChatContext';
import { ChatHeader } from 'components/Header';
import ChatText from 'components/Chat/ChatText';
import ReportBar from 'components/Chat/ReportBar';
import ChatInput from 'components/Chat/ChatInput';
import SearchSong from 'components/Chat/SearchSong';
import ChatProvider from 'providers/chat';
import * as config from 'config';

const SelectedChat = ({ route }) => {
  const { state, receiveMsg, getChatList } = useContext(ChatContext);
  const { target } = route.params;
  const [socket] = useState(io(`${config.serverURL}/chat`));
  const [data, setData] = useState(state.chatroom.messages);

  const back = async () => {
    await socket.emit('end', {});
    await getChatList();
  };

  useEffect(async () => {
    await socket.emit('joinroom', { room: state.chatroom._id });
    socket.on('chat message', (message) => {
      receiveMsg({ chat: message });
    });
  }, []);

  useEffect(() => {
    if (state.chatroom !== null) setData(state.chatroom.messages);
  }, [state.chatroom]);

  return (
    <ChatProvider>
      <View style={styles.container}>
        <ChatHeader title={target.name} callback={back} />
        {state.chatroom == null || state.chatroom === undefined ? null : (
          <View style={styles.flex}>
            <ChatText data={data} />
            <ChatInput chatroom={state.chatroom} socket={socket} />
          </View>
        )}
        <ReportBar user={target} />
        <SearchSong user={target} chatroom={state.chatroom} socket={socket} />
      </View>
    </ChatProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
});
export default SelectedChat;
