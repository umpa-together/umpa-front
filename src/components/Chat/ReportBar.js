import React,{useContext, useEffect,useState,useRef} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput ,FlatList} from 'react-native';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useChat} from 'providers/chat';
import Modal from 'react-native-modal';
import SvgUri from 'react-native-svg-uri'

import { Context as ChatContext } from 'context/ChatContext'
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'components/ProfileImage'
import ReportModal from 'components/ReportModal'


/*
                {state.chatroom.Rejectperson.includes(userState.myInfo._id.toString()) ? 
                        <TouchableOpacity onPress={async()=>{await unblockchat({chatid:state.chatroom._id})}}>
                            <Text>차단풀기</Text>
                        </TouchableOpacity>
                :
                        <TouchableOpacity onPress={async()=>{await blockchat({chatid:state.chatroom._id})}}>
                            <Text>차단하기</Text>
                        </TouchableOpacity>
                }


*/
export default ReportBar = ({modal, setModal, user}) => {
    const {state, blockchat ,unblockchat,  } = useContext(ChatContext);
    const { state:userState} = useContext(UserContext);
    const [reportModal, setReportModal] = useState(false)
    const onClose = () =>{
        setModal(false);
    };
    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={modal}
            backdropOpacity={0.4}
            onBackdropPress={onClose}

            style={{margin: 0, justifyContent: 'flex-end', }}
        >
            <View style={styles.modal}>
                    <View style={{flexDirection:'row', marginTop:14*tmpWidth, alignItems:'center'}}>
                    <ProfileImage img={user.profileImage } imgStyle={styles.chatProfile} />
                    <View style={{width:tmpWidth*290}}>
                    <Text style={{marginLeft:10*tmpWidth, fontSize:16*tmpWidth}}>{user.name}</Text>
                    </View>
                    <SvgUri width={14 * tmpWidth} height={14 * tmpWidth} source={require('assets/icons/chatexit.svg')}/>

                    </View>
                    <View style={{flexDirection:'row', paddingTop:20*tmpWidth, paddingHorizontal:16*tmpWidth, justifyContent:'space-between'}}>
                        
                        <TouchableOpacity onPress={()=>{setReportModal(true)}} style={styles.textbox}>
                            <Text style={styles.text}>신고</Text>
                        </TouchableOpacity>
                        {state.chatroom.Rejectperson.includes(userState.myInfo._id.toString()) ? 
                        <TouchableOpacity style={styles.textbox} onPress={async()=>{await unblockchat({chatid:state.chatroom._id})}}>
                            <Text style={styles.text}>차단풀기</Text>
                        </TouchableOpacity>
                :
                        <TouchableOpacity style={styles.textbox} onPress={async()=>{await blockchat({chatid:state.chatroom._id})}}>
                            <Text style={styles.text}>차단하기</Text>
                        </TouchableOpacity>
                }

             
                    </View>
                    <ReportModal reportModal={reportModal} setReportModal={setReportModal} type={'chat'} subjectId={user._id}/>
            </View>
        </Modal>
    )
}

const styles=StyleSheet.create({
    chatProfile:{
        height: 40 * tmpWidth,
        width: 40 * tmpWidth,
        borderRadius: 40 * tmpWidth,
        marginLeft: 16 * tmpWidth,

        
    },
    modal:{
        width:375*tmpWidth, 
        height:172*tmpWidth, 
        backgroundColor:'#fff',
        borderTopLeftRadius:18*tmpWidth, 
        borderTopRightRadius:18*tmpWidth
    },
    textbox:{
        width:167*tmpWidth,
        height: 40*tmpWidth,
        borderWidth:1,
        borderColor:'#ff0000',
        borderRadius:10*tmpWidth,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:16*tmpWidth,
        color:'#ff0000',
    }
 
})