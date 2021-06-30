import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList ,StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions  } from 'react-native';
import { Context as NoticeContext } from '../context/NoticeContext';
import { Context as PlaylistContext } from '../context/PlaylistContext';
import { Context as UserContext } from '../context/UserContext';
import { Context as DJContext } from '../context/DJContext';
import { Context as CurationContext } from '../context/CurationContext';
import { Context as BoardContext } from '../context/BoardContext';
import TrackPlayer from 'react-native-track-player';
import PlaylistNoticeForm from '../components/Notice/PlaylistNoticeForm';
import BoardNoticeForm from '../components/Notice/BoardNoticeForm';
import CurationNoticeForm from '../components/Notice/CurationNoticeForm';
import UserNoticeForm from '../components/Notice/UserNoticeForm';
import { navigate } from '../navigationRef';
import { tmpWidth } from '../components/FontNormalize';

const NoticeScreen = ({navigation}) => {
    const { state, getnotice, nextNotice } = useContext(NoticeContext);
    const { initPlaylist, getPlaylist } = useContext(PlaylistContext);
    const { getOtheruser, initOtherUser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const { getCuration } = useContext(CurationContext);
    const { getCurrentContent, initMusic, initCurrentContent, getSelectedBoard } = useContext(BoardContext);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const getData = async () => {
        if(state.notice.length >= 20 && !state.notNext){
            setLoading(true);
            await nextNotice({page: state.currentNoticePage})
            setLoading(false);
        }
    };

    const onEndReached = () => {
        if (loading) {
            return;
        } else {
            getData();
        }
    };

    const fetchData = async () => {
        setRefreshing(true);
        await getnotice();
        setRefreshing(false);
    };
    
    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    useEffect(() => {
        const listener =navigation.addListener('didFocus', async ()=>{
            initPlaylist()
            initOtherUser()
            initMusic()
            initCurrentContent()
            await TrackPlayer.reset()
        });
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View style={{height:'100%', width: '100%', backgroundColor: 'rgb(254,254,254)'}}>
            {state.notice == null ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> :
            <FlatList
                data ={state.notice}
                keyExtractor = {notice => notice._id}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                ListFooterComponent={loading && <ActivityIndicator />}
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderItem = {({item}) => {
                    return (
                        <View style={{marginTop: 14 * tmpWidth}}>
                            { item.noticetype == 'plike'  ?
                            <TouchableOpacity onPress={async () => {
                                if(item.playlist != null){
                                    await getPlaylist({id:item.playlist._id, postUserId:item.playlist.postUserId})
                                    navigation.push('SelectedPlaylist', {id: item.playlist._id, navigation: navigation, postUser: item.playlist.postUserId})
                                }
                            }}>
                                <PlaylistNoticeForm notice={item} navigation={navigation} /> 
                            </TouchableOpacity> :
                            ( item.noticetype == 'pcom' || item.noticetype == 'pcomlike' 
                            || item.noticetype == 'precom' || item.noticetype == 'precomlike' ?
                            <TouchableOpacity onPress={async () => {
                                if(item.playlist != null){
                                    await getPlaylist({id:item.playlist._id, postUserId:item.playlist.postUserId})
                                    navigation.push('SelectedPlaylist', {id: item.playlist._id, navigation: navigation, postUser: item.playlist.postUserId})
                                }
                            }}>
                                <PlaylistNoticeForm notice={item} navigation={navigation} /> 
                            </TouchableOpacity> :
                            (item.noticetype == 'culike' || item.noticetype=='ccom' ?
                            <TouchableOpacity onPress={async () => {
                                if(item.curationpost != null){
                                    await getCuration({isSong : item.curationpost.isSong,object:item.curationpost,id:item.curationpost.songoralbumid})
                                    navigate('SelectedCuration', {id: item.curationpost.songoralbumid, postid:item.curationpost._id})                                   
                                }
                            }}>
                                <CurationNoticeForm notice={item} navigation={navigation} />
                            </TouchableOpacity> :
                            (item.noticetype == 'blike' || item.noticetype == 'bcom' || item.noticetype == 'bcomlike' 
                            || item.noticetype == 'brecom' || item.noticetype == 'brecomlike' ?
                            <TouchableOpacity onPress={() => {
                                if(item.board != null){
                                    getCurrentContent({ id: item.boardcontent._id })
                                    navigate('SelectedContent', { boardName: item.board.name, boardId:item.board._id})
                                }
                            }}>
                                <BoardNoticeForm notice={item} navigation={navigation} />
                            </TouchableOpacity> :
                            (item.noticetype == 'bsonglike' ?
                            <TouchableOpacity onPress={async () => {
                                await getSelectedBoard({id: item.board._id})
                                navigate('MusicArchive', {name: item.board.name})
                            }}>
                                <BoardNoticeForm notice={item} navigation={navigation} />
                            </TouchableOpacity> :
                            (item.noticetype == 'follow' ?
                            <TouchableOpacity onPress = {async () => {
                                await Promise.all([getOtheruser({id:item.noticinguser._id}),
                                getSongs({id:item.noticinguser._id})]);
                                navigation.push('OtherAccount', {otherUserId: item.noticinguser._id})
                            }}>
                                <UserNoticeForm notice={item} navigation={navigation} />
                            </TouchableOpacity> : null )))))}
                        </View>
                    )
                }}
            /> }
        </View>
    );
};

NoticeScreen.navigationOptions = ({navigation})=>{
    const tmpHeight = Dimensions.get('window').height / 812;
    return {
        title: '알림',
        headerTitleStyle: {
            fontSize: 18  * tmpWidth,
            fontWeight: "400",
        }, 
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: 92 * tmpHeight,
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 3  * tmpWidth,
                width: 0,
            },
            shadowRadius: 8  * tmpWidth,
            shadowOpacity: 0.07,
        },
    };
};

const styles=StyleSheet.create({});

export default NoticeScreen;