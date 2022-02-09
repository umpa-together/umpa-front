/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import timeConverter from 'lib/utils/time';
import { COLOR_1 } from 'constants/colors';
import Text from 'components/Text';
import PlaylistAlbumImage from '../PlaylistAlbumImage';

export default function PlaylistNoticeForm({ notice, onClickProfile }) {
  const {
    noticinguser: user,
    noticetype: type,
    playlist,
    playlistcomment,
    playlistrecomment,
    time,
  } = notice;
  const { image, songs } = playlist;
  const textLists = {
    plike: <Text style={styles.contentText}>플레이리스트를 좋아합니다.</Text>,
    pcom: (
      <Text style={styles.contentText}>
        댓글을 달았습니다: {playlistcomment && playlistcomment.text}
      </Text>
    ),
    pcomlike: (
      <Text style={styles.contentText}>
        댓글: {playlistcomment && playlistcomment.text}를 좋아합니다.
      </Text>
    ),
    precom: (
      <Text style={styles.contentText}>
        대댓글을 달았습니다: {playlistrecomment && playlistrecomment.text}
      </Text>
    ),
    precomlike: (
      <Text style={styles.contentText}>
        대댓글: {playlistrecomment && playlistrecomment.text}을 좋아합니다.
      </Text>
    ),
  };
  return (
    <>
      <TouchableOpacity onPress={onClickProfile}>
        <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {`${user.name} 님이 `}
          {textLists[type]}
          <Text style={styles.time}>{`  ${timeConverter(time)}`}</Text>
        </Text>
      </View>
      <PlaylistAlbumImage image={image} songs={songs} size={48} />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 12 * SCALE_WIDTH,
  },
  profileImg: {
    height: 48 * SCALE_WIDTH,
    width: 48 * SCALE_WIDTH,
    borderRadius: 48 * SCALE_WIDTH,
  },
  playlistImg: {
    height: 48 * SCALE_WIDTH,
    width: 48 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    color: COLOR_1,
    lineHeight: 18 * SCALE_HEIGHT,
  },
  contentText: {
    fontSize: FS(14),
    color: COLOR_1,
    lineHeight: 18 * SCALE_HEIGHT,
  },
  time: {
    fontSize: FS(12),
    color: '#9499a3',
  },
});
