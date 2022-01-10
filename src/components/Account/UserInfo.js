import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import ProfileImage from 'widgets/ProfileImage';
import { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { useModal } from 'providers/modal';
import { Context as UserContext } from 'context/User';

export default function UserInfo({ info }) {
  const { songs, name, introduction, genre, profileImage, _id: id } = info;
  const { setRepresentModal } = useModal();
  const { getRepresentSongs } = useContext(UserContext);
  const onClickRepresentSong = () => {
    getRepresentSongs({ id });
    setRepresentModal(true);
  };

  return (
    <View style={[styles.container, style.alignCenter]}>
      <TouchableOpacity style={[styles.representBox, style.flexRow]} onPress={onClickRepresentSong}>
        <Text>{songs[0].attributes.name}</Text>
        <Text>{` ${songs[0].attributes.artistName}`}</Text>
      </TouchableOpacity>
      <ProfileImage img={profileImage} imgStyle={styles.profileImage} />
      <Text style={styles.name}>{name}</Text>
      {genre !== undefined && <Text style={styles.smallText}>{genre}</Text>}
      {introduction !== undefined && <Text style={styles.smallText}>{introduction}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    widht: 375 * SCALE_WIDTH,
    height: 313 * SCALE_HEIGHT,
    borderWidth: 1,
  },
  representBox: {
    borderWidth: 1 * SCALE_WIDTH,
    paddingHorizontal: 12 * SCALE_WIDTH,
    borderRadius: 43 * SCALE_HEIGHT,
  },
  profileImage: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_WIDTH,
    marginTop: 12 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
  },
  name: {
    marginTop: 12 * SCALE_HEIGHT,
  },
  smallText: {
    marginTop: 12 * SCALE_HEIGHT,
  },
});
