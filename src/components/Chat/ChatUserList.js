import React,{ useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat } from 'providers/chat';
import { Context as ChatContext } from 'context/ChatContext'
import ProfileImage from 'components/ProfileImage'
import SvgUri from 'react-native-svg-uri'

export default ChatUserList = ({ data }) => {
    const { profileChat } = useContext(ChatContext);
    const { text, onClickProfile } = useChat()
    const [result, setResult] = useState(data)
    
    const onClickChat = async (user) => {
        await profileChat({ participate: user._id });  
        navigate('SelectedChat',{ target: user })
    }

    useEffect(()=>{
        if(text){
            setResult(data.filter(({ name })=> {
                return name.includes(text)
            }));
        } else {
            setResult(data)
        }
    }, [text]);

    return (
        <View style={styles.flex}>
            <FlatList
                data={result}
                keyExtractor={user => user._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>{
                    const { profileImage, _id: id, name, realName } = item
                    return (
                        <TouchableOpacity
                            style={styles.userContainer}
                            onPress={() => onClickChat(item)}
                        >
                            <View style={styles.flexRow}>
                                <TouchableOpacity onPress={() => onClickProfile(id)}>
                                    <ProfileImage img={profileImage} imgStyle={styles.chatProfile} />
                                </TouchableOpacity> 
                                <View style={styles.chatInfo}>
                                    <Text style={styles.nickName} numberOfLines={1}>{name}</Text>
                                    {realName !== undefined && <Text style={styles.realName} numberOfLines={1}>{realName}</Text> }
                                </View>
                            </View>
                            <SvgUri style={styles.icon} source={require('assets/icons/Vector.svg')}/>
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
    flexRow: {
        flexDirection: 'row',
    },
    userContainer: {
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 7 * tmpWidth,
        paddingBottom: 7 * tmpWidth,
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18 * tmpWidth,
    },
    chatInfo:{
        width: 200 * tmpWidth, 
        justifyContent:'center',
    },
    chatProfile:{
        height: 46 * tmpWidth,
        width: 46 * tmpWidth,
        borderRadius: 46 * tmpWidth,
        marginRight: 11 * tmpWidth,
    },
    nickName:{
        fontSize: 16 * tmpWidth,
        fontWeight: '400'
    },
    realName: {
        fontSize: 12 * tmpWidth,
        fontWeight: '300',
        color: '#505050',
        marginTop: 4 * tmpWidth
    },
    icon:{
        width: 40 * tmpWidth, 
        height: 40 * tmpWidth, 
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
})