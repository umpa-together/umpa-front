import React, { useContext, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import { Context as SearchPlaylistContext } from 'context/SearchPlaylistContext';
import { useSearch } from 'providers/search';
import { useFocusEffect } from '@react-navigation/native';
import { SongImage } from 'widgets/SongImage';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import LoadingIndicator from '../LoadingIndicator';

const SongResult = () => {
  const { state: searchState } = useContext(SearchContext);
  const { initPlaylist, SearchAll } = useContext(SearchPlaylistContext);
  const { loading, onEndReached, setIsResultClick } = useSearch();

  const onClickSong = (item) => {
    setIsResultClick(true);
    SearchAll({ id: item.id });
  };

  useFocusEffect(
    useCallback(() => {
      initPlaylist();
    }, []),
  );

  return (
    <>
      {searchState.songData.length === 0 ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          style={styles.container}
          data={searchState.songData}
          keyExtractor={(song) => song.id}
          maxToRenderPerBatch={1}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item }) => {
            const { name, artistName, contentRating } = item.attributes;
            const { url } = item.attributes.artwork;
            return (
              <TouchableOpacity style={styles.resultBox} onPress={() => onClickSong(item)}>
                <SongImage url={url} size={46} border={46} />
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
  container: {
    paddingTop: 14 * tmpWidth,
  },
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
});

export default SongResult;
