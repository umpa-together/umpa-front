import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import StatusBarHeight from 'components/StatusBarHeight';
import { tmpWidth } from 'components/FontNormalize';
import StoryProvider from 'providers/story';
import Story from './Story';
import SelectedStory from './SelectedStory';
import Contents from './Contents';

const Feed = () => {
  const { state: userState } = useContext(UserContext);

  return (
    <StoryProvider>
      <View style={styles.container}>
        <Text style={styles.title}>피드</Text>
      </View>
      <View style={styles.flex}>
        <Story story={userState.otherStory} />
        <Contents />
      </View>
      <SelectedStory />
    </StoryProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: (40 + StatusBarHeight) * tmpWidth,
    paddingTop: StatusBarHeight * tmpWidth,
    backgroundColor: 'rgb(254,254,254)',
  },
  title: {
    fontSize: 24 * tmpWidth,
    fontWeight: '500',
    marginLeft: 18 * tmpWidth,
  },
  flex: {
    flex: 1,
  },
});

export default Feed;
