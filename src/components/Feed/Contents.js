import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Playlist from 'components/Feed/Playlist';
import Daily from 'components/Feed/Daily';
import Story from 'components/Feed/Story';
import { useRefresh } from 'providers/refresh';
import TrackPlayerProvider from 'providers/trackPlayer';
import LoadingIndicator from 'components/LoadingIndicator';

export default function Contents() {
  const { state, nextFeeds, getFeeds } = useContext(FeedContext);
  const { getMyStory, getOtherStoryWithAll } = useContext(StoryContext);
  const { refreshing, onRefresh, setRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (state.feed.length >= 20 && !state.notNextFeed) {
      setLoading(true);
      await nextFeeds({ page: state.currentFeedPage });
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  const fetchData = async () => {
    await Promise.all([getFeeds(), getMyStory(), getOtherStoryWithAll()]);
  };

  useEffect(() => {
    setRefresh(fetchData);
  }, []);

  return (
    <View style={styles.container}>
      <TrackPlayerProvider>
        {state.feed ? (
          <FlatList
            ListHeaderComponent={<Story />}
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
                  {type === 'playlist' ? (
                    <Playlist playlist={playlist} type={type} />
                  ) : (
                    <Daily daily={daily} type={type} />
                  )}
                </>
              );
            }}
          />
        ) : (
          <LoadingIndicator />
        )}
      </TrackPlayerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
