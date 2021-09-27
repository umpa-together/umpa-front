import React, { useContext, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as NoticeContext } from 'context/NoticeContext';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { Context as BoardContext } from 'context/BoardContext';
import PlaylistNoticeForm from 'components/Notice/PlaylistNoticeForm';
import BoardNoticeForm from 'components/Notice/BoardNoticeForm';
import UserNoticeForm from 'components/Notice/UserNoticeForm';
import { navigate, push } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useFocusEffect } from '@react-navigation/native';
import Header from 'components/Header';
import LoadingIndicator from 'components/LoadingIndicator'

const NoticeScreen = () => {
    const { state, getnotice, nextNotice } = useContext(NoticeContext);
    const { initPlaylist, getPlaylist } = useContext(PlaylistContext);
    const { getOtheruser, initOtherUser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
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

    useFocusEffect(
        useCallback(() => {
            initPlaylist()
            initOtherUser()
            initMusic()
            initCurrentContent()
        }, [])        
    )

    return (
        <View style={{height:'100%', width: '100%', backgroundColor: 'rgb(254,254,254)'}}>
            <Header title="알림" />
            {state.notice == null ? <LoadingIndicator /> :
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
                                    push('SelectedPlaylist', {id: item.playlist._id, postUser: item.playlist.postUserId})
                                }
                            }}>
                                <PlaylistNoticeForm notice={item} /> 
                            </TouchableOpacity> :
                            ( item.noticetype == 'pcom' || item.noticetype == 'pcomlike' 
                            || item.noticetype == 'precom' || item.noticetype == 'precomlike' ?
                            <TouchableOpacity onPress={async () => {
                                if(item.playlist != null){
                                    await getPlaylist({id:item.playlist._id, postUserId:item.playlist.postUserId})
                                    push('SelectedPlaylist', {id: item.playlist._id, postUser: item.playlist.postUserId})
                                }
                            }}>
                                <PlaylistNoticeForm notice={item} /> 
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
                                push('OtherAccount', {otherUserId: item.noticinguser._id})
                            }}>
                                <UserNoticeForm notice={item} />
                            </TouchableOpacity> : null ))))}
                        </View>
                    )
                }}
            /> }
        </View>
    );
};

export default NoticeScreen;