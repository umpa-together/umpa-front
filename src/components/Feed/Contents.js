import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Playlist from 'components/Feed/Playlist';
import Daily from 'components/Feed/Daily';
import Story from 'components/Feed/Story';
import { useRefresh } from 'providers/refresh';
import LoadingIndicator from 'components/LoadingIndicator';
import StoryProvider from 'providers/story';

export default function Contents({ setIsScroll }) {
  const { state, nextFeeds, getFeeds, getFeedWithFollowing, getNextFeedWithFollowing } =
    useContext(FeedContext);
  const { getMyStory, getOtherStoryWithAll } = useContext(StoryContext);
  const { refreshing, onRefresh, setRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (state.feed.length >= 20 && !state.notNextFeed) {
      setLoading(true);
      if (state.type) {
        await nextFeeds({ page: state.currentFeedPage });
      } else {
        await getNextFeedWithFollowing({ page: state.currentFeedPage });
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
    if (state.type) {
      await Promise.all([getFeeds(), getMyStory(), getOtherStoryWithAll()]);
    } else {
      await Promise.all([getFeedWithFollowing(), getMyStory(), getOtherStoryWithAll()]);
    }
  };

  useEffect(() => {
    setRefresh(fetchData);
  }, []);

  useEffect(() => {
    if (state.type !== null) setRefresh(fetchData);
  }, [state.type]);

  return (
    <View style={styles.container}>
      {state.feed ? (
        <FlatList
          onMomentumScrollBegin={() => {
            setIsScroll(true);
          }}
          onMomentumScrollEnd={() => {
            setIsScroll(false);
          }}
          ListHeaderComponent={
            <StoryProvider>
              <Story />
            </StoryProvider>
          }
          data={state.feed}
          keyExtractor={(_) => _._id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListFooterComponent={loading && <ActivityIndicator />}
          renderItem={({ item }) => {
            const { playlist, type, daily } = item;
            return (
              <>
                {type === 'playlist' ? <Playlist playlist={playlist} /> : <Daily daily={daily} />}
              </>
            );
          }}
        />
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
