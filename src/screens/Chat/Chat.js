import React, {useEffect, useContext} from 'react';
import { StyleSheet, View,Text,FlatList,TextInput,SafeAreaView } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as ChatContext } from '../../context/ChatContext';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';

import { goBack,navigate} from '../../navigationRef';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Chat= () => {
    const { state: userState, postStory, getMyInfo, getMyStory, getOtheruser, storyCalendar, getOtherStory } = useContext(UserContext);
    const {state: chatState, gotoChat } = useContext(ChatContext);
    //const { tryLocalSignin } = useContext(AuthContext);
    //const { state, getMyInfo } = useContext(UserContext);
    /*
    useEffect(()=>{
        tryLocalSignin();
        getMyInfo();
    }, []);
    useEffect(() => {
        if(state.myInfo != null)    navigate('Loading')
    }, [state.myInfo]);*/

    return (
        <SafeAreaView>
        <View >
            <TouchableOpacity onPress={()=>{goBack()}}>
                <Text>뒤로가기</Text>
            </TouchableOpacity>
            <Text>Chat</Text>
            <FlatList
                            data={chatState.chatlist}
                            keyExtractor={term=>term._id}
                            renderItem={({item, index})=> {
                                return (
                                        <TouchableOpacity
                                         onPress={async()=>{await gotoChat({chatid:item._id});  navigate('SelectedChat')}}
                                        >
                                        <Text style={{fontSize: 16 , marginBottom: 24  }}>{item.participate[0].name == userState.myInfo.name ?item.participate[1].name :item.participate[0].name}</Text>
                                        { item.messages[item.messages.length-1] == undefined || item.messages[item.messages.length-1] == null? null :
                                            item.messages[item.messages.length-1].isRead ? 
                                            <View>
                                            <Text>{item.messages[item.messages.length-1].text}</Text>
                                            <Text>읽음</Text>
                                            </View>
                                            :
                                            <View>
                                            <Text>{item.messages[item.messages.length-1].text}</Text>
                                            <Text>안읽음</Text>
                                            </View>
                                        }
                                        
                                        
                                        
                                        </TouchableOpacity>
                                )
                            }}            
            />


        </View>
        </SafeAreaView>
    );
};
const styles=StyleSheet.create({
 


});
export default Chat;