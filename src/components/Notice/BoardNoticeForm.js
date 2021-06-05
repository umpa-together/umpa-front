import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from '../FontNormalize';

const BoardNoticeForm = ({ notice }) => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {notice.noticinguser.profileImage == undefined ?
                <View style={styles.img}>
                   <SvgUri width='100%' height='100%' source={require('../../assets/icons/noprofile.svg')} />
                </View> : <Image style={styles.img} source={{uri: notice.noticinguser.profileImage}} /> }
                { notice.noticetype == 'blike' && notice.board != null && notice.boardcontent != null ?
                    <View style={styles.content}>
                        <Text style={styles.boardName} numberOfLines={1}>{notice.board.name}</Text>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name}
                            <Text style={styles.innerText}> 님이 게시글: {notice.boardcontent.content}을 좋아합니다. <Text style={styles.boardName}>{notice.time}</Text></Text>
                        </Text>
                    </View>
                : notice.noticetype == 'bcom'  && notice.board != null  && notice.boardcomment != null && notice.boardcontent != null ?
                    <View style={styles.content}>
                        <Text style={styles.boardName} numberOfLines={1}>{notice.board.name}</Text>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            <Text style={styles.innerText}> 님이 게시글 '{notice.boardcontent.content}'에 댓글을 달았습니다: {notice.boardcomment.comment} <Text style={styles.boardName}>{notice.time}</Text></Text>
                        </Text>
                    </View>
                : notice.noticetype == 'bcomlike' && notice.board != null  && notice.boardcomment != null && notice.boardcontent != null ?
                    <View style={styles.content}>
                        <Text style={styles.boardName} numberOfLines={1}>{notice.board.name}</Text>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            <Text style={styles.innerText}> 님이 게시글 '{notice.boardcontent.content}'의 댓글: {notice.boardcomment.comment}을 좋아합니다. <Text style={styles.boardName}>{notice.time}</Text></Text>
                        </Text>
                    </View>
                : notice.noticetype == 'brecom' && notice.board != null  && notice.boardrecomment != null && notice.boardcontent != null ?
                    <View style={styles.content}>
                        <Text style={styles.boardName} numberOfLines={1}>{notice.board.name}</Text>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            <Text style={styles.innerText}> 님이 게시글 '{notice.boardcontent.content}'에 대댓글을 달았습니다: {notice.boardrecomment.comment} <Text style={styles.boardName}>{notice.time}</Text></Text>
                        </Text>
                    </View>
                : notice.noticetype == 'brecomlike' && notice.board != null  && notice.boardrecomment != null && notice.boardcontent != null?
                    <View style={styles.content}>
                        <Text style={styles.boardName} numberOfLines={1}>{notice.board.name}</Text>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            <Text style={styles.innerText}> 님이 게시글 '{notice.boardcontent.content}'의 대댓글: {notice.boardrecomment.comment}을 좋아합니다. <Text style={styles.boardName}>{notice.time}</Text></Text>
                        </Text>
                    </View>
                : notice.noticetype == 'bsonglike' && notice.board != null  && notice.boardsong != null ?
                    <View style={styles.content}>
                        <Text style={styles.boardName} numberOfLines={1}>{notice.board.name}</Text>
                        <Text style={styles.outerText} numberOfLines={2}>{notice.noticinguser.name} 
                            <Text style={styles.innerText}> 님이 {notice.boardsong.song.attributes.artistName} - {notice.boardsong.song.attributes.name}를 좋아합니다. <Text style={styles.boardName}>{notice.time}</Text></Text>
                        </Text>
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
        marginLeft: 20  * tmpWidth, 
        marginRight: 20 * tmpWidth,  
        flex: 1
    },
    img: {
        height: 48 * tmpWidth, 
        width: 48 * tmpWidth, 
        borderRadius: 48 * tmpWidth,
    },
    content: {
        marginLeft: 14 * tmpWidth, 
        flex: 1,
    },
    boardName: {
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

export default BoardNoticeForm;