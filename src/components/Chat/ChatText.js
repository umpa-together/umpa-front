import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useChat } from 'providers/chat';
import TextType from './ChatType';

const ChatText = ({ data }) => {
  const { chatRef, onMove } = useChat();

  return (
    <ScrollView style={styles.flex} ref={chatRef} onContentSizeChange={onMove}>
      {data &&
        data.map((item) => {
          const { type, sender, text } = item;
          return (
            <View key={item._id}>
              {type === 'text' ? <TextType sender={sender} text={text} /> : null}
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
