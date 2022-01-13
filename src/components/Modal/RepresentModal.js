import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { Context as UserContext } from 'context/User';
import { useModal } from 'providers/modal';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import { Context as AddedContext } from 'context/Added';
import { COLOR_1 } from 'constants/colors';
import LoadingIndicator from 'components/LoadingIndicator';
import Modal from '.';

const ModalView = () => {
  const { state } = useContext(UserContext);
  const { representSongs } = state;
  const { postAddedSong } = useContext(AddedContext);
  const name = state.otherUser ? state.otherUser.name : state.user.name;

  const onClickAddActions = (song) => {
    return (
      <TouchableOpacity onPress={() => postAddedSong({ song })} style={styles.icon}>
        <Text>담기</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.title}>{name}님의 대표곡</Text>
      {representSongs ? (
        <TrackPlayerProvider>
          <FlatList
            data={representSongs}
            keyExtractor={(song) => song.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return <SongView song={item} actions={onClickAddActions(item)} />;
            }}
          />
        </TrackPlayerProvider>
      ) : (
        <LoadingIndicator />
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
  icon: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
    borderWidth: 1,
  },
});
