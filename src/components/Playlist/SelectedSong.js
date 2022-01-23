import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchSongView from 'components/SongView/SearchSongView';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import { Provider as AddedProvider } from 'context/Added';

export default function SelectedSong({ songs }) {
  const [isMore, setIsMore] = useState(false);
  const onClickMore = () => {
    setIsMore(!isMore);
  };
  const songCount = songs.length;

  return (
    <View>
      <Text style={styles.titleText}>총 {songs.length}곡</Text>
      <View style={[!isMore && styles.songContainer]}>
        <AddedProvider>
          {songs.map((item) => {
            return <SearchSongView key={item.id} info={{ song: item }} />;
          })}
        </AddedProvider>
      </View>
      {songCount >= 4 && (
        <TouchableOpacity style={styles.moreContainer} onPress={onClickMore}>
          <Text>{isMore ? '줄이기' : '더보기'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: FS(12),
    color: COLOR_3,
    marginBottom: 28 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
  songContainer: {
    maxHeight: 234 * SCALE_HEIGHT,
    overflow: 'hidden',
  },
  moreContainer: {
    width: '100%',
    height: 28 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderColor: COLOR_5,
  },
});
