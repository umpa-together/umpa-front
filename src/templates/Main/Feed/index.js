import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Contents from 'components/Feed/Contents';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import RefreshProvider from 'providers/refresh';

export default function Feed() {
  const { getFeeds } = useContext(FeedContext);
  const { getMyStory, getOtherStoryWithAll } = useContext(StoryContext);

  useEffect(() => {
    getFeeds();
    getMyStory();
    getOtherStoryWithAll();
  }, []);

  return (
    <View style={style.background}>
      <TabTitle title="피드" titleStyle={styles.title} />
      <RefreshProvider>
        <Contents />
      </RefreshProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(24),
    fontWeight: '500',
    marginLeft: 18 * SCALE_WIDTH,
    marginBottom: 6 * SCALE_HEIGHT,
  },
});
