/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Provider as AddedProvider } from 'context/Added';
import { Context as SearchContext } from 'context/Search';
import SearchSongView from 'components/SongView/SearchSongView';
import TrackPlayerProvider, { useTrackPlayer } from 'providers/trackPlayer';
import { navigate } from 'lib/utils/navigation';
import PostingCard from 'components/PostingCard';
import UserView from 'components/UserView';
import HashtagView from 'components/Search/HashtagView';
import { SCALE_HEIGHT } from 'lib/utils/normalize';

const SongLists = () => {
  const [loading, setLoading] = useState(false);
  const { state, getNextSongResult } = useContext(SearchContext);
  const getData = async () => {
    if (state.result.song.length >= 20 && !state.notNextSong) {
      setLoading(true);
      await getNextSongResult({ nextUrl: state.result.next });
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const onClickSongView = (song) => {
    navigate('SelectedSong', { song });
  };

  return (
    <TrackPlayerProvider>
      <AddedProvider>
        <FlatList
          data={state.result.song}
          keyExtractor={(item) => item.song.id}
          contentContainerStyle={styles.songContainer}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => onClickSongView(item.song)}>
                <SearchSongView info={item} />
              </TouchableOpacity>
            );
          }}
        />
      </AddedProvider>
    </TrackPlayerProvider>
  );
};

const DailyLists = () => {
  return null;
};

const PlayAction = ({ song }) => {
  const { onClickSong, isPlayingId } = useTrackPlayer();
  return (
    <TouchableOpacity onPress={() => onClickSong(song)}>
      <Text>{isPlayingId !== song.id ? '재생' : '정지'}</Text>
    </TouchableOpacity>
  );
};

export default function MoreLists({ title, data }) {
  return (
    data && (
      <>
        {title === '곡' ? (
          <SongLists />
        ) : (
          <ScrollView>
            {data.map((item) => {
              const { _id: id } = item;
              return (
                <View key={id}>
                  {title === '플레이리스트' ? (
                    <PostingCard
                      item={item}
                      opt="playlist"
                      round
                      action={<PlayAction song={item.songs[0]} />}
                    />
                  ) : title === '데일리' ? (
                    <DailyLists />
                  ) : title === '계정' ? (
                    <UserView user={item} />
                  ) : (
                    <HashtagView info={item} />
                  )}
                </View>
              );
            })}
          </ScrollView>
        )}
      </>
    )
  );
}

const styles = StyleSheet.create({
  songContainer: {
    paddingTop: 20 * SCALE_HEIGHT,
  },
});
