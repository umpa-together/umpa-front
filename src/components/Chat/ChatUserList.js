import React,{useContext, useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput ,FlatList} from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat} from 'providers/chat';
import { Context as ChatContext } from 'context/ChatContext'
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'components/ProfileImage'
import SvgUri from 'react-native-svg-uri'

export default ChatUserList = ({data, search}) => {
    const {state: chatState, postChat } = useContext(ChatContext);
    const { text, setText,textRef,onClickProfile} = useChat()
    const { state: userState, } = useContext(UserContext);
    const [result, setResult] = useState(data)
    
    useEffect(()=>{
        if(text){
        setResult(data.filter(item=> {
            if(item.name.includes(text) ){
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
                
                    return (
                            <View style={styles.item}>
                                   
                                        <TouchableOpacity
                                         style={{flexDirection:'row'}}
                                         onPress={async()=>{await postChat({participate:item._id});  navigate('SelectedChat',{target:item})}}
                                        >
                                        <TouchableOpacity onPress={() => onClickProfile(item._id)}>
                                            <ProfileImage img={item.profileImage } imgStyle={styles.chatProfile} />
                                        </TouchableOpacity> 
                                        <View style={styles.chatinfo}>
                                        <Text style={styles.profilenametext}>{item.name}</Text>

                                        </View>
                                        
                                        <View style={styles.icon} >
                                            <SvgUri width={14 * tmpWidth} height={13 * tmpWidth} source={require('assets/icons/Vector.svg')}/>
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
        width:235*tmpWidth, 
        justifyContent:'center',
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
    },
    icon:{
        paddingLeft:25*tmpWidth,
        width:40*tmpWidth, 
        height: 44*tmpWidth, 
        justifyContent:'center'
    }
    

})