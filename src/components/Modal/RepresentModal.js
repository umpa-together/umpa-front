import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { useModal } from 'providers/modal';
import SongView from 'components/SongView';
import { Context as AddedContext } from 'context/Added';
import { COLOR_1, COLOR_3 } from 'constants/colors';
import LoadingIndicator from 'components/LoadingIndicator';
import { navigate } from 'lib/utils/navigation';
import Icon from 'widgets/Icon';
import AddedModal from 'components/Modal/AddedModal';
import HarmfulModal from 'components/Modal/HarmfulModal';
import Text from 'components/Text';
import Modal from '.';

const ModalView = () => {
  const { state } = useContext(UserContext);
  const { representSongs } = state;
  const { postAddedSong } = useContext(AddedContext);
  const name = state.otherUser ? state.otherUser.name : state.user.name;
  const { onCloseRepresentModal } = useModal();
  const { addedModal, onClickAdded } = useModal();

  const onClickAdd = (song) => {
    postAddedSong({ song });
    onClickAdded();
  };

  const onClickAddActions = (song) => {
    return (
      <TouchableOpacity onPress={() => onClickAdd(song)}>
        <Icon source={require('public/icons/add-song.png')} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  const onClickActions = () => {
    if (!state.otherUser) {
      navigate('ProfileEdit');
    }
    onCloseRepresentModal();
  };

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={onClickActions} style={styles.actions}>
        <Text style={styles.actionsText}>{state.otherUser ? '닫기' : '편집'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{name}님의 대표곡</Text>
      {representSongs ? (
        <FlatList
          data={representSongs}
          keyExtractor={(song) => song.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <SongView song={item} actions={onClickAddActions(item)} />;
          }}
        />
      ) : (
        <LoadingIndicator />
      )}
      {addedModal && <AddedModal title="1곡을 저장한 곡 목록에 담았습니다." />}
      <HarmfulModal />
    </View>
  );
};

export default function RepresentModal() {
  const { representModal, onCloseRepresentModal } = useModal();

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={representModal}
      onBackdropPress={onCloseRepresentModal}
      style={styles.container}
      backdropOpacity={0.7}
    >
      <ModalView />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewContainer: {
    width: '100%',
    height: 355 * SCALE_HEIGHT,
    backgroundColor: 'rgb(254,254,254)',
    borderTopLeftRadius: 10 * SCALE_HEIGHT,
    borderTopRightRadius: 10 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(16),
    color: COLOR_1,
    marginVertical: 25 * SCALE_HEIGHT,
    textAlign: 'center',
  },
  complete: {
    fontSize: FS(16),
    marginTop: 16 * SCALE_HEIGHT,
  },
  actions: {
    position: 'absolute',
    top: 29 * SCALE_HEIGHT,
    right: 14 * SCALE_WIDTH,
    zIndex: 98,
  },
  actionsText: {
    color: COLOR_3,
    fontSize: FS(12),
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
});
