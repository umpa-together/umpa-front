import React, { useContext, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { Context as AddedContext } from 'context/Added';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';
import PlaylistCard from 'components/PlaylistView';
import style from 'constants/styles';

export function AddedSong() {
  const { state, deleteAddedSong } = useContext(AddedContext);
  const [isEdit, setIsEdit] = useState(false);

  const deleteActions = (id) => {
    return (
      <TouchableOpacity onPress={() => deleteAddedSong({ id })}>
        <Text>삭제</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AddedLayout item={state.songLists} setIsEdit={setIsEdit} />
      <TrackPlayerProvider>
        <FlatList
          data={state.songLists}
          keyExtractor={(song) => song._id}
          renderItem={({ item }) => {
            const { song, _id: id } = item;
            return <SongView song={song} actions={isEdit && deleteActions(id)} />;
          }}
        />
      </TrackPlayerProvider>
    </>
  );
}

export function AddedPlaylist() {
  const { state, deleteAddedPlaylist } = useContext(AddedContext);
  const [isEdit, setIsEdit] = useState(false);

  const deleteActions = (id) => {
    return (
      <TouchableOpacity onPress={() => deleteAddedPlaylist({ id })}>
        <Text>삭제</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AddedLayout item={state.playlists} setIsEdit={setIsEdit} />
      <FlatList
        data={state.playlists}
        keyExtractor={(playlist) => playlist._id}
        renderItem={({ item }) => {
          const { playlistId: playlist, _id: id } = item;
          return <PlaylistCard playlist={playlist} actions={isEdit && deleteActions(id)} />;
        }}
      />
    </>
  );
}

const AddedLayout = ({ item, setIsEdit }) => {
  const onClickEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      {item && (
        <View style={[style.flexRow, style.space_between]}>
          <Text>총 {item.length}개</Text>
          <TouchableOpacity onPress={onClickEdit}>
            <Text>편집</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
