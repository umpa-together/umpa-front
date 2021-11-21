import React, { useContext, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import ProfileImage from 'widgets/ProfileImage';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { useStory } from 'providers/story';
import NewStory from 'components/Account/NewStory';
import SearchProvider from 'providers/search';

const Story = ({ story }) => {
  const { state: userState } = useContext(UserContext);
  const [newStory, setNewStory] = useState(false);
  const { onClickStory, onClickMyStory } = useStory();

  const onClickNewStory = () => {
    setNewStory(true);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 18 * tmpWidth }}
        >
          <View style={styles.nameArea}>
            {userState.myStory ? (
              <TouchableOpacity onPress={onClickMyStory} style={styles.story}>
                {userState.myStory.view.includes(userState.myInfo._id) ? (
                  <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg} />
                ) : (
                  <ImageBackground
                    style={styles.story}
                    source={require('assets/icons/profileStory.png')}
                  >
                    <ProfileImage
                      img={userState.myInfo.profileImage}
                      imgStyle={styles.profileImg}
                    />
                  </ImageBackground>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.story} onPress={onClickNewStory}>
                <ProfileImage img={userState.myInfo.profileImage} imgStyle={styles.profileImg} />
                <SvgUri
                  width={21}
                  height={21}
                  source={require('assets/icons/feedStoryPlus.svg')}
                  style={styles.plus}
                />
              </TouchableOpacity>
            )}
            <Text numberOfLines={1} style={styles.name}>
              {userState.myInfo.name}
            </Text>
          </View>
          {story &&
            story.map((item, index) => {
              const { song, profileImage, name } = item;
              return (
                <View style={styles.nameArea} key={name}>
                  <TouchableOpacity
                    style={styles.story}
                    onPress={() => onClickStory({ item, index })}
                  >
                    {song.view.includes(userState.myInfo._id) ? (
                      <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
                    ) : (
                      <ImageBackground
                        style={styles.story}
                        source={require('assets/icons/profileStory.png')}
                      >
                        <ProfileImage img={profileImage} imgStyle={styles.profileImg} />
                      </ImageBackground>
                    )}
                  </TouchableOpacity>
                  <Text numberOfLines={1} style={styles.name}>
                    {name}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      </View>
      <SearchProvider>
        <NewStory newStory={newStory} setNewStory={setNewStory} />
      </SearchProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10 * tmpWidth,
    borderBottomWidth: 1 * tmpWidth,
    borderBottomColor: '#dcdcdc',
  },
  story: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60 * tmpWidth,
    height: 60 * tmpWidth,
  },
  profileImg: {
    width: 56 * tmpWidth,
    height: 56 * tmpWidth,
    borderRadius: 56 * tmpWidth,
  },
  plus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: 11 * tmpWidth,
    fontWeight: '400',
    marginTop: 8 * tmpWidth,
    textAlign: 'center',
  },
  nameArea: {
    width: 60 * tmpWidth,
    marginRight: 16 * tmpWidth,
  },
});

export default Story;
