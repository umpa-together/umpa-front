import React, { useCallback, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import CreateInput from 'components/Playlist/CreateInput';
import CreateSongList from 'components/Playlist/CreateSongList';
import { usePlaylistCreate } from 'providers/playlistCreate';
import Header from 'components/Header';
import style from 'constants/styles';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';
import { useScroll } from 'providers/scroll';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_5, MAIN_COLOR } from 'constants/colors';

const NextActions = () => {
  const [validity, setValidity] = useState(false);
  const { information, setSongs, songs, image } = usePlaylistCreate();
  const { arraySort } = useScroll();

  const onPressNext = async () => {
    if (validity) {
      const songsChange = arraySort(songs, setSongs);
      navigate('PlaylistUpload', {
        data: { information, songs: songsChange, image },
      });
    }
  };
  useEffect(() => {
    if (information.title.length > 0 && songs.length >= 3) {
      setValidity(true);
    }
  }, [information, songs]);

  return (
    <TouchableOpacity onPress={onPressNext}>
      <Text style={validity ? styles.activeText : styles.inactiveText}>다음</Text>
    </TouchableOpacity>
  );
};

export default function PlaylistCreate({ data }) {
  const { setParams, songs, setSongs } = usePlaylistCreate();
  const { songsRef, actionsRef, setOpt } = useSongActions();
  const { handleOutsideScroll, outsideScrollViewRef } = useScroll();
  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);

  useFocusEffect(
    useCallback(() => {
      actionsRef.current = setSongs;
      setOpt('playlist');
    }, []),
  );

  return (
    <View style={[style.background, styles.container]}>
      <Header
        title="새 플레이리스트 추가"
        titleStyle={style.headertitle}
        back
        actions={[<NextActions />]}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleOutsideScroll}
        ref={outsideScrollViewRef}
        scrollEventThrottle={16}
      >
        <CreateInput />
        <CreateSongList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16 * SCALE_WIDTH,
  },
  activeText: {
    fontSize: FS(14),
    color: MAIN_COLOR,
  },
  inactiveText: {
    fontSize: FS(14),
    color: COLOR_5,
  },
});
