import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { useSongActions } from 'providers/songActions';
import { COLOR_5, MAIN_COLOR } from 'constants/colors';
import style from 'constants/styles';
import Text from 'components/Text';
import Modal from '.';

const ModalView = ({ onCloseSearchSongModal, onClose }) => {
  const { selectedSongs } = useSongActions();
  const {
    state: {
      selectedRelay: {
        playlist: { _id: playlistId },
      },
    },
    postRelaySong,
    getSelectedRelay,
  } = useContext(RelayContext);
  const info = `곡 : ${selectedSongs[0].attributes.name} - ${selectedSongs[0].attributes.artistName}`;
  const actionLists = [
    { title: '취소하기', key: 'cancel' },
    { title: '등록하기', key: 'add' },
  ];

  const actionFunc = async (key) => {
    if (key === 'cancel') {
      onClose();
    } else if (key === 'add') {
      await postRelaySong({ song: selectedSongs[0], playlistId });
      getSelectedRelay({ id: playlistId });
      onCloseSearchSongModal();
      onClose();
    }
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>등록한 곡은 변경 및 편집이 불가합니다.</Text>
      <Text style={styles.title}>등록하시겠습니까?</Text>
      <View style={styles.songArea}>
        <Text numberOfLines={1} style={styles.info}>
          {info}
        </Text>
      </View>
      <View style={style.flexRow}>
        {actionLists.map((item) => {
          const { key, title } = item;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.box, key === 'cancel' ? styles.left : styles.main]}
              onPress={() => actionFunc(key)}
              activeOpacity={0.8}
            >
              <Text style={key === 'cancel' ? styles.leftText : styles.rightText}>{title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function RelayActionModal({ modal, setModal, onClose }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };

  return (
    <Modal isVisible={modal} onBackdropPress={onBackdropPress} style={styles.container}>
      <ModalView onClose={onBackdropPress} onCloseSearchSongModal={onClose} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    alignItems: 'center',
  },
  viewContainer: {
    width: 302 * SCALE_WIDTH,
    paddingTop: 34 * SCALE_HEIGHT,
    paddingBottom: 20 * SCALE_HEIGHT,
    backgroundColor: '#fefefe',
    borderRadius: 8 * SCALE_HEIGHT,
    alignItems: 'center',
  },
  title: {
    fontSize: FS(13),
    marginBottom: 15 * SCALE_HEIGHT,
  },
  songArea: {
    maxWidth: 243 * SCALE_WIDTH,
  },
  info: {
    fontSize: FS(12),
    color: COLOR_5,
  },
  box: {
    width: 116 * SCALE_HEIGHT,
    height: 36 * SCALE_HEIGHT,
    borderRadius: 8 * SCALE_HEIGHT,
    borderWidth: 1.5 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9 * SCALE_WIDTH,
    marginTop: 22 * SCALE_HEIGHT,
  },
  left: {
    borderColor: '#e9e9e9',
  },
  main: {
    backgroundColor: MAIN_COLOR,
    borderColor: MAIN_COLOR,
  },
  leftText: {
    fontSize: FS(14),
    color: '#858585',
  },
  rightText: {
    fontSize: FS(14),
    color: '#fff',
  },
});
