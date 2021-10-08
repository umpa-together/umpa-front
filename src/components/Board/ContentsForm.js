import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { Context as BoardContext } from 'context/BoardContext';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { useRefresh } from 'providers/refresh';

const ContentsForm = ({ Contents }) => {
    const { state, getCurrentBoard, getCurrentContent, nextContents } = useContext(BoardContext);
    const [loading, setLoading] = useState(false);
    const { refreshing, onRefresh, setRefresh } = useRefresh()

    const getData = async () => {
        if(Contents.length >= 20 && !state.boardNotNext){
            setLoading(true);
            await nextContents({ boardId: state.boards._id, page: state.currentBoardPage });
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

    const fetchData = () => {
        getCurrentBoard({boardId: state.boards._id});
    };

    useEffect(() => {
        setRefresh(fetchData)
    }, [])
    
    return (
        <View style={styles.container}>
            <FlatList 
                data={Contents}
                keyExtractor={(content) => content._id}
                onEndReached={onEndReached}
                onEndReachedThreshold={0}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={loading && <ActivityIndicator />}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    if(!item.isDeleted) {
                        return (
                            <TouchableOpacity style={styles.contentBox} onPress={() => {
                                getCurrentContent({id: item._id })
                                navigate('SelectedContent', { boardName: state.boards.name })
                            }}>
                                <View style={{paddingLeft: 23 * tmpWidth, paddingRight: 23 * tmpWidth}}>
                                    <View style={{flexDirection: 'row'}}>
                                        { item.postUserId.profileImage == undefined ?
                                        <View style={styles.profile}>
                                           <SvgUri width='100%' height='100%' source={require('assets/icons/noprofile.svg')} />
                                        </View> :
                                        <Image style={styles.profile} source={{uri: item.postUserId.profileImage}}/> }
                                        <View style={styles.nameBox}>
                                            <Text style={styles.nameText}>{item.postUserId.name}</Text>
                                            <Text style={styles.timeText}>{item.time}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentContainer}>
                                        {item.image.length != 0 ? 
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                                            <View>
                                                <View style={{width: 240 * tmpWidth, flexDirection: 'row', alignItems: 'center'}}>
                                                    <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                                                    { (item.song != null || item.song != undefined) && 
                                                    <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('assets/icons/boardMusicIcon.svg')} /> }
                                                </View>
                                                <View style={{width: 240 * tmpWidth}}>
                                                    <Text style={styles.contentText} numberOfLines={3}>{item.content}</Text>
                                                </View>
                                                <View style={styles.footer}>
                                                    <Text style={styles.footerText}>댓글 {item.comments.length}</Text>
                                                    <Text style={styles.footerText}>좋아요 {item.likes.length}</Text>
                                                    <Text style={{fontSize: 12 * tmpWidth}}>스크랩 {item.scrabs.length}</Text>
                                                </View> 
                                            </View>
                                            <Image style={styles.image} source={{uri: item.image[0]}} />
                                        </View> :
                                        <View>
                                            <View style={{flexDirection: 'row', alignItems: 'center', width: item.song != null || item.song != undefined ? 300 * tmpWidth : null}}>
                                                <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                                                { item.song != null || item.song != undefined ? 
                                                <SvgUri width={24 * tmpWidth} height={24 * tmpWidth} source={require('assets/icons/boardMusicIcon.svg')} />
                                                : null }
                                            </View>
                                            <Text style={styles.contentText} numberOfLines={3}>{item.content}</Text>
                                            <View style={styles.footer}>
                                                <Text style={styles.footerText}>댓글 {item.comments.length}</Text>
                                                <Text style={styles.footerText}>좋아요 {item.likes.length}</Text>
                                                <Text style={{fontSize: 12 * tmpWidth}}>스크랩 {item.scrabs.length}</Text>
                                            </View> 
                                        </View> }
                                    </View>   
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
        </View>
    );
};

const styles=StyleSheet.create({
    container: {
        marginTop: 8 * tmpWidth,
        flex: 1,
    },
    contentBox: {
        paddingTop: 20 * tmpWidth,
        paddingBottom: 16 * tmpWidth,
        borderBottomWidth: 2 * tmpWidth,
        borderBottomColor: 'rgb(242, 242, 242)',
        flex: 1,
    },
    profile: {
        height: 32 * tmpWidth,
        width: 32 * tmpWidth,
        borderRadius: 32 * tmpWidth,
    },
    image: {
        height: 64 * tmpWidth,
        width: 64 * tmpWidth,
        borderRadius: 4 * tmpWidth,
    },
    nameBox: {
        marginLeft: 12 * tmpWidth, 
        paddingTop: 4 * tmpWidth
    },
    nameText: {
        fontSize: 12 * tmpWidth
    },
    timeText: {
        fontSize: 11 * tmpWidth, 
        color: 'rgb(164,164,164)',
        marginTop: 4 * tmpWidth
    },
    contentContainer: {
        flexDirection: 'row', 
        marginTop: 9 * tmpWidth,
    },
    titleText: { 
        fontSize:14 * tmpWidth
    },
    contentText: {
        fontSize: 12 * tmpWidth, 
        color: 'rgb(93,93,93)', 
        marginTop: 8 * tmpWidth,
        lineHeight: 18 * tmpWidth
    },
    footer: {
        flexDirection: 'row', 
        marginTop: 12 * tmpWidth,
    },
    footerText: {
        fontSize: 12 * tmpWidth,
        marginRight: 13 * tmpWidth
    }
});

export default ContentsForm;