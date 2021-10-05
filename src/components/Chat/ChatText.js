import React,{useContext, useEffect,useState,useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput ,FlatList} from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat} from 'providers/chat';
import { Context as ChatContext } from 'context/ChatContext'
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'components/ProfileImage'

export default ChatText = ({data, }) => {
    const { state: userState, } = useContext(UserContext);
    const [result, setResult] = useState(data)
    return (
        <View  style={{height:630*tmpWidth}}>
            {data ? 
            <FlatList
                            data={data}
                            inverted={true}
                            keyExtractor={term=>term._id}
                            renderItem={({item, index})=> {
                                return (
                                    <View>
                                    { item.sender == userState.myInfo._id ? 
                                        <View style={{alignItems:'flex-end',marginRight:10*tmpWidth }}>
                                            <View style={styles.text}>
                                            <Text style={{fontSize: 16 ,color:'white',lineHeight:20 }}>{item.text}</Text>
                                            </View>
                                        </View>
                                        : 
                                        <View style={{alignItems:'flex-start',marginLeft:10*tmpWidth }}>
                                            <View style={styles.text2}>
                                            <Text style={{fontSize: 16 ,lineHeight:20  }}>{item.text}</Text>     
                                            </View>                                       
                                        </View>
                                    }
                                    </View>
                                );
                                
                            }}            
            />
                : null        }
                 
        </View>
    )
}

const styles=StyleSheet.create({

    text:{
        marginBottom:6*tmpWidth, 
        maxWidth:280*tmpWidth, 
        backgroundColor:'#8bc0ff', 
        paddingVertical:11*tmpWidth, 
        paddingHorizontal:18*tmpWidth,
        borderRadius:10*tmpWidth,
    },
    text2:{
        marginBottom:6*tmpWidth, 
        maxWidth:280*tmpWidth, 
        paddingVertical:11*tmpWidth, 
        paddingHorizontal:18*tmpWidth,
        borderRadius:10*tmpWidth,
        borderWidth:1*tmpWidth,
        borderColor:'#8bc0ff', 
    }

})