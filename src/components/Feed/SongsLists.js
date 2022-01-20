import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';

export default function SongLists({ songs }) {
  const { isPlayingId, onClickSong } = useTrackPlayer();

  return (
    <FlatList
      contentContainerStyle={styles.songsContainer}
      data={songs}
      keyExtractor={(playlist) => playlist.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const {
          attributes: {
            contentRating,
            name,
            artistName,
            artwork: { url },
          },
          id,
        } = item;
        return (
          <View style={styles.songBox}>
            <TouchableOpacity onPress={() => onClickSong(item)} activeOpacity={0.9}>
              <SongImage url={url} imgStyle={styles.playlistsImg} />
              <Icon source={require('public/icons/feed-playlist-play.png')} style={styles.play} />
            </TouchableOpacity>
            <MoveText
              isExplicit={contentRating === 'explicit'}
              container={contentRating === 'explicit' ? styles.explicitName : styles.nameBox}
              text={name}
              isMove={id === isPlayingId}
              textStyle={styles.name}
            />
            <MoveText
              container={styles.artistBox}
              text={artistName}
              isMove={id === isPlayingId}
              textStyle={styles.artist}
            />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  songsContainer: {
    paddingLeft: 16 * SCALE_WIDTH,
    marginTop: 8 * SCALE_HEIGHT,
    marginBottom: 12 * SCALE_HEIGHT,
  },
  songBox: {
    marginRight: 8 * SCALE_WIDTH,
    width: 117 * SCALE_WIDTH,
  },
  playlistsImg: {
    width: 117 * SCALE_WIDTH,
    height: 117 * SCALE_WIDTH,
    borderRadius: 4 * SCALE_HEIGHT,
  },
  name: {
    fontSize: FS(14),
    lineHeight: 16 * SCALE_HEIGHT,
    marginTop: 9 * SCALE_HEIGHT,
  },
  artist: {
    fontSize: FS(13),
    color: '#838383',
    marginTop: 4 * SCALE_HEIGHT,
  },
  play: {
    position: 'absolute',
    right: 5 * SCALE_WIDTH,
    bottom: 13 * SCALE_HEIGHT,
    width: 17 * SCALE_WIDTH,
    height: 20 * SCALE_HEIGHT,
  },
});
