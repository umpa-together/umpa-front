import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import CreateInput from 'components/Playlist/CreateInput';
import CreateSongList from 'components/Playlist/CreateSongList';
import { usePlaylistCreate } from 'providers/playlistCreate';
import Header from 'components/Header';
import style from 'constants/styles';
import { useScroll } from 'providers/scroll';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_5, MAIN_COLOR } from 'constants/colors';
import SongActionsProvider from 'providers/songActions';

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
  const { setParams } = usePlaylistCreate();
  const { handleOutsideScroll, outsideScrollViewRef } = useScroll();
  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  return (
    <View style={style.background}>
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
        contentContainerStyle={styles.container}
      >
        <CreateInput />
        <SongActionsProvider>
          <CreateSongList />
        </SongActionsProvider>
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
