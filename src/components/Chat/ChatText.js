import React, { useRef } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import TextType from './ChatType'

export default ChatText = ({ data }) => {
    const chatRef = useRef()

    const onMove = () => {
        if(chatRef) {
            chatRef.current.scrollToEnd()        
        }
    }

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
        flex: 1
    },
})