import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Context as PlaylistContext } from 'context/Playlist';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR, COLOR_3 } from 'constants/colors';
import style from 'constants/styles';

export default function SelectedHashtag() {
  const {
    state: {
      currentPlaylist: { hashtag },
    },
  } = useContext(PlaylistContext);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View style={[style.flexRow, styles.container]}>
        {hashtag.map((item) => {
          return (
            <View key={item} style={styles.hashtagBox}>
              <Text style={styles.hashtagsStyle}>{`# ${item}`}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18 * SCALE_HEIGHT,
    paddingBottom: 16 * SCALE_HEIGHT,
    paddingHorizontal: 26 * SCALE_WIDTH,
  },
  hashtagBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    marginRight: 10 * SCALE_WIDTH,
    alignSelf: 'flex-start',
  },
  hashtagsStyle: {
    paddingLeft: 8 * SCALE_WIDTH,
    paddingRight: 9 * SCALE_WIDTH,
    paddingVertical: 6 * SCALE_HEIGHT,
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
  hashtagEdit: {
    color: COLOR_3,
    borderColor: COLOR_3,
  },
});
