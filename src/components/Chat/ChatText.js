import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useChat } from 'providers/chat';
import TextType, { SongType } from './ChatType';

const ChatText = ({ data }) => {
  const { chatRef, onMove } = useChat();
  return (
    <ScrollView style={styles.flex} ref={chatRef} onContentSizeChange={onMove}>
      {data &&
        data.map((item) => {
          const { type, sender, text, song } = item;
          return (
            <View key={item._id}>
              {type === 'text' ? (
                <TextType sender={sender} text={text} />
              ) : (
                <SongType sender={sender} song={song} />
              )}
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default ChatText;
