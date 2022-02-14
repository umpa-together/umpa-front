import { StyleSheet } from 'react-native';
import React from 'react';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { SUB_COLOR } from 'constants/colors';
import TouchableNoDouble from 'components/TouchableNoDouble';
import Text from 'components/Text';
import { navigate } from 'lib/utils/navigation';
import { useTrackPlayer } from 'providers/trackPlayer';

export default function RecommendButton({ playlistId, firstView, setFirstView }) {
  const { stopTrackSong } = useTrackPlayer();

  const onClickMove = async () => {
    if (firstView) {
      setFirstView(false);
    } else {
      navigate('SelectedRelay', { id: playlistId });
      stopTrackSong();
    }
  };

  return (
    <TouchableNoDouble style={styles.container} onPress={onClickMove}>
      <Text style={styles.text}>{firstView ? '곡 심사하기' : '나도 곡 추천하기'}</Text>
    </TouchableNoDouble>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 700 * SCALE_HEIGHT,
    position: 'absolute',
    width: 231 * SCALE_WIDTH,
    height: 41 * SCALE_HEIGHT,
    borderRadius: 5 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 72 * SCALE_WIDTH,
    marginTop: 36 * SCALE_HEIGHT,
    backgroundColor: SUB_COLOR,
  },
  text: {
    fontSize: FS(16),
    color: '#FFF',
    fontWeight: 'bold',
  },
});
