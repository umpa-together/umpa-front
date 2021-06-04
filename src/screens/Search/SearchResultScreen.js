import React, { useState, useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';

import { Context as SearchContext } from '../../context/SearchContext';
import { Context as SearchPlaylistContext } from '../../context/SearchPlaylistContext';
import { Context as CurationContext } from '../../context/CurationContext'

import { navigate } from '../../navigationRef';
import { tmpWidth, tmpHeight } from '../../components/FontNormalize';
import SvgUri from 'react-native-svg-uri';

const Imagetake = ({url, borderRadius}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return <Image style ={{height:'100%', width:'100%', borderRadius: borderRadius}} source ={{url:url}}/>
};

const SearchResultScreen = ({navigation, searchOption, text}) => {
    const { state: searchState, songNext, searchDJ } = useContext(SearchContext);
    const { SearchSongOrArtist, initPlaylist } = useContext(SearchPlaylistContext);
    const { getCuration } = useContext(CurationContext);
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        if(searchState.songData.length >= 20){
            setLoading(true);
            if(searchState.songNext != undefined)   await songNext({ next: searchState.songNext.substr(22) });
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
        const listener =navigation.addListener('didFocus', ()=>{
            initPlaylist()
        });
        return () => {
            listener.remove();
        };
    }, []);
    return (
        <View style={{height:650 * tmpHeight}}>
            {searchState.songData.length == 0 && text.length!=0 ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> : 
                <View>
                { searchOption == 'Song' || searchOption == 'DJSong'? 
                <FlatList 
                    style={{paddingTop: 10 * tmpWidth}}
                    data={searchState.songData}
                    keyExtractor={song=>song.id}
                    maxToRenderPerBatch={1}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.8}
                    ListFooterComponent={loading && <ActivityIndicator />}        
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={styles.resultitem} onPress={() => {
                                if(searchOption == 'Song'){
                                    getCuration({isSong: true, object: item, id:item.id})
                                    SearchSongOrArtist({ id: item.id})    
                                }else{
                                    searchDJ({songName: item.attributes.name})
                                }
                                navigate('SelectedSong', {song: item, category: searchOption})}}>
                                <View style={{width: 56 * tmpWidth, height: 54.4 * tmpWidth}}>
                                    <Imagetake borderRadius={70} url={item.attributes.artwork.url}/>
                                </View>
                                <View style={{marginLeft: 24 * tmpWidth, width:tmpWidth*220, }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        {item.attributes.contentRating == "explicit" ? 
                                        <SvgUri width="17" height="17" source={require('../../assets/icons/19.svg')} style={{marginRight: 5 * tmpWidth}}/> 
                                        : null }
                                        <Text numberOfLines ={1} style={{fontSize:16 * tmpWidth}}>{item.attributes.name}</Text>
                                    </View>
                                    <Text numberOfLines ={1}  style={{color:'#c6c6c6',fontSize:14 * tmpWidth, marginTop:3 * tmpWidth}}>{item.attributes.artistName}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                /> : null } 
            </View> }
        </View>
    )
};

const styles=StyleSheet.create({
    resultitem:{

        width: 327 * tmpWidth,
        height:70 * tmpWidth,
        marginLeft:24 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default SearchResultScreen;