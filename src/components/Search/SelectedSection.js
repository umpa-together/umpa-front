/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as SearchContext } from 'context/Search';
import PostingCard from 'components/PostingCard';
import { useTrackPlayer } from 'providers/trackPlayer';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { Provider as AddedProvider } from 'context/Added';
import Icon from 'widgets/Icon';
import DailyView from 'components/DailyView';

const PlayAction = ({ song }) => {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  return (
    <TouchableOpacity onPress={() => onClickSong(song)}>
      <Icon
        source={
          song.id === isPlayingId
            ? require('public/icons/stop.png')
            : require('public/icons/play.png')
        }
        style={styles.icon}
      />
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
              action={<PlayAction song={playlist.songs[0]} />}
            />
          </View>
        );
      })}
    </View>
  );
};

export const Daily = ({ actions }) => {
  const { state } = useContext(SearchContext);

  return (
    <View style={styles.dailyContainer}>
      <AddedProvider>
        {state.selected.daily.map((daily) => {
          const { _id: id } = daily;
          return <DailyView info={daily} key={id} actions={actions} isSelected />;
        })}
      </AddedProvider>
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
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
});
