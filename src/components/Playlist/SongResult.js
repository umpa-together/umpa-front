import React, { useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { useSearch } from 'providers/search';
import { SongImage } from 'components/SongImage';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import { useTrackPlayer } from 'providers/trackPlayer';
import { usePlaylist } from 'providers/playlist';
import LoadingIndicator from '../LoadingIndicator';

const SongResult = () => {
  const { state: searchState } = useContext(SearchContext);
  const { loading, onEndReached } = useSearch();
  const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer();
  const { onClickAddSong } = usePlaylist();

  const onClickCover = (song) => {
    if (isPlayingId === song.id) {
      stoptracksong();
    } else {
      addtracksong({ data: song });
    }
  };

  return (
    <>
      {searchState.songData.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={searchState.songData}
          keyExtractor={(song) => song.id}
          maxToRenderPerBatch={1}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item }) => {
            const { name, artistName, contentRating } = item.attributes;
            const { url } = item.attributes.artwork;
            const { id } = item;
            return (
              <TouchableOpacity style={styles.resultBox} onPress={() => onClickAddSong(item)}>
                <TouchableOpacity onPress={() => onClickCover(item)}>
                  <SongImage url={url} size={46} border={46} />
                  <SvgUri
                    width="24"
                    height="24"
                    source={
                      isPlayingId !== id
                        ? require('assets/icons/modalPlay.svg')
                        : require('assets/icons/modalStop.svg')
                    }
                    style={styles.playIcon}
                  />
                </TouchableOpacity>
                <View style={styles.songBox}>
                  <View style={styles.flexRow}>
                    {contentRating === 'explicit' && (
                      <SvgUri
                        width="17"
                        height="17"
                        source={require('assets/icons/19.svg')}
                        style={styles.explicit}
                      />
                    )}
                    <Text numberOfLines={1} style={styles.name}>
                      {name}
                    </Text>
                  </View>
                  <Text numberOfLines={1} style={styles.artist}>
                    {artistName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  resultBox: {
    height: 54 * tmpWidth,
    marginLeft: 18 * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  songBox: {
    marginLeft: 11 * tmpWidth,
    width: 270 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  explicit: {
    marginRight: 5 * tmpWidth,
  },
  name: {
    fontSize: 16 * tmpWidth,
    fontWeight: '400',
  },
  artist: {
    color: '#505050',
    fontSize: 12 * tmpWidth,
    fontWeight: '300',
    marginTop: 3 * tmpWidth,
  },
  playIcon: {
    position: 'absolute',
    right: 11 * tmpWidth,
    bottom: 11 * tmpWidth,
  },
});

export default SongResult;
