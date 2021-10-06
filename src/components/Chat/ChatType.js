import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';

export default TextType = ({ sender, text }) => {
    const { state: userState } = useContext(UserContext);
    const isMyText = sender === userState.myInfo._id
    
    return (
        <View style={isMyText ? styles.myContainer : styles.yourContainer}>
            <View style={[
                styles.textBox, 
                isMyText ? styles.me : styles.you
            ]}> 
                <Text style={[
                    styles.text, 
                    isMyText && { color: 'white'}
                ]}>
                    {text}
                </Text> 
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    myContainer: {
        alignItems: 'flex-end',
        marginRight: 10 * tmpWidth
    },
    yourContainer: {
        alignItems: 'flex-start',
        marginLeft: 10 * tmpWidth
    },
    textBox: {
        marginBottom: 6 * tmpWidth, 
        maxWidth: 280 * tmpWidth, 
        paddingVertical: 11 * tmpWidth, 
        paddingHorizontal: 18 * tmpWidth,
        borderRadius: 10 * tmpWidth,
    },
    me: {
        backgroundColor: '#8bc0ff', 
    },
    you: {
        borderWidth: 1 * tmpWidth,
        borderColor: '#8bc0ff',
    },
    text: {
        fontSize: 16 * tmpWidth,
        lineHeight: 20 * tmpWidth
    }
})