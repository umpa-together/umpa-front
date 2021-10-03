import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext'
import { Context as DJContext } from 'context/DJContext'
import { Context as BoardContext } from 'context/BoardContext';
import { Context as NoticeContext } from 'context/NoticeContext';
import { tmpWidth } from 'components/FontNormalize';
import { push, navigate } from 'navigationRef';
import ProfileImage from 'components/ProfileImage'

const BoardNoticeForm = ({ notice }) => {
    const { noticinguser: user, noticetype: type, time, board, boardcontent, boardcomment, boardrecomment, boardsong, _id: id, isRead } = notice
    const { getOtheruser } = useContext(UserContext);
    const { getSongs } = useContext(DJContext);
    const { getCurrentContent, getSelectedBoard } = useContext(BoardContext);
    const { readNotice } = useContext(NoticeContext)

    const onClickProfile = async () => {
        await Promise.all([
            getOtheruser({ id: user._id }),
            getSongs({ id: user._id })
        ]);
        push('OtherAccount', { otherUserId: user._id })
    }

    const onClickNotice = async () => {
        if(!isRead)  readNotice({ id })
        if (type === 'bsonglike') {
            await getSelectedBoard({ id: board._id })
            navigate('MusicArchive', { name: board.name })
        } else {
            getCurrentContent({ id: boardcontent._id })
            navigate('SelectedContent', { boardName: board.name, boardId: board._id })
        }
    }

    return (
        <TouchableOpacity 
            style={[styles.container, styles.flexRow]}
            onPress={onClickNotice}
        >
            <TouchableOpacity onPress={onClickProfile}>
                <ProfileImage img={user.profileImage} imgStyle={styles.profileImg}/>
            </TouchableOpacity> 
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{board.name}</Text>
                <Text style={styles.name} numberOfLines={2}>{user.name} 
                    {type === 'blike' ?
                    <Text style={styles.contentText}> 님이 게시글: {boardcontent.content}을 좋아합니다. <Text style={styles.time}>{time}</Text></Text> :
                    type === 'bcom' ? 
                    <Text style={styles.contentText}> 님이 게시글 '{boardcontent.content}'에 댓글을 달았습니다: {boardcomment.comment} <Text style={styles.time}>{notice.time}</Text></Text> :
                    type === 'bcomlike' ?
                    <Text style={styles.contentText}> 님이 게시글 '{boardcontent.content}'의 댓글: {boardcomment.comment}을 좋아합니다. <Text style={styles.time}>{notice.time}</Text></Text> :
                    type === 'brecom' ?
                    <Text style={styles.contentText}> 님이 게시글 '{boardcontent.content}'에 대댓글을 달았습니다: {boardrecomment.comment} <Text style={styles.time}>{notice.time}</Text></Text> :
                    type === 'brecomlike' ? 
                    <Text style={styles.contentText}> 님이 게시글 '{boardcontent.content}'의 대댓글: {boardrecomment.comment}을 좋아합니다. <Text style={styles.time}>{notice.time}</Text></Text> :
                    type === 'bsonglike' ?
                    <Text style={styles.contentText}> 님이 {boardsong.song.attributes.artistName} - {boardsong.song.attributes.name}를 좋아합니다. <Text style={styles.time}>{notice.time}</Text></Text> : null }
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles=StyleSheet.create({
    container: {
        marginLeft: 18  * tmpWidth, 
        marginRight: 18 * tmpWidth,  
        marginBottom: 7 * tmpWidth,
        marginTop: 7 * tmpWidth
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImg: {
        height: 48 * tmpWidth, 
        width: 48 * tmpWidth, 
        borderRadius: 48 * tmpWidth,
    },
    content: {
        flex: 1, 
        paddingLeft: 12 * tmpWidth, 
        paddingRight: 12 * tmpWidth
    },  
    title: {
        fontSize: 12 * tmpWidth,
        color: '#5d5d5d',
        fontWeight: '400',
        lineHeight: 14 * tmpWidth,
    },
    name: {
        fontSize: 14 * tmpWidth,
        fontWeight: '500',
        lineHeight: 18 * tmpWidth
    },
    contentText: {
        fontSize: 14 * tmpWidth,
        fontWeight: '400',
        lineHeight: 18 * tmpWidth
    },
    time: {
        fontSize: 12 * tmpWidth,
        fontWeight: '400',
        color: '#9499a3'
    }
});

export default BoardNoticeForm;