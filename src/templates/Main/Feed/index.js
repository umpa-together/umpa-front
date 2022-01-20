import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Contents from 'components/Feed/Contents';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import RefreshProvider from 'providers/refresh';
import FloatingButton from 'components/Feed/FloatingButton';

const FeedActions = () => {
  const { state, setFeedType } = useContext(FeedContext);

  const onClickActions = async () => {
    setFeedType();
  };

  return (
    <TouchableOpacity style={styles.actions} onPress={onClickActions}>
      <Text>{state.type ? '피드' : '팔로잉'}</Text>
    </TouchableOpacity>
  );
};

export default function Feed() {
  const { state, getFeeds, getFeedWithFollowing, getFeedType } = useContext(FeedContext);
  const { getMyStory, getOtherStoryWithAll } = useContext(StoryContext);
  const [isScroll, setIsScroll] = useState(false);
  const dataFetch = async () => {
    if (state.type) {
      await Promise.all([getFeeds(), getMyStory(), getOtherStoryWithAll()]);
    } else {
      await Promise.all([getFeedWithFollowing(), getMyStory(), getOtherStoryWithAll()]);
    }
  };
  useEffect(() => {
    getFeedType();
  }, []);

  useEffect(() => {
    if (state.type !== null) dataFetch();
  }, [state.type]);

  return (
    <View style={style.background}>
      <TabTitle title="피드" titleStyle={styles.title} actions={[<FeedActions />]} />
      <RefreshProvider>
        <Contents setIsScroll={setIsScroll} />
      </RefreshProvider>
      <TouchableOpacity activeOpacity={0.9}>
        <FloatingButton show={isScroll} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FS(24),
    fontWeight: '500',
    marginLeft: 16 * SCALE_WIDTH,
    marginTop: 6 * SCALE_HEIGHT,
    marginBottom: 15 * SCALE_HEIGHT,
  },
  actions: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    borderWidth: 1,
  },
});
