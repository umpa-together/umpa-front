import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as FeedContext } from 'context/FeedContext';
import { tmpWidth } from 'components/FontNormalize';
import Playlist from './Playlist'
import Daily from './Daily';

export default Contents = () => {
    const { state: feedState, getFeeds, nextFeeds } = useContext(FeedContext);
    const { state, getOtherStory } = useContext(UserContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const getData = async () => {
        if(feedState.feed.length >= 20 && !feedState.notNext){
            setLoading(true);
            await nextFeeds({ page: feedState.currentFeedPage });
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
        await Promise.all([
            getFeeds(),
            getOtherStory()
        ])
        setRefreshing(false);
    };

    const onRefresh = () => {
        if (refreshing){
            return;
        }else{
            fetchData();
        }
    }

    return (
        <View style={styles.flex}>
            {state.otherStory && 
            <View style={styles.flex}>
                { feedState.feed.length !=0 ?
                <FlatList
                    data ={feedState.feed}
                    keyExtractor = {feed => feed._id}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    ListFooterComponent={loading && <ActivityIndicator />}
                    renderItem = {({item}) => {
                        const { playlist, type, daily, _id: id } = item
                        return (
                            <View key={id}>
                                { type == 'playlist' ? 
                                <Playlist playList={playlist} type={type} /> : <Daily daily={daily} type={type} /> }
                            </View>
                        ) 
                    }}
                /> : 
                <View style={styles.container}>
                    <Text style={styles.text}>팔로우한 사람이 올린 플레이리스트가 없습니다.</Text>
                    <Text style={[styles.text, styles.margin]}>다른 사람들을 팔로우 해보세요!</Text>
                    <TouchableOpacity 
                        style={styles.icon}
                        onPress={()=> fetchData()}
                    >   
                        <Text style={styles.refresh}>새로고침</Text>
                    </TouchableOpacity>
                </View> }
            </View> }
        </View>
    );
};

const styles=StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text: {
        color: 'rgb(93,93,93)'
    },
    margin: {
        marginTop: 10 * tmpWidth
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(169,193,255)', 
        borderRadius: 20 * tmpWidth,
        width: 80 * tmpWidth,
        height: 30 * tmpWidth,
        marginTop: 20 * tmpWidth
    },
    refresh: {
        color: 'white',
        marginTop: 8 * tmpWidth
    }
});