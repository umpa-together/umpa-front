/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as NoticeContext } from 'context/NoticeContext';
import { tmpWidth } from 'components/FontNormalize';
import { push } from 'navigationRef';
import ProfileImage from 'components/ProfileImage';

const PlaylistNoticeForm = ({ notice }) => {
  const {
    noticinguser: user,
    noticetype: type,
    playlist,
    playlistcomment,
    playlistrecomment,
    time,
    _id: id,
    isRead,
  } = notice;
  const { getOtheruser } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);
  const { getPlaylist } = useContext(PlaylistContext);
  const { readNotice } = useContext(NoticeContext);

  const onClickProfile = async () => {
    await Promise.all([getOtheruser({ id: user._id }), getSongs({ id: user._id })]);
    push('OtherAccount', { otherUserId: user._id });
  };

  const onClickNotice = async () => {
    if (!isRead) readNotice({ id });
    await getPlaylist({ id: playlist._id, postUserId: playlist.postUserId });
    push('SelectedPlaylist', { id: playlist._id, postUser: playlist.postUserId });
  };

  return (
    <TouchableOpacity style={[styles.container, styles.flexRow]} onPress={onClickNotice}>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {playlist.title}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {user.name}
          {type === 'plike' ? (
            <Text style={styles.contentText}>
              {' '}
              님이 플레이리스트를 좋아합니다. <Text style={styles.time}>{time}</Text>
            </Text>
          ) : type === 'pcom' ? (
            <Text style={styles.contentText}>
              {' '}
              님이 댓글을 달았습니다: {playlistcomment.text} <Text style={styles.time}>{time}</Text>
            </Text>
          ) : type === 'pcomlike' ? (
            <Text style={styles.contentText}>
              {' '}
              님이 댓글: {playlistcomment.text}를 좋아합니다.{' '}
              <Text style={styles.time}>{time}</Text>
            </Text>
          ) : type === 'precom' ? (
            <Text style={styles.contentText}>
              {' '}
              님이 대댓글을 달았습니다: {playlistrecomment.text}{' '}
              <Text style={styles.time}>{time}</Text>
            </Text>
          ) : type === 'precomlike' ? (
            <Text style={styles.contentText}>
              {' '}
              님이 대댓글: {playlistrecomment.text}을 좋아합니다.{' '}
              <Text style={styles.time}>{time}</Text>
            </Text>
          ) : null}
        </Text>
      </View>
      <Image style={styles.playlistImg} source={{ uri: playlist.image }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    marginBottom: 7 * tmpWidth,
    marginTop: 7 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 12 * tmpWidth,
    paddingRight: 12 * tmpWidth,
  },
  profileImg: {
    height: 48 * tmpWidth,
    width: 48 * tmpWidth,
    borderRadius: 48 * tmpWidth,
  },
  playlistImg: {
    height: 48 * tmpWidth,
    width: 48 * tmpWidth,
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
    lineHeight: 18 * tmpWidth,
  },
  contentText: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    lineHeight: 18 * tmpWidth,
  },
  time: {
    fontSize: 12 * tmpWidth,
    fontWeight: '400',
    color: '#9499a3',
  },
});

export default PlaylistNoticeForm;
