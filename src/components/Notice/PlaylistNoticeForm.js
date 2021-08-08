import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Context as UserContext } from '../../context/UserContext'
import { Context as DJContext } from '../../context/DJContext'
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize';
import { push } from '../../navigationRef';

const PlaylistNoticeForm = ({ notice }) => {
    const { getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={styles.img} onPress={async () =>{
                    await Promise.all([getOtheruser({id:notice.noticinguser._id}),
                    getSongs({id:notice.noticinguser._id})]);
                    push('OtherAccount', {otherUserId:notice.noticinguser._id})
                }}>
                    { notice.noticinguser.profileImage == undefined ?
                    <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                    : <Image style={styles.img} source={{uri: notice.noticinguser.profileImage}} /> }
                </TouchableOpacity> 
                { notice.noticetype == 'plike'&& notice.playlist != null ?
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.playlistName} numberOfLines={1}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 플레이리스트를 좋아합니다. <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.playlistImg} source={{uri: notice.playlist.image}} />
                </View>
                : notice.noticetype == 'pcom'&& notice.playlist != null && notice.playlistcomment != null ?
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.playlistName} numberOfLines={1}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 댓글을 달았습니다: {notice.playlistcomment.text} <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.playlistImg} source={{uri: notice.playlist.image}} />
                </View>
                : notice.noticetype == 'pcomlike' && notice.playlist != null&& notice.playlistcomment != null ?
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.playlistName} numberOfLines={1}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 댓글: {notice.playlistcomment.text}를 좋아합니다. <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.playlistImg} source={{uri: notice.playlist.image}} />
                </View>
                : notice.noticetype == 'precom'&& notice.playlist != null&& notice.playlistrecomment != null ?
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.playlistName} numberOfLines={1}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 대댓글을 달았습니다: {notice.playlistrecomment.text} <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.playlistImg} source={{uri: notice.playlist.image}} />
                </View>
                : notice.noticetype == 'precomlike' && notice.playlist != null && notice.playlistrecomment != null  ?
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={styles.content}>
                        <View style={{width: 200 * tmpWidth}}>
                            <Text style={styles.playlistName} numberOfLines={1}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 대댓글: {notice.playlistrecomment.text}을 좋아합니다. <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                    </View>
                    <Image style={styles.playlistImg} source={{uri: notice.playlist.image}} />
                </View>
                :
                    <View style={styles.content}>
                        <Text>삭제된 알람입니다</Text>
                    </View>
                    }
            </View>
        </View>
    )
};

const styles=StyleSheet.create({
    container: {
        marginLeft: 20 * tmpWidth, 
        marginRight: 20 * tmpWidth, 
        flex: 1
    },
    img: {
        height: 48 * tmpWidth, 
        width: 48 * tmpWidth, 
        borderRadius: 48 * tmpWidth,
    },
    playlistImg: {
        height: 48 * tmpWidth, 
        width: 48 * tmpWidth, 
    },
    content: {
        marginLeft: 14 * tmpWidth, 
        flex: 1,
        flexDirection: 'row'
    },
    playlistName: {
        fontSize: 12 * tmpWidth,
        color: 'rgba(0,0,0,0.61)',
        lineHeight: 18 * tmpWidth,
    },
    outerText: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '500',
        lineHeight: 18 * tmpWidth,
    },
    innerText: {
        fontWeight:'400',
        lineHeight: 18 * tmpWidth,
    }
});

export default PlaylistNoticeForm;