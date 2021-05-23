import React, {useState, useContext, useEffect} from 'react';
import { Text, TextInput,View, Image, FlatList,StyleSheet,TouchableOpacity, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { Context as UserContext } from '../../context/UserContext'
import { Context as PlaylistContext } from '../../context/PlaylistContext'
import { Context as DJContext } from '../../context/DJContext'
import { Context as CurationContext } from '../../context/CurationContext'
import { navigate } from '../../navigationRef';
import { ActivityIndicator } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../../components/FontNormalize';

const FollowPage = ({navigation}) => {
    const { state, getOtheruser, follow, unfollow, getMyInfo } = useContext(UserContext);
    const { getUserPlaylists } = useContext(PlaylistContext);
    const { getSongs } = useContext(DJContext);
    const { getuserCurationposts } = useContext(CurationContext);
    const [text, setText] = useState('');

    const option = navigation.getParam('option');
    const typefix = navigation.getParam('type');

    const [type, setType] = useState();
    const [result, setResult] = useState();
    const filterItem = ({data}) => {
        if(type == 'following'){
            if(option == 'MyAccount'){
                setResult(state.myInfo.following.filter(item=> item.name.includes(data)));
            }else{
                setResult(state.otherUser.following.filter(item=> item.name.includes(data)));
            }
        }else{
            if(option == 'MyAccount'){
                setResult(state.myInfo.follower.filter(item=> item.name.includes(data)));
            }else{
                setResult(state.otherUser.follower.filter(item=> item.name.includes(data)));
            }
        }
    };
    const followCheck = ({id}) => {
        for(let key in state.myInfo.following){
            if(state.myInfo.following[key]._id == id)   return true;
        }
        return false;
    }
    useEffect(()=>{
        setType(typefix);
    }, [typefix]);
    useEffect(() => {
        if(type == 'following'){
            if(option == 'MyAccount'){
                setResult(state.myInfo.following)
            }else{
                setResult(state.otherUser.following)
            }
        }else{
            if(option == 'MyAccount'){
                setResult(state.myInfo.follower)
            }else{
                setResult(state.otherUser.follower)
            }
        }
    },[type]);
    return (
        <View style={{backgroundColor: 'rgb(254,254,254)', flex: 1}}>
            {state.myInfo == null && state.otherUser == null ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> :
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <View style={styles.searchBox}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.Icon}>
                                  <SvgUri width='100%' height='100%' source={require('../../assets/icons/search.svg')}/>
                            </View>
                            <TextInput
                                style={{marginLeft: 10 * tmpWidth }}
                                value = {text}
                                onChangeText={(text)=>{setText(text); filterItem({data:text});}}
                                placeholder= {type=='following' ? "팔로잉 검색" : "팔로워 검색"}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderTextColor ="rgba(153,153,153,0.5)"
                                keyboardType = "email-address"
                            />
                        </View>
                        <TouchableOpacity style={styles.Icon}>
                                  <SvgUri width='100%' height='100%' source={require('../../assets/icons/resultDelete.svg')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.opt}>
                        <View style={{marginLeft: 12 * tmpWidth , flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => setType('following')} style={type == 'following' ? styles.selectedFollowContainer : styles.followContainer}>
                                <Text style={type == 'following' ? styles.selectedType : styles.notSelectedType}>팔로잉 {option == 'MyAccount' ? state.myInfo.following.length : state.otherUser.following.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType('follower')} style={type == 'follower' ? styles.selectedFollowContainer : styles.followContainer}>
                                <Text style={type == 'follower' ? styles.selectedType : styles.notSelectedType}>팔로워 {option == 'MyAccount' ? state.myInfo.follower.length : state.otherUser.follower.length}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flex: 1, paddingTop: 26 * tmpWidth}}>
                    <FlatList
                        keyboardShouldPersistTaps="handled"
                        data={result}
                        keyExtractor={dj=>dj._id}
                        renderItem={({item, index})=> {
                            return (
                                <TouchableOpacity style={styles.userBox} onPress={() => {
                                    getUserPlaylists({id:item._id});
                                    getOtheruser({id:item._id});
                                    getSongs({id:item._id});
                                    getuserCurationposts({id:item._id});
                                    navigate('OtherAccount');
                                }}>
                                    { item.profileImage == undefined ?
                                    <View style={styles.profile}>
                                       <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                                    </View> : <Image source={{uri: item.profileImage}} style={styles.profile}/> }
                                    <View>
                                        <Text style={{fontSize:16 * tmpWidth}}>{item.name}</Text>
                                        <View style={{flexDirection:'row',marginTop:7.3 * tmpWidth , alignItems:'flex-end'}}>
                                            <View style={styles.representSongBox}>
                                                <Text style={{fontSize:11 * tmpWidth, color:'rgba(148,153,163,1)'}}>대표곡</Text>
                                            </View>
                                            <View style={{width:90 * tmpWidth }}>
                                                <Text style={styles.representtitle} numberOfLines={1}>{item.songs[0].name}</Text>
                                            </View>
                                            <View style={{width:50 * tmpWidth }}>
                                                <Text style={{marginLeft:4 * tmpWidth ,fontSize:11 * tmpWidth, color:'rgba(148,153,163,1)'}} numberOfLines={1} ellipsizeMode="tail">{item.songs[0].attributes.artistName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {type == 'following' ?
                                    followCheck({id: item._id}) ?
                                    <TouchableOpacity style={styles.followingBox} onPress={async () => {
                                        await unfollow({id:item._id});
                                        getMyInfo();
                                    }}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(169,193,255)'}}>팔로잉</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.followBox} onPress={async () => {
                                        await follow({id:item._id})
                                        getMyInfo();
                                    }}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(80,80,80)'}}>팔로우 +</Text>
                                    </TouchableOpacity> :
                                    followCheck({id: item._id}) ?
                                    <TouchableOpacity style={styles.followingBox} onPress={async () => {
                                        await unfollow({id:item._id});
                                        getMyInfo();
                                    }}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(169,193,255)'}}>팔로잉</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.followBox} onPress={async () => {
                                        await follow({id:item._id})
                                        getMyInfo();
                                    }}>
                                        <Text style={{fontSize: 12 * tmpWidth, color: 'rgb(80,80,80)'}}>팔로우 +</Text>
                                    </TouchableOpacity> }
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>}
        </View>
    );
};

FollowPage.navigationOptions = ({navigation})=>{
    const name = navigation.getParam('name');
    return {
        title: name,
        headerTitleStyle: {
            fontSize: 18 * tmpWidth,
            fontWeight: 'bold'
        },
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: 92 * tmpWidth,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 0,
                width: 0,
            },
            shadowRadius: 0,
            shadowOpacity: 0,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth }} onPress={() => navigation.pop()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};

const styles=StyleSheet.create({
    searchBox: {
        width: 335 * tmpWidth ,
        height: 36 * tmpWidth,
        borderRadius:10 * tmpWidth,
        backgroundColor: 'rgba(153,153,153,0.09)',
        marginTop: 20 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12  * tmpWidth,
        paddingRight: 12  * tmpWidth,
        justifyContent: 'space-between'
    },
    Icon: {
        width: 25  * tmpWidth,
        height: 25  * tmpWidth,
    },
    selectedFollowContainer: {
        paddingLeft: 18 * tmpWidth,
        paddingRight: 18  * tmpWidth,
        paddingBottom: 10  * tmpWidth,
        borderBottomWidth: 2 * tmpWidth,
        borderBottomColor: 'rgb(160,172,211)'
    },
    followContainer: {
        paddingLeft: 18  * tmpWidth,
        paddingRight: 18  * tmpWidth,
        paddingBottom: 10 * tmpWidth
    },
    selectedType: {
        fontSize: 14 * tmpWidth,
    },
    notSelectedType: {
        fontSize: 14 * tmpWidth,
        color: 'rgba(153,153,153,0.4)'
    },
    profile: {
        width: 56  * tmpWidth,
        height: 54.4  * tmpWidth,
        borderRadius: 100 * tmpWidth,
    },
    userBox: {
        height: 70 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 22  * tmpWidth,
        paddingRight: 18  * tmpWidth,
        justifyContent: 'space-between',
    },
    representSongBox: {
        justifyContent:'center', 
        alignItems:'center', 
        width:41 * tmpWidth,
        height: 16  * tmpWidth,
        borderWidth:0.8 * tmpWidth,
        borderColor:'rgba(148,153,163,0.5)',
        borderRadius:30 * tmpWidth
    },
    followBox: {
        width: 64  * tmpWidth,
        height: 25  * tmpWidth,
        borderRadius: 30 * tmpWidth,
        backgroundColor: 'rgba(169,193,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    followingBox: {
        width: 64  * tmpWidth,
        height: 25  * tmpWidth,
        borderRadius: 30 * tmpWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.8 * tmpWidth,
        borderColor: 'rgba(169,193,255,0.5)'
    },
    opt:{
        width: '100%',
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgba(153,153,153,0.2)',
        marginTop: 26  * tmpWidth,
        flexDirection: 'row'
    },
    representtitle:{
        marginLeft:6  * tmpWidth,
        fontSize:14 * tmpWidth,
        color:'rgba(148,153,163,1)',
        fontWeight:'bold'
    }
});

export default FollowPage;