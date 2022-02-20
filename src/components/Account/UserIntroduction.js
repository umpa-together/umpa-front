import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { COLOR_2 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { useModal } from 'providers/modal';
import { Context as UserContext } from 'context/User';
import UserRepresentSong from 'components/UserRepresentSong';
import Text from 'components/Text';

export default function UserIntroduction({ introduction, song, id }) {
  const { setRepresentModal } = useModal();
  const { getRepresentSongs } = useContext(UserContext);
  const onClickRepresentSong = () => {
    getRepresentSongs({ id });
    setRepresentModal(true);
  };
  return (
    <View style={[style.flexRow, styles.introductionBox]}>
      <Text style={styles.introductionText}>
        {introduction === '' ? '소개글 없음' : introduction}
      </Text>
      <TouchableOpacity style={[style.flexRow]}>
        {song && <UserRepresentSong account song={song} action={onClickRepresentSong} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  introductionBox: {
    marginTop: 11 * SCALE_HEIGHT,
    width: 340 * SCALE_WIDTH,
    justifyContent: 'space-between',
  },
  introductionText: {
    width: 191 * SCALE_WIDTH,
    color: COLOR_2,
    marginRight: 6 * SCALE_WIDTH,
    fontSize: FS(12),
  },
});
