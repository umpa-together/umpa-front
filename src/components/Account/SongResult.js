import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import HarmfulModal from 'components/Modal/HarmfulModal';
import { useTrackPlayer } from 'providers/trackPlayer';
import { SongImage } from 'widgets/SongImage';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import { useSearch } from 'providers/search';

const SongResult = ({ songs, setSong }) => {
  const { state } = useContext(SearchContext);
  const [selectedId, setSelectedId] = useState('');
  const { loading, onEndReached } = useSearch();
  const { addtracksong, stoptracksong, isPlayingId } = useTrackPlayer();

  const addItem = ({ data }) => {
    if (songs.length < 7) {
      setSong([...songs, data]);
    }
  };

  const deleteItem = ({ data }) => {
    setSong(songs.filter((item) => item.id !== data.id));
  };

  const onClickSong = (item) => {
    let tok = false;
    if (selectedId === item.id) {
      setSelectedId('');
    } else {
      setSelectedId(item.id);
    }
    Object.values(songs).forEach((song) => {
      if (item.id === song.id) {
        tok = true;
      }
    });
    if (tok) {
      deleteItem({ data: item });
    } else {
      addItem({ data: item });
    }
  };

  const onClickCover = (item) => {
    if (isPlayingId === item.id) {
      stoptracksong();
    } else {
      addtracksong({ data: item });
    }
  };
  return (
    <FlatList
      data={state.songData}
      keyExtractor={(song) => song.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      ListFooterComponent={loading && <ActivityIndicator />}
      renderItem={({ item }) => {
        const imgUrl = item.attributes.artwork.url;
        return (
          <TouchableOpacity
            style={selectedId === item.id ? styles.selectedSong : styles.eachSong}
            onPress={() => onClickSong(item)}
          >
            <TouchableOpacity onPress={() => onClickCover(item)}>
              <SongImage url={imgUrl} size={56} border={56} />
              {isPlayingId !== item.id ? (
                <SvgUri
                  width="26.5"
                  height="26.5"
                  source={require('../../assets/icons/modalPlay.svg')}
                  style={styles.stopAndPlay}
                />
              ) : (
                <SvgUri
                  width="26.5"
                  height="26.5"
                  source={require('../../assets/icons/modalStop.svg')}
                  style={styles.stopAndPlay}
                />
              )}
              <HarmfulModal />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <View style={styles.flexRow}>
                {item.attributes.contentRating === 'explicit' && (
                  <SvgUri
                    width="17"
                    height="17"
                    source={require('assets/icons/19.svg')}
                    style={styles.explicit}
                  />
                )}
                <Text style={styles.song} numberOfLines={1}>
                  {item.attributes.name}
                </Text>
              </View>
              <Text style={styles.artist} numberOfLines={1}>
                {item.attributes.artistName}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  selectedSong: {
    width: 375 * tmpWidth,
    height: 76 * tmpWidth,
    flexDirection: 'row',
    paddingTop: 8 * tmpWidth,
    backgroundColor: 'rgb(238,244,255)',
    paddingLeft: 25 * tmpWidth,
  },
  eachSong: {
    width: 375 * tmpWidth,
    height: 76 * tmpWidth,
    flexDirection: 'row',
    paddingTop: 8 * tmpWidth,
    paddingLeft: 25 * tmpWidth,
  },
  stopAndPlay: {
    position: 'absolute',
    left: 15 * tmpWidth,
    top: 15 * tmpWidth,
  },
  infoContainer: {
    marginTop: 10 * tmpWidth,
    marginLeft: 24 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200 * tmpWidth,
  },
  explicit: {
    marginRight: 5 * tmpWidth,
  },
  song: {
    fontSize: 16 * tmpWidth,
  },
  artist: {
    fontSize: 14 * tmpWidth,
    color: 'rgb(148,153,163)',
    marginTop: 8 * tmpWidth,
  },
});

export default SongResult;
