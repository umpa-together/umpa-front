import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as StoryContext } from 'context/Story';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import ProfileImage from 'widgets/ProfileImage';
import Icon from 'widgets/Icon';
import StoryModal from 'components/Modal/StoryModal';
import { useStory } from 'providers/story';

export default function Story() {
  const [storyModal, setStoryModal] = useState(false);
  const { state, getOtherStoryWithAll } = useContext(StoryContext);
  const { state: userState } = useContext(UserContext);
  const { onClickMyStory, onClickOtherStory } = useStory();
  const { user } = userState;

  const onClickStory = (song, idx) => {
    if (!idx) {
      if (song) {
        onClickMyStory(song);
        setStoryModal(true);
      }
    } else {
      onClickOtherStory(song, idx);
      setStoryModal(true);
    }
  };

  useEffect(() => {
    if (!storyModal) {
      getOtherStoryWithAll();
    }
  }, [storyModal]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.nameArea}>
          <TouchableOpacity
            style={styles.story}
            activeOpacity={0.9}
            onPress={() => onClickStory(state.myStory)}
          >
            <ImageBackground
              style={styles.story}
              source={
                state.storyViewer.includes(user._id)
                  ? require('public/icons/story-read.png')
                  : require('public/icons/story-unread.png')
              }
            >
              <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
            </ImageBackground>
            {!state.myStory && (
              <Icon source={require('public/icons/story-add.png')} style={styles.add} />
            )}
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.name}>
            {user.name}
          </Text>
        </View>
        {state.otherStoryLists &&
          state.otherStoryLists.map((item, index) => {
            const { view, _id: id } = item;
            const { profileImage, name } = item.postUserId;
            return (
              <View style={styles.nameArea} key={id}>
                <TouchableOpacity
                  style={styles.story}
                  activeOpacity={0.9}
                  onPress={() => onClickStory(item, index)}
                >
                  <ImageBackground
                    style={styles.story}
                    source={
                      view.includes(user._id)
                        ? require('public/icons/story-read.png')
                        : require('public/icons/story-unread.png')
                    }
                  >
                    <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
                  </ImageBackground>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.name}>
                  {name}
                </Text>
              </View>
            );
          })}
      </ScrollView>
      {storyModal && <StoryModal modal={storyModal} setModal={setStoryModal} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10 * SCALE_HEIGHT,
    borderBottomWidth: 1 * SCALE_HEIGHT,
    borderBottomColor: '#dcdcdc',
  },
  scrollContainer: {
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  story: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64 * SCALE_WIDTH,
    height: 64 * SCALE_WIDTH,
  },
  profileImg: {
    width: 56 * SCALE_WIDTH,
    height: 56 * SCALE_WIDTH,
    borderRadius: 56 * SCALE_HEIGHT,
  },
  plus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: FS(11),
    fontWeight: '400',
    marginTop: 4 * SCALE_HEIGHT,
    textAlign: 'center',
  },
  nameArea: {
    width: 64 * SCALE_WIDTH,
    marginRight: 12 * SCALE_WIDTH,
  },
  add: {
    width: 21 * SCALE_WIDTH,
    height: 21 * SCALE_WIDTH,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
