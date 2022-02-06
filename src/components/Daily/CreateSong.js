import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import SearchSongModal from 'components/Modal/SearchSongModal';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import { useDailyCreate } from 'providers/dailyCreate';
import Text from 'components/Text';
import DailySong from './DailySong';

export default function CreateSong() {
  const [searchModal, setSearchModal] = useState(false);
  const { searchInfoRef, setSelectedSongs } = useSongActions();
  const { song, setSong, onClickDeleteSong } = useDailyCreate();

  const addFunction = async (songData) => {
    setSong(songData);
    setSearchModal(false);
  };

  const onClickAddSong = () => {
    if (song === null) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs([song]);
    }
    setSearchModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      searchInfoRef.current = { title: '데일리 곡 선택', key: 'daily', func: addFunction };
    }, []),
  );

  return (
    <View style={styles.container}>
      {!song && (
        <TouchableOpacity onPress={onClickAddSong} style={styles.hashtagBox}>
          <Icon style={styles.addIcon} source={require('public/icons/daily-create-song.png')} />
          <Text style={styles.hashtagsStyle}>데일리 곡 선택</Text>
        </TouchableOpacity>
      )}
      {song && (
        <View style={style.flexRow}>
          <DailySong song={song} />
          <TouchableOpacity onPress={onClickDeleteSong}>
            <Icon
              style={styles.deleteIcon}
              source={require('public/icons/daily-create-delete-song.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      <SearchSongModal modal={searchModal} setModal={setSearchModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * SCALE_WIDTH,
    paddingTop: 14 * SCALE_HEIGHT,
  },
  hashtagBox: {
    borderRadius: 43 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: MAIN_COLOR,
    marginRight: 10 * SCALE_WIDTH,
    alignSelf: 'flex-start',
  },
  hashtagsStyle: {
    paddingLeft: 24 * SCALE_WIDTH,
    paddingRight: 11 * SCALE_WIDTH,
    paddingVertical: 6 * SCALE_HEIGHT,
    fontSize: FS(11),
    color: MAIN_COLOR,
  },
  addIcon: {
    width: 8 * SCALE_WIDTH,
    height: 8 * SCALE_HEIGHT,
    position: 'absolute',
    left: 11 * SCALE_WIDTH,
    top: 8 * SCALE_HEIGHT,
  },
  deleteIcon: {
    left: -20 * SCALE_WIDTH,
    bottom: -16 * SCALE_HEIGHT,
    position: 'absolute',
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
  },
});
