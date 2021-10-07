import React,{useCallback, useContext, useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat } from 'providers/chat';
import { Context as ChatContext } from 'context/ChatContext'
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'components/ProfileImage'
import { useFocusEffect } from '@react-navigation/native';

export default ChatList = ({ data }) => {
    const { getSelectedChat, getMessagesNum } = useContext(ChatContext);
    const { text, onClickProfile } = useChat()
    const { state: userState } = useContext(UserContext);
    const [result, setResult] = useState(data)

    const onClickChat = async (id, user) => {
        await getSelectedChat({ chatid: id })
        getMessagesNum()
        navigate('SelectedChat', { target: user })
    }

    useEffect(()=>{
        if(text){
            setResult(data.filter(({ participate })=> {
                const target = participate[0]._id == userState.myInfo._id ? participate[1] : participate[0]
                return target.name.includes(text)
            }));
        } else {
            setResult(data)
        }
    }, [text]);

    useFocusEffect(
        useCallback(() => {
            setResult(data)
        })
    )

    return (
        <View style={styles.flex}>
            <FlatList
                data={result}
                keyExtractor={user => user._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const { participate, _id: id, messages, time } = item
                    const targetuser = participate[0]._id == userState.myInfo._id ? participate[1] : participate[0]
                    const isLastTargetUser = messages[messages.length-1].sender !== userState.myInfo._id
                    return (
                        <TouchableOpacity
                            style={styles.userContainer}
                            onPress={() => onClickChat(id, targetuser)}
                        >
                            <TouchableOpacity 
                                onPress={() => onClickProfile(targetuser._id)}
                            >
                                <ProfileImage img={targetuser.profileImage} imgStyle={styles.chatProfile} />
                            </TouchableOpacity> 
                            <View style={styles.flex}>
                                <Text style={styles.name}>{targetuser.name}</Text>
                                { messages[messages.length-1] != undefined && 
                                <View style={[styles.flexRow, styles.space]}>
                                    <Text 
                                        style={[
                                            styles.messages, 
                                            isLastTargetUser && !messages[messages.length-1].isRead && styles.unRead,
                                            styles.textArea
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {messages[messages.length-1].text}
                                    </Text>
                                    <View style={styles.flexRow}>
                                        <Text style={styles.messages}>{isLastTargetUser && messages[messages.length-1].isRead && '읽음'}</Text>
                                        <Text style={[styles.messages, styles.margin]}>{time}</Text>
                                    </View>
                                </View> }
                            </View>
                        </TouchableOpacity> 
                    )
                }}
            />            
        </View>
    )
}

const styles=StyleSheet.create({
    flex: {
        flex: 1,
    },
    userContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18 * tmpWidth,
        paddingTop: 11 * tmpWidth,
        paddingBottom: 11 * tmpWidth,
    },
    chatProfile:{
        height: 50 * tmpWidth,
        width: 50 * tmpWidth,
        borderRadius: 50 * tmpWidth,
        marginRight: 14 * tmpWidth,
    },
    name:{
        fontSize: 16 * tmpWidth,
        fontWeight: '400'
    },
    messages:{
        fontSize: 12 * tmpWidth, 
        color:'#505050',
        fontWeight: '400'
    },
    space: {
        marginTop: 4 * tmpWidth,
        justifyContent: 'space-between'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    unRead: {
        color: '#000000'
    },
    margin: {
        marginLeft: 4 * tmpWidth,
    },
    textArea: {
        width: 200 * tmpWidth
    }
})