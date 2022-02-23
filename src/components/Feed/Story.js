import React, { useContext, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as StoryContext } from 'context/Story';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import StoryModal from 'components/Modal/StoryModal';
import { useStory } from 'providers/story';
import SearchSongModal from 'components/Modal/SearchSongModal';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import StoryPerson from './StoryPerson';

export default function Story() {
  const [storyModal, setStoryModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const {
    state: { myStory, storyViewer, otherStoryLists },
    postStory,
    getMyStory,
  } = useContext(StoryContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const { onClickMyStory, onClickOtherStory } = useStory();
  const { searchInfoRef } = useSongActions();

  const onClickStory = () => {
    if (myStory) {
      onClickMyStory(myStory);
      setStoryModal(true);
    } else {
      setSearchModal(true);
    }
  };

  const postStoryFunction = async (song) => {
    setSearchModal(false);
    await postStory({ song });
    getMyStory();
  };

  useFocusEffect(
    useCallback(() => {
      searchInfoRef.current = { title: '오늘의 곡', key: 'story', func: postStoryFunction };
    }, []),
  );

  const keyExtractor = useCallback((_) => _._id, []);
  const renderItem = useCallback(({ item, index }) => {
    const {
      view,
      postUserId: { profileImage, name, _id },
    } = item;
    const person = {
      _id,
      name,
      profileImage,
    };
    // eslint-disable-next-line no-shadow
    const onClickStory = () => {
      onClickOtherStory(item, index);
      setStoryModal(true);
    };
    return <StoryPerson person={person} viewer={view} onClickStory={onClickStory} />;
  }, []);
  const ListHeaderComponent = useCallback(
    () => <StoryPerson person={user} viewer={storyViewer} onClickStory={onClickStory} />,
    [myStory],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={otherStoryLists}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        ListHeaderComponent={ListHeaderComponent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
      <StoryModal modal={storyModal} setModal={setStoryModal} />
      <SearchSongModal modal={searchModal} setModal={setSearchModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32 * SCALE_HEIGHT,
    paddingBottom: 10 * SCALE_HEIGHT,
    borderBottomWidth: 1 * SCALE_HEIGHT,
    borderBottomColor: '#dcdcdc',
  },
  scrollContainer: {
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
});
