import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as CurationContext } from 'context/CurationContext';
import { SongImage } from 'components/SongImage'
import { push } from 'navigationRef';

const AllCurationForm = () => {
    const { state, getAllCurationPost, nextAllCurationPost, getCuration } = useContext(CurationContext)
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [allCuration, setAllCuration] = useState([]);
    const getData = async () => {
        if(state.allCurationPost.length >= 20 && !state.notAllCurationNext){
            setLoading(true);
            await nextAllCurationPost({ page: state.currentAllCurationPage });
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
        await getAllCurationPost()
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
        if(state.allCurationPost != null){
        setAllCuration(
        state.allCurationPost.filter((item, i) => {
            return (
                state.allCurationPost.findIndex((item2, j) => {
                    return item.songoralbumid == item2.songoralbumid;
                }) == i
            )
        })
        )
    }
    }, [state.allCurationPost]);
    return (
        <View style={styles.result}>
            { state.allCurationPost == null ? <View style={{flex: 1,justifyContent: 'center', alignContent: 'center'}}><ActivityIndicator/></View> :
            <FlatList
                numColumns={2}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={loading && <ActivityIndicator />}
                data={allCuration}
                keyExtractor={curation=>curation._id}
                renderItem={({item}) => {
                    return (
                        <View style={{width:161 * tmpWidth, marginRight: 14 * tmpWidth, marginBottom: 10 * tmpWidth}}>
                            { item.isSong ?
                            <View>
                                <TouchableOpacity style={{width:161 * tmpWidth, height:157 * tmpWidth, borderRadius: 8 * tmpWidth}} onPress={async ()=>{
                                    await getCuration({isSong : item.isSong,object:item.object,id:item.songoralbumid})
                                    push('SelectedCuration', {id: item.songoralbumid})
                                }}>
                                    <SongImage url={item.object.attributes.artwork.url} border={8} size={161}/>
                                </TouchableOpacity>
                                <Text numberOfLines ={1} style={{fontSize:14 * tmpWidth, marginTop:12 * tmpWidth}}>{item.object.attributes.name}</Text> 
                                <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth, marginTop:4 * tmpWidth, color:"#999999"}}>{item.object.attributes.artistName}</Text>
                            </View> :
                            <View>
                                <TouchableOpacity style={{width:161 * tmpWidth, height:157 * tmpWidth, borderRadius: 8 * tmpWidth}} onPress={async ()=>{
                                    await getCuration({isSong : item.isSong,object:item.object,id:item.songoralbumid})
                                    push('SelectedCuration', {id: item.songoralbumid})
                                }}>
                                    <SongImage url={item.object.artwork.url} border={8} size={161}/>
                                </TouchableOpacity>
                                <Text numberOfLines ={1} style={{fontSize:14 * tmpWidth, marginTop:12 * tmpWidth}}>{item.object.albumName}</Text> 
                                <Text numberOfLines ={1} style={{fontSize:12 * tmpWidth, marginTop:4 * tmpWidth, color:"#999999"}}>{item.object.artistName}</Text>
                            </View> }
                        </View>
                    )
                }}
            /> }
        </View>
    )
}

const styles=StyleSheet.create({
    result:{
        marginTop:18 * tmpWidth,
        paddingLeft:20 * tmpWidth,
        height: '100%',
        paddingBottom: 18 * tmpWidth,
    }
})

export default AllCurationForm;