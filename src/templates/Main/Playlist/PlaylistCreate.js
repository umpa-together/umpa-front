import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { navigate, goBack } from 'lib/utils/navigation';
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
import Icon from 'widgets/Icon';
import ActionModal from 'components/Modal/ActionModal';

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

const BackLandings = ({ onPressBack }) => {
  return (
    <TouchableOpacity onPress={onPressBack}>
      <Icon source={require('public/icons/back-40.png')} style={[style.icons, styles.iconMargin]} />
    </TouchableOpacity>
  );
};

export default function PlaylistCreate({ data, edit }) {
  const { setParams } = usePlaylistCreate();
  const { handleOutsideScroll, outsideScrollViewRef } = useScroll();
  const { validityModal } = useModal();
  const [actionModal, setActionModal] = useState(false);

  const deleteActionLists = [
    { title: '작성취소', key: 'cancel' },
    { title: '작성계속', key: 'continue' },
  ];

  const deleteActionFunction = async (key) => {
    if (key === 'cancel') {
      goBack();
    }
    setActionModal(false);
  };

  const actions = {
    mainTitle: '작성된 내용은 저장되지 않고 사라집니다. \n정말로 작성을 취소 하시겠습니까?',
    func: deleteActionFunction,
    list: deleteActionLists,
  };

  const onPressBack = () => {
    setActionModal(true);
  };

  const validityMsg = '최소 3곡을 담아주세요';

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onPressBack);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={style.background}>
      <Header
        title={edit ? '플레이리스트 편집' : '새 플레이리스트 추가'}
        titleStyle={style.headertitle}
        landings={[<BackLandings onPressBack={onPressBack} />]}
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
      <ActionModal modal={actionModal} setModal={setActionModal} actionInfo={actions} />
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
  iconMargin: {
    right: 10 * SCALE_WIDTH,
  },
});
