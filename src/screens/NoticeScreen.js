import React, { useContext, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Context as NoticeContext } from 'context/NoticeContext';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as BoardContext } from 'context/BoardContext';
import { useFocusEffect } from '@react-navigation/native';
import Header from 'components/Header';
import LoadingIndicator from 'components/LoadingIndicator'
import ReadNotice from 'components/Notice/ReadNotice';
import UnReadNotice from 'components/Notice/UnReadNotice';

const NoticeScreen = () => {
    const { state, getnotice, nextNotice } = useContext(NoticeContext);
    const { initPlaylist } = useContext(PlaylistContext);
    const { initOtherUser } = useContext(UserContext);
    const { initMusic, initCurrentContent } = useContext(BoardContext);
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
        <View style={styles.container}>
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
                    const { isRead } = item
                    return (
                        <>
                            {isRead ? <ReadNotice notice={item} /> : <UnReadNotice notice={item} /> }
                        </>
                    )
                }}
            /> }
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        height:'100%', 
        width: '100%', 
        backgroundColor: '#ffffff'
    }
})
export default NoticeScreen;