/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import style from 'constants/styles';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { push } from 'lib/utils/navigation';

export default function UserView({ user }) {
  const { name, genre, profileImage, _id } = user;
  const { state, follow, unfollow, getOtherInformation } = useContext(UserContext);
  const [isFollow, setIsFollow] = useState(state.user.following.includes(user._id));
  const onClickAccount = async () => {
    await getOtherInformation({ id: _id });
    push('OtherAccount', { id: _id });
  };

  const onClickFollow = () => {
    if (isFollow) {
      unfollow({ id: _id });
    } else {
      follow({ id: _id });
    }
    setIsFollow(!isFollow);
  };
  return (
    <TouchableOpacity onPress={onClickAccount} style={style.flexRow}>
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <View>
        <Text>{name}</Text>
        {genre && <Text>{genre}</Text>}
      </View>
      {!isFollow ? (
        <TouchableOpacity onPress={onClickFollow}>
          <Text>팔로잉</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onClickFollow}>
          <Text>팔로잉 취소</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 60 * SCALE_WIDTH,
    height: 60 * SCALE_WIDTH,
    borderRadius: 60 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
  },
});
