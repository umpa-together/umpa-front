import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize';

const PlaylistNoticeForm = ({ notice }) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {notice.noticinguser.profileImage == undefined ?
                <View style={styles.img}>
                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                </View> : <Image style={styles.img} source={{uri: notice.noticinguser.profileImage}} /> }
                { notice.noticetype == 'plike'&& notice.playlist != null ?
                    <View style={styles.content}>
                        <View style={{flex: 1}}>
                            <Text style={styles.playlistName}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 플레이리스트를 좋아합니다. <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                        <Image style={styles.playlistImg} source={{uri: notice.playlist.image}}></Image>
                    </View>
                : notice.noticetype == 'pcom'&& notice.playlist != null && notice.playlistcomment != null ?
                    <View style={styles.content}>
                        <View style={{flex: 1}}>
                            <Text style={styles.playlistName}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 댓글을 달았습니다: {notice.playlistcomment.text} <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                        <Image style={styles.playlistImg} source={{uri: notice.playlist.image}}></Image>
                    </View>
                : notice.noticetype == 'pcomlike' && notice.playlist != null&& notice.playlistcomment != null ?
                    <View style={styles.content}>
                        <View style={{flex: 1}}>
                            <Text style={styles.playlistName}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 댓글: {notice.playlistcomment.text}를 좋아합니다. <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                        <Image style={styles.playlistImg} source={{uri: notice.playlist.image}}></Image>
                    </View>
                : notice.noticetype == 'precom'&& notice.playlist != null&& notice.playlistrecomment != null ?
                    <View style={styles.content}>
                        <View style={{flex: 1}}>
                            <Text style={styles.playlistName}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 대댓글을 달았습니다: {notice.playlistrecomment.text} <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                        <Image style={styles.playlistImg} source={{uri: notice.playlist.image}}></Image>
                    </View>
                : notice.noticetype == 'precomlike' && notice.playlist != null && notice.playlistrecomment != null  ?
                    <View style={styles.content}>
                        <View style={{flex: 1}}>
                            <Text style={styles.playlistName}>{notice.playlist.title}</Text>
                            <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                                <Text style={styles.innerText}> 님이 대댓글: {notice.playlistrecomment.text}을 좋아합니다. <Text style={styles.playlistName}>{notice.time}</Text></Text>
                            </Text>
                        </View>
                        <Image style={styles.playlistImg} source={{uri: notice.playlist.image}}></Image>
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
        color: 'rgba(0,0,0,0.61)'
    },
    outerText: {
        fontSize: 14 * tmpWidth, 
        fontWeight: '500'
    },
    innerText: {
        fontWeight:'400'
    }
});

export default PlaylistNoticeForm;