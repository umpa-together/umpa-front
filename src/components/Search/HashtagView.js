import React from 'react';
import { StyleSheet, View } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_1, COLOR_2 } from 'constants/colors';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'components/Text';

export default function HashtagView({ info, containerStyle }) {
  const { hashtag, playlistId, dailyId, _id: id } = info;
  const count = playlistId.length + dailyId.length;

  const onClickHashtag = () => {
    navigate('SelectedHashtag', { id, info });
  };

  return (
    <>
      <TouchableOpacity
        onPress={onClickHashtag}
        style={[styles.container, style.flexRow, containerStyle]}
        activeOpacity={0.8}
      >
        <View style={styles.circle}>
          <Text style={styles.hashtag}>#</Text>
        </View>
        <View>
          <Text style={styles.title}>#{hashtag}</Text>
          <Text style={styles.count}>게시물 {count}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16 * SCALE_WIDTH,
    marginBottom: 19 * SCALE_HEIGHT,
  },
  circle: {
    width: 54 * SCALE_WIDTH,
    height: 54 * SCALE_WIDTH,
    borderRadius: 54 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: 'rgba(27, 77, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18 * SCALE_WIDTH,
  },
  hashtag: {
    fontSize: FS(28),
    color: MAIN_COLOR,
  },
  title: {
    fontSize: FS(14),
    color: COLOR_1,
    marginBottom: 8 * SCALE_HEIGHT,
  },
  count: {
    fontSize: FS(14),
    color: COLOR_2,
  },
});
