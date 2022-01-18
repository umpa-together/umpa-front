import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { COLOR_3 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { useModal } from 'providers/modal';
import { Context as UserContext } from 'context/User';
import UserRepresentSong from 'components/UserRepresentSong.js';

export default function UserIntroduction({ introduction, song, id }) {
  const { setRepresentModal } = useModal();
  const { getRepresentSongs } = useContext(UserContext);
  const onClickRepresentSong = () => {
    getRepresentSongs({ id });
    setRepresentModal(true);
  };
  return (
    <View style={[style.flexRow, styles.introductionBox]}>
      {introduction !== undefined && <Text style={styles.introductionText}>{introduction}</Text>}
      <TouchableOpacity style={[style.flexRow]}>
        <UserRepresentSong song={song} action={onClickRepresentSong} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introductionBox: {
    marginTop: 11 * SCALE_HEIGHT,
  },
  introductionText: {
    color: COLOR_3,
    marginRight: 6 * SCALE_WIDTH,
    fontSize: FS(12),
  },
});
