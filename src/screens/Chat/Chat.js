import React, {useEffect, useContext} from 'react';
import { StyleSheet, View,Text,FlatList,TextInput } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';
import { Context as ChatContext } from '../../context/ChatContext';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';

import { navigate } from '../../navigationRef';
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
        <View >
            <Text>Chat</Text>
            <FlatList
                            data={userState.myInfo.chats}
                            keyExtractor={term=>term._id}
                            renderItem={({item, index})=> {
                                return (
                                        <TouchableOpacity
                                         onPress={async()=>{await gotoChat({chatid:item._id});  navigate('SelectedChat')}}
                                        >
                                        <Text style={{fontSize: 16 , marginBottom: 24  }}>1</Text>
                                        </TouchableOpacity>
                                )
                            }}            
            />


        </View>
    );
};
const styles=StyleSheet.create({
 


});
export default Chat;