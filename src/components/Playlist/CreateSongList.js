import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';
import ScrollSong from 'components/ScrollSong';
import ScrollSongView from 'components/SongView/ScrollSongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import Movable from 'components/ScrollSong/Movable';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import DeleteModal from 'components/Modal/DeleteModal';
import SearchSongModal from 'components/Modal/SearchSongModal';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';

const SongLandings = ({ song }) => {
  const [songDeletemodal, setSongDeleteModal] = useState(false);
  const { setSongs } = usePlaylistCreate();

  const onClickDeleteSongModal = () => {
    setSongDeleteModal(true);
  };
  const deleteFunction = () => {
    setSongs((prev) => prev.filter((item) => item.id !== song.id));
  };
  return (
    <>
      <TouchableOpacity style={styles.box} activeOpacity={0.9} onPress={onClickDeleteSongModal}>
        <View style={styles.removeCircle}>
          {songDeletemodal && <View style={styles.activeCircle} />}
        </View>
      </TouchableOpacity>
      <DeleteModal
        deleteFunc={deleteFunction}
        modal={songDeletemodal}
        setModal={setSongDeleteModal}
      />
    </>
  );
};

export default function CreateSongList() {
  const [searchModal, setSearchModal] = useState(false);
  const { songs, setSongs } = usePlaylistCreate();
  const { searchInfoRef, setSelectedSongs, selectedSongs } = useSongActions();

  const onClickAddSong = () => {
    setSelectedSongs(songs);
    setSearchModal(true);
  };

  useFocusEffect(
    useCallback(() => {
      searchInfoRef.current = { title: '곡 추가', key: 'playlist', completeFunc: setSongs };
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={[styles.songHeader, style.flexRow, style.space_between]}>
        <Text style={styles.title}>
          플레이리스트 (최소 3곡, 최대 8곡)<Text style={styles.required}>{` *`}</Text>
        </Text>
        <TouchableOpacity style={styles.plusBox} onPress={onClickAddSong}>
          <Text style={styles.plusText}>+ 곡 추가</Text>
        </TouchableOpacity>
      </View>
      <TrackPlayerProvider>
        <ScrollSong songs={songs}>
          {songs.map((song) => {
            return (
              <Movable key={song.id} id={song.id} songsCount={songs.length}>
                <ScrollSongView song={song} landings={<SongLandings song={song} />} />
              </Movable>
            );
          })}
        </ScrollSong>
      </TrackPlayerProvider>
      <SearchSongModal
        modal={searchModal}
        setModal={setSearchModal}
        activeCheck={selectedSongs.length > 0}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 100 * SCALE_HEIGHT,
    paddingTop: 43 * SCALE_HEIGHT,
  },
  background: {
    height: 122 * SCALE_HEIGHT,
    marginBottom: 60 * SCALE_HEIGHT,
  },
  backgroundImg: {
    height: 122 * SCALE_HEIGHT,
    width: '100%',
    position: 'absolute',
  },
  backgroundContainer: {
    position: 'absolute',
    bottom: 8 * SCALE_HEIGHT,
    right: 16 * SCALE_WIDTH,
    zIndex: 98,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBox: {
    width: 81 * SCALE_WIDTH,
    height: 24 * SCALE_HEIGHT,
  },
  backgroundText: {
    fontSize: FS(12),
    color: '#fff',
    position: 'absolute',
  },
  title: {
    color: COLOR_3,
    fontSize: FS(12),
  },
  sectionBox: {
    width: 343 * SCALE_WIDTH,
    minHeight: 32 * SCALE_HEIGHT,
    borderColor: '#dbdbdb',
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12 * SCALE_WIDTH,
    marginTop: 10 * SCALE_HEIGHT,
    marginBottom: 24 * SCALE_HEIGHT,
  },
  profileContainer: {
    position: 'absolute',
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    top: 76 * SCALE_HEIGHT,
    left: 142 * SCALE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    borderRadius: 90 * SCALE_HEIGHT,
    position: 'absolute',
  },
  circle: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    position: 'absolute',
    zIndex: 1,
  },
  changeText: {
    fontSize: FS(14),
    fontWeight: '400',
    color: '#fff',
    zIndex: 98,
  },
  songHeader: {
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    width: 343 * SCALE_WIDTH,
    paddingBottom: 6 * SCALE_HEIGHT,
  },
  plusBox: {
    paddingHorizontal: 8 * SCALE_WIDTH,
    paddingVertical: 5 * SCALE_HEIGHT,
    borderColor: MAIN_COLOR,
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 44 * SCALE_HEIGHT,
  },
  plusText: {
    fontSize: FS(11),
    fontWeight: '300',
    color: MAIN_COLOR,
  },
  removeCircle: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    borderRadius: 20 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10 * SCALE_WIDTH,
  },
  activeCircle: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
  },
  accent: {
    color: MAIN_COLOR,
    marginLeft: 3 * SCALE_WIDTH,
  },
  required: {
    color: MAIN_COLOR,
  },
});
