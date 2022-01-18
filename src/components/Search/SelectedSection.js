/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import PostingCard from 'components/PostingCard';
import TrackPlayerProvider, { useTrackPlayer } from 'providers/trackPlayer';
import { SCALE_HEIGHT } from 'lib/utils/normalize';
import { Provider as AddedProvider } from 'context/Added';
import DailyView from './DailyView';

const PlayAction = ({ song }) => {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  return (
    <TouchableOpacity onPress={() => onClickSong(song)}>
      <Text>{isPlayingId !== song.id ? '재생' : '정지'}</Text>
    </TouchableOpacity>
  );
};

export const Playlist = () => {
  const { state } = useContext(SearchContext);
  return (
    <View style={styles.playlistContainer}>
      {state.selected.playlist.map((playlist) => {
        const { _id: id } = playlist;
        return (
          <View key={id}>
            <PostingCard
              item={playlist}
              opt="playlist"
              round
              key={id}
              action={
                <TrackPlayerProvider>
                  <PlayAction song={playlist.songs[0]} />
                </TrackPlayerProvider>
              }
            />
          </View>
        );
      })}
    </View>
  );
};

export const Daily = () => {
  const { state } = useContext(SearchContext);

  return (
    <View style={styles.dailyContainer}>
      {state.selected.daily.map((daily) => {
        const { _id: id } = daily;
        return (
          <AddedProvider>
            <TrackPlayerProvider>
              <DailyView info={daily} key={id} actions />
            </TrackPlayerProvider>
          </AddedProvider>
        );
      })}
    </View>
  );
};

export const DJ = () => {
  const { state } = useContext(SearchContext);

  return (
    <>
      {state.selected.dj.map((dj) => {
        const { _id: id } = dj;
        return (
          <View key={id}>
            <Text>dj</Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  playlistContainer: {
    marginTop: 16 * SCALE_HEIGHT,
  },
  dailyContainer: {
    marginTop: 18 * SCALE_HEIGHT,
  },
});
