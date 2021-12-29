import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';

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
        const { attributes, id } = item;
        const { url } = item.attributes.artwork;
        const { contentRating, name, artistName } = attributes;
        return (
          <View>
            <TouchableOpacity onPress={() => onClickSong(item)} activeOpacity={0.9}>
              <SongImage url={url} imgStyle={styles.playlistsImg} />
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
    paddingLeft: 18 * SCALE_WIDTH,
    marginTop: 6 * SCALE_HEIGHT,
  },
  playlistsImg: {
    width: 120 * SCALE_WIDTH,
    height: 120 * SCALE_WIDTH,
    borderRadius: 4 * SCALE_WIDTH,
    borderWidth: 0.5 * SCALE_WIDTH,
    borderColor: '#e3e3e3',
    marginRight: 8 * SCALE_WIDTH,
  },
  nameBox: {
    marginTop: 9 * SCALE_HEIGHT,
    width: 117 * SCALE_WIDTH,
  },
  explicitName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9 * SCALE_HEIGHT,
    width: 95 * SCALE_WIDTH,
  },
  artistBox: {
    width: 110 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(14),
    lineHeight: 16 * SCALE_HEIGHT,
  },
  artist: {
    fontSize: FS(13),
    color: '#838383',
    marginTop: 4 * SCALE_HEIGHT,
  },
  playIcon: {
    position: 'absolute',
    right: 6 * SCALE_WIDTH,
    bottom: 6 * SCALE_HEIGHT,
  },
});
