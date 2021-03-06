/* eslint-disable no-nested-ternary */
import React, { useCallback, useContext, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Context as SearchContext } from 'context/Search';
import SearchSongView from 'components/SongView/SearchSongView';
import { useTrackPlayer } from 'providers/trackPlayer';
import { navigate } from 'lib/utils/navigation';
import PostingCard from 'components/PostingCard';
import UserView from 'components/UserView';
import HashtagView from 'components/Search/HashtagView';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import DailyView from 'components/DailyView';
import Icon from 'widgets/Icon';
import HarmfulModal from 'components/Modal/HarmfulModal';
import EmptyData from 'components/EmptyData';

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

  const keyExtractor = useCallback((_) => _.song.id, []);
  const ListFooterComponent = useCallback(() => loading && <ActivityIndicator />, [loading]);
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => onClickSongView(item.song)}>
        <SearchSongView info={item} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      data={state.result.song}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.songContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      ListFooterComponent={ListFooterComponent}
      renderItem={renderItem}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
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
  const textList = ['?????? ????????? ????????????.', '?????? ???????????? ??????????????????.'];

  return data && data.length > 0 ? (
    <>
      {title === '???' ? (
        <SongLists />
      ) : (
        <ScrollView>
          {data.map((item) => {
            const { _id: id } = item;
            return (
              <View key={id}>
                {title === '??????????????????' ? (
                  <PostingCard
                    item={item}
                    opt="playlist"
                    round
                    action={<PlayAction song={item.songs[0]} />}
                  />
                ) : title === '?????????' ? (
                  <DailyView info={item} actions />
                ) : title === '??????' ? (
                  <UserView user={item} />
                ) : (
                  <HashtagView info={item} />
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
      <HarmfulModal />
    </>
  ) : (
    <>
      <EmptyData
        customContainer={[styles.emptyContainer, title === '??????' && styles.emptyAccountContainer]}
        textList={textList}
        icon
      />
    </>
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
  emptyContainer: {
    paddingTop: 220 * SCALE_HEIGHT,
  },
  emptyAccountContainer: {
    marginBottom: 50 * SCALE_HEIGHT,
  },
});
