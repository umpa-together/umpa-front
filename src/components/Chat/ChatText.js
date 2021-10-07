import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import TextType from './ChatType'
import { useChat } from 'providers/chat';
export default ChatText = ({ data }) => {
    const { chatRef, onMove } = useChat()

    return (
        <ScrollView 
            style={styles.flex}
            ref={chatRef}
            onContentSizeChange={onMove}
        >
            {data && data.map((item) => {
                const { type, sender, text } = item
                return (
                    <View key={item._id}>
                        { type === 'text' ? 
                        <TextType sender={sender} text={text} /> : null }
                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    flex: {
        flex: 1,
    },
})