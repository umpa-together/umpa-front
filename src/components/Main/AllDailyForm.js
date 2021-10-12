import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as DailyContext } from 'context/DailyContext';
import { push } from 'navigationRef';
import LoadingIndicator from '../LoadingIndicator'
import { SongImage } from 'components/SongImage'
import { useRefresh } from 'providers/refresh';
import { useFocusEffect } from '@react-navigation/native';

export default AllDailyForm = () => {
    const { state, getDaily, nextAllDailys, getAllDailys } = useContext(DailyContext)
    const [loading, setLoading] = useState(false);
    const { refreshing, onRefresh, setRefresh } = useRefresh()
    
    const getData = async () => {
        if(state.allDailys.length >= 20 && !state.notAllDailysNext){
            setLoading(true);
            await nextAllDailys({ page: state.currentAllDailysPage });
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

    useEffect(() => {
        getAllDailys()
        setRefresh(getAllDailys)
    }, [])

    useFocusEffect(
        useCallback(() => {
            setRefresh(getAllDailys)
        }, [])
    )

    return (
        <View style={styles.container}>
            { state.allDailys == null ? <LoadingIndicator /> :
            <FlatList 
                numColumns={3}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={loading && <ActivityIndicator />}
                data={state.allDailys}
                keyExtractor={daily => daily._id}
                renderItem={({item, index}) => {
                    const { image, song } = item
                    return (
                        <TouchableOpacity 
                            onPress={async () => {
                                await getDaily({id:item._id, postUserId:item.postUserId._id})
                                push('SelectedDaily', {id: item._id, postUser: item.postUserId._id})
                            }}
                            style={[styles.item, index%3 === 1 && styles.secondColumn]}
                        >
                            {image[0] ? 
                            <Image style={styles.img} source={{url : image[0]}}/> : 
                            <SongImage url={song.attributes.artwork.url} size={117} border={4}/> }
                        </TouchableOpacity>
                    )
                }}
            /> }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        marginTop: 8 * tmpWidth,
        paddingLeft: 8 * tmpWidth,
        height: '100%',
    },
    item: {
        marginBottom: 4 * tmpWidth, 
        marginRight: 4 * tmpWidth
    },
    img: {
        borderRadius: 4 * tmpWidth,
        width: 117 * tmpWidth, 
        height: 117 * tmpWidth, 
    },
    secondColumn: {
        marginTop: 12 * tmpWidth,
        marginBottom: -12 * tmpWidth,
    }
})