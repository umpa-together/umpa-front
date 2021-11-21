import React, { useContext } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { navigate, push } from 'lib/utils/navigation';
import { tmpWidth } from 'components/FontNormalize';
import ProfileImage from 'widgets/ProfileImage';
import SvgUri from 'react-native-svg-uri';

const FollowLists = ({ result }) => {
  const { state, getOtheruser, follow, unfollow, getMyInfo } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);

  const followCheck = ({ id }) => {
    let check = false;
    Object.values(state.myInfo.following).forEach((following) => {
      if (following._id === id) check = true;
    });
    return check;
  };

  const onClickProfile = async (id) => {
    if (id === state.myInfo._id) {
      navigate('Account');
    } else {
      await Promise.all([getOtheruser({ id }), getSongs({ id })]);
      push('OtherAccount', { otherUserId: id });
    }
  };

  const onClickFollow = async (id) => {
    if (followCheck({ id })) {
      await unfollow({ id });
    } else {
      await follow({ id });
    }
    getMyInfo();
  };

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={result}
      keyExtractor={(dj) => dj._id}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      renderItem={({ item }) => {
        const { _id: id, profileImage, name, songs } = item;
        return (
          <TouchableOpacity style={styles.userBox} onPress={() => onClickProfile(id)}>
            <ProfileImage img={profileImage} imgStyle={styles.profile} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.songContainer}>
                <View style={styles.representSongBox}>
                  <Text style={styles.title}>대표곡</Text>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.song} numberOfLines={1}>
                    {songs[0].attributes.name}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.followBox} onPress={() => onClickFollow(id)}>
              {followCheck({ id }) ? (
                <View style={styles.flexRow}>
                  <Text style={styles.follow}>팔로우</Text>
                  <SvgUri
                    width="10"
                    height="10"
                    source={require('assets/icons/followCheck.svg')}
                    style={styles.icon}
                  />
                </View>
              ) : (
                <Text style={styles.follow}>팔로우</Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8 * tmpWidth,
  },
  userBox: {
    height: 70 * tmpWidth,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    justifyContent: 'space-between',
  },
  profile: {
    width: 56 * tmpWidth,
    height: 56 * tmpWidth,
    borderRadius: 56 * tmpWidth,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 24 * tmpWidth,
  },
  name: {
    fontSize: 16 * tmpWidth,
    fontWeight: '400',
  },
  songContainer: {
    flexDirection: 'row',
    marginTop: 8 * tmpWidth,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  representSongBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 41 * tmpWidth,
    height: 16 * tmpWidth,
    borderWidth: 0.8 * tmpWidth,
    borderColor: '#aaaaaa',
    borderRadius: 30 * tmpWidth,
  },
  title: {
    fontSize: 11 * tmpWidth,
    color: '#838383',
    fontWeight: '400',
  },
  song: {
    marginLeft: 6 * tmpWidth,
    fontSize: 14 * tmpWidth,
    color: '#838383',
    fontWeight: '400',
  },
  followBox: {
    width: 80 * tmpWidth,
    height: 26 * tmpWidth,
    borderRadius: 30 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8 * tmpWidth,
    borderColor: '#8bc0ff',
  },
  followingBox: {
    width: 80 * tmpWidth,
    height: 26 * tmpWidth,
    borderRadius: 30 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8 * tmpWidth,
    borderColor: '#8bc0ff',
  },
  follow: {
    fontSize: 12 * tmpWidth,
    color: '#8bc0ff',
  },
  icon: {
    width: 15 * tmpWidth,
    height: 15 * tmpWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FollowLists;
