import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useChat } from 'providers/chat';
import { useSearch } from 'providers/search';
import MyArchiveLists from 'components/Chat/MyArchiveLists';
import SongHint from 'components/Chat/SongHint';
import SongResult from 'components/Chat/SongResult';

const SearchResult = ({ socket, chatroom }) => {
  const { isArchive } = useChat();
  const { isHint } = useSearch();

  return (
    <View style={styles.container}>
      {isArchive ? (
        <MyArchiveLists socket={socket} chatroom={chatroom} />
      ) : (
        <>{isHint ? <SongHint /> : <SongResult socket={socket} chatroom={chatroom} />}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
  },
});

export default SearchResult;
