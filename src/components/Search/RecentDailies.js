import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as MainContentsContext } from 'context/MainContents';
import TouchableNoDouble from 'components/TouchableNoDouble';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import SongCard from 'components/SongCard';
import style from 'constants/styles';
import { push } from 'lib/utils/navigation';
import Text from 'components/Text';

export default function RecentDailies() {
  const { state } = useContext(MainContentsContext);

  const onClickSong = async (id, postUser) => {
    push('SelectedDaily', { post: false, id, postUserId: postUser });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지금 뜨는 데일리</Text>
      <View style={[style.flexRow, styles.wrap]}>
        {state.recentDailies &&
          state.recentDailies.map((daily) => {
            const { _id: id, song, postUserId: postUser } = daily;
            return (
              <TouchableNoDouble
                key={id}
                onPress={() => onClickSong(id, postUser)}
                activeOpacity={0.8}
              >
                <SongCard song={song} />
              </TouchableNoDouble>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    marginBottom: 2 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
    marginRight: 8 * SCALE_WIDTH,
  },
  flatList: {
    paddingHorizontal: 11.5 * SCALE_WIDTH,
  },
  wrap: {
    flexWrap: 'wrap',
    marginLeft: 16 * SCALE_WIDTH,
    paddingBottom: 24 * SCALE_HEIGHT,
  },
});
