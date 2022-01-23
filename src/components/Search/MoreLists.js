/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Provider as AddedProvider } from 'context/Added';
import { Context as SearchContext } from 'context/Search';
import SearchSongView from 'components/SongView/SearchSongView';
import { useTrackPlayer } from 'providers/trackPlayer';
import { navigate } from 'lib/utils/navigation';
import PostingCard from 'components/PostingCard';
import UserView from 'components/UserView';
import HashtagView from 'components/Search/HashtagView';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import DailyView from 'components/Search/DailyView';
import Icon from 'widgets/Icon';

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
  );
};

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

export default function MoreLists({ title, data }) {
  return (
    data && (
      <>
        {title === '곡' ? (
          <SongLists />
        ) : (
          <ScrollView>
            <AddedProvider>
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
                      <DailyView info={item} actions />
                    ) : title === '계정' ? (
                      <UserView user={item} />
                    ) : (
                      <HashtagView info={item} />
                    )}
                  </View>
                );
              })}
            </AddedProvider>
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
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
  },
});
