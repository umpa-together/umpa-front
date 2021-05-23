import React, { useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as UserContext } from '../../context/UserContext';
import { Context as BoardContext } from '../../context/BoardContext';
import { navigate } from '../../navigationRef';
import { tmpWidth } from '../../components/FontNormalize';

const SongImage = ({url}) => {
    url =url.replace('{w}', '300');
    url = url.replace('{h}', '300');
    return (
        <Image style ={{borderRadius : 50 * tmpWidth, height:'100%', width:'100%'}} source ={{url:url}}/>
    );
};

const MySharedSongsPage = () => {
    const { state } = useContext(UserContext);
    const { getCurrentBoard, getSelectedBoard } = useContext(BoardContext);

    return (
        <View style={styles.container}>
            {state.myBoardSongs == null ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator /></View> :
            <FlatList 
                data={state.myBoardSongs}
                keyExtractor={(song)=>song._id}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity style={styles.songBox} onPress={async () => {
                            getCurrentBoard({boardId:item.boardId._id})
                            await getSelectedBoard({id: item.boardId._id})
                            navigate('MusicArchive', {name:item.boardId.name})}}>
                            <View style={styles.songCover}>
                                <SongImage url={item.song.attributes.artwork.url}/>
                            </View>
                            <View style={styles.textBox}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <View style={{width: 150 * tmpWidth}}>
                                        <Text style={styles.titleText} numberOfLines={1}>{item.song.attributes.name}</Text>
                                    </View>
                                    <View style={{width: 100 * tmpWidth, alignItems: 'flex-end'}}>
                                        <Text style={styles.boardText} numberOfLines={1}>{item.boardId.name}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{width: 120 * tmpWidth}}>
                                        <Text style={styles.artistText} numberOfLines={1}>{item.song.attributes.artistName}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 8 * tmpWidth}}>
                                        <Text style={styles.viewText}>조회수 {item.views}</Text>
                                        <Text style={styles.likeText}>좋아요 {item.likes.length}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            /> }
        </View>
    );
};

MySharedSongsPage.navigationOptions = ({navigation})=>{
    return {
        title: '공유한 음악',
        headerTitleStyle: {
            fontSize: 16 * tmpWidth,
            fontWeight: "400"
        }, 
        headerStyle: {
            backgroundColor: 'rgb(255,255,255)',
            height: 92 * tmpWidth,
            backgroundColor: 'rgb(255,255,255)',
            shadowColor: "rgb(0, 0, 0)",
            shadowOffset: {
                height: 3 * tmpWidth,
                width: 0,
            },
            shadowRadius: 8 * tmpWidth,
            shadowOpacity: 0.07,
        },
        headerLeft: () => {
            return (
                <TouchableOpacity style={{marginLeft: 5 * tmpWidth}} onPress={() => navigation.goBack()}>
                    <SvgUri width='40' height='40' source={require('../../assets/icons/back.svg')}/>
                </TouchableOpacity>
            )
        }
    };
};

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'rgb(254,254,254)', 
        flex: 1,
    },
    songBox: {
        width: '100%',
        height: 96 * tmpWidth,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1 * tmpWidth,
        borderBottomColor: 'rgb(229,231,239)'
    },
    songCover: {
        width: 56 * tmpWidth,
        height: 56 * tmpWidth,
        marginLeft: 24 * tmpWidth
    },
    textBox: {
        flex: 1, 
        marginLeft: 24 * tmpWidth, 
        marginRight: 18 * tmpWidth
    },
    titleText: {
        fontSize: 16 * tmpWidth
    },
    boardText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(148,153,163)'
    },
    artistText: {
        fontSize: 14 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginTop: 8 * tmpWidth
    }, 
    viewText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(79,79,79)', 
    },
    likeText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(79,79,79)', 
        marginLeft: 12 * tmpWidth
    }
});

export default MySharedSongsPage;