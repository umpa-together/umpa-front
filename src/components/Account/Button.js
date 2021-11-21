import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { tmpWidth } from 'components/FontNormalize';
import { navigate } from 'lib/utils/navigation';
import SvgUri from 'react-native-svg-uri';

const ProfileButton = ({ user, isMyAccount, setFollowerNum }) => {
  const { state: userState, follow, unfollow, getMyInfo, getOtheruser } = useContext(UserContext);
  const [isFollow, setIsFollow] = useState(false);

  const followCheck = ({ id }) => {
    let check = false;
    if (user !== undefined) {
      Object.values(user.follower).forEach((follower) => {
        if (follower._id === id) check = true;
      });
    }
    return check;
  };

  const onClickEdit = () => {
    navigate('ProfileEdit');
  };

  const onClickFollow = async () => {
    if (isFollow) {
      setIsFollow(false);
      await unfollow({ id: user._id });
      setFollowerNum((prev) => prev - 1);
    } else {
      setIsFollow(true);
      await follow({ id: user._id });
      setFollowerNum((prev) => prev + 1);
    }
    getOtheruser({ id: user._id });
    getMyInfo();
  };

  useEffect(() => {
    setIsFollow(followCheck({ id: userState.myInfo._id }));
  }, []);

  return (
    <>
      {isMyAccount ? (
        <TouchableOpacity style={[styles.editBox, styles.box]} onPress={onClickEdit}>
          <Text style={styles.edit}>프로필 편집</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={[styles.followBox, styles.box]} onPress={onClickFollow}>
            {isFollow ? (
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
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 100 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16 * tmpWidth,
  },
  editBox: {
    width: 86 * tmpWidth,
    height: 26 * tmpWidth,
    borderColor: '#b8d2ee',
    borderWidth: 0.7 * tmpWidth,
  },
  edit: {
    fontSize: 11 * tmpWidth,
    fontWeight: '400',
    color: '#aaaaaa',
  },
  followBox: {
    width: 80 * tmpWidth,
    height: 26 * tmpWidth,
    borderColor: '#8bc0ff',
    borderWidth: 1 * tmpWidth,
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

export default ProfileButton;
