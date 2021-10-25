import React, { useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, ImageBackground, View } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'components/ProfileImage';
import SearchProvider from 'providers/search';
import NewStory from './NewStory';
import Story from './Story';

const Profile = ({ user, isMyAccount, url, story }) => {
  const { storyCalendar, storyView } = useContext(UserContext);
  const [newStory, setNewStory] = useState(false);
  const [storyModal, setStoryModal] = useState(false);

  const onClickStory = () => {
    storyCalendar({ id: user._id });
    setStoryModal(true);
    storyView({ id: story.id });
  };

  const onClickNewStory = () => {
    if (isMyAccount) setNewStory(true);
  };

  return (
    <>
      {url === '' ? (
        <>
          {isMyAccount ? (
            <TouchableOpacity style={styles.story} onPress={onClickNewStory}>
              <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
              <SvgUri
                width={40}
                height={40}
                source={require('assets/icons/songPlus.svg')}
                style={styles.plus}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.story}>
              <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
            </View>
          )}
        </>
      ) : (
        <TouchableOpacity onPress={onClickStory}>
          <ImageBackground style={styles.story} source={require('assets/icons/profileStory.png')}>
            <ProfileImage img={user.profileImage} imgStyle={styles.profileImg} />
          </ImageBackground>
        </TouchableOpacity>
      )}
      <SearchProvider>
        <NewStory newStory={newStory} setNewStory={setNewStory} />
      </SearchProvider>
      <Story
        story={story}
        storyModal={storyModal}
        setStoryModal={setStoryModal}
        isMyAccount={isMyAccount}
      />
    </>
  );
};

const styles = StyleSheet.create({
  story: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72 * tmpWidth,
    height: 72 * tmpWidth,
  },
  profileImg: {
    width: 63 * tmpWidth,
    height: 63 * tmpWidth,
    borderRadius: 63 * tmpWidth,
  },
  plus: {
    position: 'absolute',
    top: 0,
    right: -10 * tmpWidth,
  },
});

export default Profile;
