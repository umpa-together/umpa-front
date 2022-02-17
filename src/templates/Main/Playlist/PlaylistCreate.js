import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as UserContext } from 'context/User';
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
import ValidityModal from 'components/Modal/ValidityModal';
import { useModal } from 'providers/modal';
import Text from 'components/Text';
import GuideModal from 'components/Modal/GuideModal';

const NextActions = ({ edit }) => {
  const [validity, setValidity] = useState(false);
  const { information, setSongs, songs, image } = usePlaylistCreate();
  const { arraySort } = useScroll();
  const { onValidityModal } = useModal();

  const onPressNext = async () => {
    if (validity) {
      const songsChange = arraySort(songs, setSongs);
      navigate('PlaylistUpload', {
        data: { information, songs: songsChange, image },
        edit,
      });
    } else if (songs.length < 3) {
      onValidityModal();
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

export default function PlaylistCreate({ data, edit }) {
  const {
    state: { user },
  } = useContext(UserContext);
  const { setParams } = usePlaylistCreate();
  const { handleOutsideScroll, outsideScrollViewRef } = useScroll();
  const { validityModal, guideModal, setGuideModal } = useModal();
  const validityMsg = '최소 3곡을 담아주세요';
  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  useEffect(() => {
    if (user && !user.guide.playlist) {
      setGuideModal('playlist');
    }
  }, [user]);

  return (
    <View style={style.background}>
      <Header
        title={edit ? '플레이리스트 편집' : '새 플레이리스트 추가'}
        titleStyle={style.headertitle}
        back
        actions={[<NextActions edit={edit} />]}
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
      <GuideModal modal={guideModal === 'playlist'} setModal={setGuideModal} />
      {validityModal && <ValidityModal title={validityMsg} />}
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
