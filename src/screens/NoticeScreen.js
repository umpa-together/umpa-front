import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList ,StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions  } from 'react-native';
import { Context as NoticeContext } from '../context/NoticeContext';
import { Context as PlaylistContext } from '../context/PlaylistContext';
import { Context as UserContext } from '../context/UserContext';
import { Context as DJContext } from '../context/DJContext';
import { Context as CurationContext } from '../context/CurationContext';
import { Context as BoardContext } from '../context/BoardContext';
import PlaylistNoticeForm from '../components/Notice/PlaylistNoticeForm';
import BoardNoticeForm from '../components/Notice/BoardNoticeForm';
import CurationNoticeForm from '../components/Notice/CurationNoticeForm';
import UserNoticeForm from '../components/Notice/UserNoticeForm';
import { navigate } from '../navigationRef';
import { tmpWidth } from '../components/FontNormalize';

const NoticeScreen = ({navigation}) => {
    const { state, getnotice, nextNotice } = useContext(NoticeContext);
    const { getPlaylist, initPlaylist } = useContext(PlaylistContext);
    const { getOtheruser, initOtherUser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const { getCuration } = useContext(CurationContext);
    const { getCurrentContent, initMusic, initCurrentContent, getSelectedBoard } = useContext(BoardContext);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const getData = async () => {
        if(state.notice.length >= 20){
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
        const listener =navigation.addListener('didFocus', ()=>{
            getnotice()
            initPlaylist()
            initOtherUser()
            initMusic()
            initCurrentContent()
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
                            <TouchableOpacity onPress={() => {
                                if(item.playlist != null){
                                    getPlaylist({id:item.playlist._id, postUserId:item.playlist.postUserId})
                                    navigate('SelectedPlaylist', {id: item.playlist._id, object:item.playlist})
                                }
                            }}>
                                <PlaylistNoticeForm notice={item} /> 
                            </TouchableOpacity> :
                            ( item.noticetype == 'pcom' || item.noticetype == 'pcomlike' 
                            || item.noticetype == 'precom' || item.noticetype == 'precomlike' ?
                            <TouchableOpacity onPress={() => {
                                if(item.playlist != null){
                                    getPlaylist({id:item.playlist._id, postUserId:item.playlist.postUserId})
                                    navigate('SelectedPlaylist', {id: item.playlist._id, object:item.playlist, commentid:item.playlistcomment._id})
                                }
                            }}>
                                <PlaylistNoticeForm notice={item} /> 
                            </TouchableOpacity> :
                            (item.noticetype == 'culike' ?
                            <TouchableOpacity onPress={() => {
                                getCuration({isSong: item.curationpost.isSong, object:item.curationpost.object.id, id:item.curationpost.object.id})
                                navigate('SelectedCuration', {id:item.curationpost.object.id, postid:item.curationpost._id})
                            }}>
                                <CurationNoticeForm notice={item} />
                            </TouchableOpacity> :
                            (item.noticetype == 'blike' || item.noticetype == 'bcom' || item.noticetype == 'bcomlike' 
                            || item.noticetype == 'brecom' || item.noticetype == 'brecomlike' ?
                            <TouchableOpacity onPress={() => {
                                if(item.board != null){
                                    getCurrentContent({ id: item.boardcontent._id })
                                    navigate('SelectedContent', { boardName: item.board.name, boardId:item.board._id})
                                }
                            }}>
                                <BoardNoticeForm notice={item} />
                            </TouchableOpacity> :
                            (item.noticetype == 'bsonglike' ?
                            <TouchableOpacity onPress={async () => {
                                await getSelectedBoard({id: item.board._id})
                                navigate('MusicArchive', {name: item.board.name})
                            }}>
                                <BoardNoticeForm notice={item} />
                            </TouchableOpacity> :
                            (item.noticetype == 'follow' ?
                            <TouchableOpacity onPress = {async () => {
                                await Promise.all([getOtheruser({id:item.noticinguser._id}),
                                getSongs({id:item.noticinguser._id})]);
                                navigation.push('OtherAccount', {otherUserId: item.noticinguser._id})
                            }}>
                                <UserNoticeForm notice={item} />
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