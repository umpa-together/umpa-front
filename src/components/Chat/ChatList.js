import React,{useContext, useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput ,FlatList} from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat} from 'providers/chat';
import { Context as ChatContext } from 'context/ChatContext'
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'components/ProfileImage'

export default ChatList = ({data, search}) => {
    const {state: chatState, gotoChat } = useContext(ChatContext);
    const { text, setText,textRef,onClickProfile} = useChat()
    const { state: userState, } = useContext(UserContext);
    const [result, setResult] = useState(data)
    useEffect(()=>{
        if(text){
        setResult(data.filter(item=> {
            const target= item.participate[0].name == userState.myInfo.name ?item.participate[1] :item.participate[0]
            if(target.name.includes(text) ){
                return true
            }

        }));
        }else{
            setResult(data)
        }
    }, [text]);

    return (
        <View style={{flex:1}} >
            <FlatList
                data={result}
                keyExtractor={data._id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>{
                    
                    const targetuser = item.participate[0].name == userState.myInfo.name ?item.participate[1] :item.participate[0]
                    return (
                            <View style={styles.item}>
                                   
                                        <TouchableOpacity
                                         style={{flexDirection:'row'}}
                                         onPress={async()=>{await gotoChat({chatid:item._id});  navigate('SelectedChat',{target:targetuser})}}
                                        >
                                        <TouchableOpacity onPress={() => onClickProfile(targetuser._id)}>
                                            <ProfileImage img={targetuser.profileImage } imgStyle={styles.chatProfile} />
                                        </TouchableOpacity> 
                                        <View style={styles.chatinfo}>
                                        <Text style={styles.profilenametext}>{targetuser.name}</Text>
                                        { item.messages[item.messages.length-1] == undefined || item.messages[item.messages.length-1] == null? null :
                                            item.messages[item.messages.length-1].sender==userState.myInfo._id || item.messages[item.messages.length-1].isRead ? 
                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={styles.chattext}>{item.messages[item.messages.length-1].text}</Text>
                                            <Text style={styles.chattext}>{item.time}   읽음</Text>
                                            </View>
                                            :
                                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={styles.chattext}>{item.messages[item.messages.length-1].text}</Text>
                                            <Text style={styles.chattext}>{item.time}  안읽음</Text>
                                            </View>
                                        }
                                        </View>
                                        
                        
                                        </TouchableOpacity>
                                
                            </View>
                        )
                            }}
            />            
        </View>
    )
}

const styles=StyleSheet.create({
    item:{
        width:375*tmpWidth,
        height:72*tmpWidth,
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
    },
    chatinfo:{
        height:44*tmpWidth, 
        width:275*tmpWidth, 
        marginTop:3*tmpWidth, 
        justifyContent:'space-between',
    },
    chatProfile:{
        height: 50 * tmpWidth,
        width: 50 * tmpWidth,
        borderRadius: 50 * tmpWidth,
        marginRight: 14 * tmpWidth,
        
    },
    profilenametext:{
        fontSize: 16*tmpWidth 
    },
    chattext:{
        fontSize:12*tmpWidth, color:'#505050'
    }
    

})