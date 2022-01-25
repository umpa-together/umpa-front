import React, { useContext, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import SongView from 'components/SongView';
import PlaylistCard from 'components/PlaylistView';
import HarmfulModal from 'components/Modal/HarmfulModal';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { MAIN_COLOR } from 'constants/colors';
import DeleteModal from 'components/Modal/DeleteModal';

const DeleteLandings = ({ type, id }) => {
  const [deletemodal, setDeleteModal] = useState(false);
  const { deleteAddedSong, deleteAddedPlaylist } = useContext(AddedContext);

  const onClickDeleteModal = () => {
    setDeleteModal(true);
  };

  const deleteFunction = () => {
    if (type === 'song') {
      deleteAddedSong({ id });
    } else if (type === 'playlist') {
      deleteAddedPlaylist({ id });
    }
    setDeleteModal(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.box} activeOpacity={0.9} onPress={onClickDeleteModal}>
        <View style={styles.removeCircle}>
          {deletemodal && <View style={styles.activeCircle} />}
        </View>
      </TouchableOpacity>
      <DeleteModal deleteFunc={deleteFunction} modal={deletemodal} setModal={setDeleteModal} />
    </>
  );
};

export function AddedSong({ edit }) {
  const { state } = useContext(AddedContext);

  return (
    <>
      <Text style={styles.length}>총 {state.songLists.length}개</Text>
      <FlatList
        data={state.songLists}
        keyExtractor={(song) => song._id}
        renderItem={({ item }) => {
          const { song, _id: id } = item;
          return (
            <SongView
              song={song}
              landings={edit && <DeleteLandings type="song" id={id} />}
              play={!edit}
            />
          );
        }}
      />
      <HarmfulModal />
    </>
  );
}

export function AddedPlaylist({ edit }) {
  const { state } = useContext(AddedContext);

  return (
    <>
      <Text style={styles.length}>총 {state.playlists.length}개</Text>
      <FlatList
        data={state.playlists}
        keyExtractor={(playlist) => playlist._id}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          const { playlistId: playlist, _id: id } = item;
          return (
            <PlaylistCard
              playlist={playlist}
              landings={edit && <DeleteLandings type="playlist" id={id} />}
              play={!edit}
            />
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  length: {
    color: '#626262',
    fontSize: FS(12),
    marginTop: 13 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
    marginBottom: 18 * SCALE_HEIGHT,
  },
  removeCircle: {
    width: 20 * SCALE_WIDTH,
    height: 20 * SCALE_WIDTH,
    borderRadius: 20 * SCALE_HEIGHT,
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16 * SCALE_WIDTH,
  },
  activeCircle: {
    width: 12 * SCALE_WIDTH,
    height: 12 * SCALE_WIDTH,
    borderRadius: 12 * SCALE_HEIGHT,
    backgroundColor: MAIN_COLOR,
  },
  contentContainer: {
    paddingLeft: 16 * SCALE_WIDTH,
  },
});
