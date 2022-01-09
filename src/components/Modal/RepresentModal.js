import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { useModal } from 'providers/modal';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Context as AddedContext } from 'context/Added';
import Modal from '.';

const ModalView = () => {
  const { state } = useContext(UserContext);
  const { representSongs } = state;
  const { postAddedSong } = useContext(AddedContext);
  const name = state.otherUser ? state.otherUser.name : state.user.name;

  const onClickAddActions = (song) => {
    return (
      <TouchableOpacity onPress={() => postAddedSong({ song })}>
        <Text>담기</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.viewContainer}>
      <Text>{name}님의 대표곡</Text>
      {representSongs && (
        <>
          <Text>총 {representSongs.length}곡</Text>
          <TrackPlayerProvider>
            <FlatList
              data={representSongs}
              keyExtractor={(song) => song.id}
              renderItem={({ item }) => {
                return <SongView song={item} actions={onClickAddActions(item)} />;
              }}
            />
          </TrackPlayerProvider>
        </>
      )}
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
    height: 400 * SCALE_HEIGHT,
    backgroundColor: 'rgb(254,254,254)',
    borderRadius: 8 * SCALE_HEIGHT,
  },
  title: {
    fontSize: FS(16),
    color: 'rgb(86,86,86)',
    marginTop: 24 * SCALE_HEIGHT,
  },
  complete: {
    fontSize: FS(16),
    marginTop: 16 * SCALE_HEIGHT,
  },
});
