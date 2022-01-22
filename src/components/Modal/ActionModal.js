import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as DailyContext } from 'context/Daily';
import { MAIN_COLOR } from 'constants/colors';
import Modal from '.';

const ModalView = ({ actionInfo }) => {
  const { mainTitle, func, list } = actionInfo;
  // const { deleteParams, onCloseDeleteModal } = useModal();
  // const { deleteComment: deleteCommentPlaylist } = useContext(PlaylistContext);
  // const { deleteComment: deleteCommentDaily } = useContext(DailyContext);
  //
  // const { targetId, opt, childId } = deleteParams;
  // const onPressDelete = () => {
  //  if (opt === 'playlistcomment') {
  //    deleteCommentPlaylist({ id: targetId, commentId: childId });
  //  } else if (opt === 'dailycomment') {
  //    deleteCommentDaily({ id: targetId, commentId: childId });
  //  }
  //  onCloseDeleteModal();
  // };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>{mainTitle}</Text>
      <View style={style.flexRow}>
        {list.map((item) => {
          const { key, title } = item;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.box, key === 'cancel' ? styles.left : styles.main]}
              onPress={() => func(key)}
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

export default function ActionModal({ modal, setModal, actionInfo }) {
  const onBackdropPress = () => {
    setModal(!modal);
  };
  return (
    <Modal isVisible={modal} onBackdropPress={onBackdropPress} style={styles.container}>
      <ModalView actionInfo={actionInfo} />
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
    height: 130 * SCALE_HEIGHT,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 8 * SCALE_HEIGHT,
    alignItems: 'center',
  },
  title: {
    fontSize: FS(15),
    marginTop: 31 * SCALE_HEIGHT,
    marginBottom: 25 * SCALE_HEIGHT,
  },
  box: {
    width: 116 * SCALE_HEIGHT,
    height: 36 * SCALE_HEIGHT,
    borderRadius: 8 * SCALE_HEIGHT,
    borderWidth: 1.5 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9 * SCALE_WIDTH,
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
