import React, { useContext } from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/User';
import { Context as StoryContext } from 'context/Story';
import ProfileImage from 'widgets/ProfileImage';
import Icon from 'widgets/Icon';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import Text from 'components/Text';

export default function StoryPerson({ person, onClickStory, viewer }) {
  const {
    state: { myStory },
  } = useContext(StoryContext);
  const {
    state: { user },
  } = useContext(UserContext);
  const { name, profileImage, _id: personId } = person;
  const isMyStory = personId === user._id;

  return (
    <View style={styles.nameArea}>
      <TouchableOpacity
        style={styles.story}
        activeOpacity={0.9}
        onPress={() => onClickStory(myStory)}
      >
        <ImageBackground
          style={styles.story}
          source={
            viewer.includes(user._id)
              ? require('public/icons/story-read.png')
              : require('public/icons/story-unread.png')
          }
        >
          <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
        </ImageBackground>
        {isMyStory && !myStory && (
          <Icon source={require('public/icons/story-add.png')} style={styles.add} />
        )}
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>
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
    color: '#000',
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
