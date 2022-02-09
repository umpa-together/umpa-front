import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Playlist from 'components/Feed/Playlist';
import Daily from 'components/Feed/Daily';
import Story from 'components/Feed/Story';
import { useRefresh } from 'providers/refresh';
import LoadingIndicator from 'components/LoadingIndicator';
import StoryProvider from 'providers/story';
import HarmfulModal from 'components/Modal/HarmfulModal';

export default function Contents({ setIsScroll }) {
  const {
    state: { type, feed, notNextFeed, currentFeedPage },
    nextFeeds,
    getFeeds,
    getFeedWithFollowing,
    getNextFeedWithFollowing,
  } = useContext(FeedContext);
  const { getMyStory, getOtherStoryWithAll } = useContext(StoryContext);
  const { refreshing, onRefresh, setRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (feed.length >= 20 && !notNextFeed) {
      setLoading(true);
      if (type) {
        await nextFeeds({ page: currentFeedPage });
      } else {
        await getNextFeedWithFollowing({ page: currentFeedPage });
      }
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const fetchData = async () => {
    if (type) {
      await Promise.all([getFeeds(), getMyStory(), getOtherStoryWithAll()]);
    } else {
      await Promise.all([getFeedWithFollowing(), getMyStory(), getOtherStoryWithAll()]);
    }
  };

  const onMomentumScrollBegin = useCallback(() => setIsScroll(true), []);
  const onMomentumScrollEnd = useCallback(() => setIsScroll(false), []);
  const ListHeaderComponent = useCallback(
    () => (
      <StoryProvider>
        <Story />
      </StoryProvider>
    ),
    [],
  );
  const keyExtractor = useCallback((_) => _._id, []);
  const ListFooterComponent = useCallback(() => loading && <ActivityIndicator />, [loading]);
  const renderItem = useCallback(({ item }) => {
    // eslint-disable-next-line no-shadow
    const { playlist, type, daily } = item;
    return <>{type === 'playlist' ? <Playlist playlist={playlist} /> : <Daily daily={daily} />}</>;
  }, []);

  useEffect(() => {
    setRefresh(fetchData);
  }, []);

  useEffect(() => {
    if (type !== null) setRefresh(fetchData);
  }, [type]);

  return (
    <View style={styles.container}>
      {feed ? (
        <FlatList
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          ListHeaderComponent={ListHeaderComponent}
          data={feed}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListFooterComponent={ListFooterComponent}
          renderItem={renderItem}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      ) : (
        <LoadingIndicator />
      )}
      <HarmfulModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
