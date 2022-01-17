import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import style from 'constants/styles';
import TabTitle from 'components/TabTitle';
import { Context as FeedContext } from 'context/Feed';
import { Context as StoryContext } from 'context/Story';
import Contents from 'components/Feed/Contents';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import RefreshProvider from 'providers/refresh';
import Icon from 'widgets/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedActions = () => {
  const { getFeeds, getFeedWithFollowing } = useContext(FeedContext);
  const [type, setType] = useState(true);

  const getFeedType = async () => {
    const feedType = await AsyncStorage.getItem('feed');
    if (feedType) {
      setType(false);
    } else {
      setType(true);
    }
  };

  const onClickActions = async () => {
    const feedType = await AsyncStorage.getItem('feed');
    if (feedType) {
      await AsyncStorage.removeItem('feed');
      getFeeds();
    } else {
      await AsyncStorage.setItem('feed', 'following');
      getFeedWithFollowing();
    }
    setType(!type);
  };

  useEffect(() => {
    getFeedType();
  }, []);

  return (
    <TouchableOpacity style={styles.actions} onPress={onClickActions}>
      <Text>{type ? '피드' : '팔로잉'}</Text>
    </TouchableOpacity>
  );
};

export default function Feed() {
  const { getFeeds, getFeedWithFollowing } = useContext(FeedContext);
  const { getMyStory, getOtherStoryWithAll } = useContext(StoryContext);

  const dataFetch = async () => {
    const feedType = await AsyncStorage.getItem('feed');
    if (feedType) {
      await Promise.all([getFeedWithFollowing(), getMyStory(), getOtherStoryWithAll()]);
    } else {
      await Promise.all([getFeeds(), getMyStory(), getOtherStoryWithAll()]);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <View style={style.background}>
      <TabTitle title="피드" titleStyle={styles.title} actions={[<FeedActions />]} />
      <RefreshProvider>
        <Contents />
      </RefreshProvider>
      <TouchableOpacity activeOpacity={0.9}>
        <Icon source={require('public/icons/create-floating.png')} style={styles.floating} />
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
  floating: {
    width: 52 * SCALE_WIDTH,
    height: 52 * SCALE_WIDTH,
    position: 'absolute',
    bottom: 25 * SCALE_HEIGHT,
    right: 23 * SCALE_WIDTH,
  },
  actions: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    borderWidth: 1,
  },
});
