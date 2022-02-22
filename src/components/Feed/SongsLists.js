import React, { useCallback, memo } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';
import MoveText from 'components/MoveText';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import CopySongName from 'components/CopySongName';

const SONG_SIZE = 117;

export default memo(function SongLists({ songs }) {
  const { onClickSong } = useTrackPlayer();
  const keyExtractor = useCallback((_) => _.id, []);
  const renderItem = useCallback(({ item }) => {
    const {
      attributes: {
        contentRating,
        name,
        artistName,
        artwork: { url },
      },
    } = item;
    return (
      <View style={styles.songBox}>
        <TouchableOpacity
          style={styles.margin}
          onPress={() => onClickSong(item)}
          activeOpacity={0.9}
        >
          <SongImage url={url} imgStyle={styles.playlistsImg} />
          <Icon source={require('public/icons/feed-playlist-play.png')} style={styles.play} />
        </TouchableOpacity>
        <CopySongName name={name}>
          <MoveText
            container={contentRating === 'explicit' && styles.explicit}
            isExplicit={contentRating === 'explicit'}
            text={name}
            textStyle={styles.name}
          />
          <MoveText text={artistName} textStyle={styles.artist} />
        </CopySongName>
      </View>
    );
  });

  const getItemLayout = useCallback(
    (data, index) => ({
      length: SONG_SIZE * SCALE_WIDTH,
      offset: SONG_SIZE * SCALE_WIDTH * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      contentContainerStyle={styles.songsContainer}
      data={songs}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      maxToRenderPerBatch={3}
      windowSize={5}
      getItemLayout={getItemLayout}
    />
  );
});

const styles = StyleSheet.create({
  songsContainer: {
    paddingLeft: 16 * SCALE_WIDTH,
    marginTop: 8 * SCALE_HEIGHT,
    marginBottom: 12 * SCALE_HEIGHT,
  },
  songBox: {
    marginRight: 8 * SCALE_WIDTH,
    width: SONG_SIZE * SCALE_WIDTH,
  },
  explicit: {
    width: 95 * SCALE_WIDTH,
  },
  playlistsImg: {
    width: SONG_SIZE * SCALE_WIDTH,
    height: SONG_SIZE * SCALE_WIDTH,
    borderRadius: 4 * SCALE_HEIGHT,
  },
  margin: {
    marginBottom: 9 * SCALE_HEIGHT,
  },
  name: {
    fontSize: FS(14),
    lineHeight: 16 * SCALE_HEIGHT,
    color: '#000',
  },
  artist: {
    fontSize: FS(13),
    color: '#838383',
    marginTop: 4 * SCALE_HEIGHT,
  },
  play: {
    position: 'absolute',
    right: 5 * SCALE_WIDTH,
    bottom: 5 * SCALE_HEIGHT,
    width: 26 * SCALE_WIDTH,
    height: 26 * SCALE_HEIGHT,
  },
});
