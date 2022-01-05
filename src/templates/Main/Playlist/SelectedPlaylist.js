import React, { useContext } from 'react';
import { View, ScrollView, Button } from 'react-native';
import Header from 'components/Header';
import style from 'constants/styles';
import SelectedInfo from 'components/Playlist/SelectedInfo';
import SelectedSong from 'components/Playlist/SelectedSong';
import Divider from 'widgets/Divider';
import { Context as PlaylistContext } from 'context/Playlist';
import SelectedComment from 'components/Playlist/SelectedComment';
import CommentBar from 'components/CommentBar';
import DeleteModal from 'components/Modal/DeleteMoal';
import { useModal } from 'providers/modal';
import PlaylistModal from 'components/Modal/PlaylistModal';

const HeaderAction = () => {
  const { setIsPlaylistModal } = useModal();
  return <Button title="더보기" onPress={() => setIsPlaylistModal(true)} />;
};

export default function SelectedPlaylist({ playlistId }) {
  const { state, addComment } = useContext(PlaylistContext);
  const { currentComments, currentPlaylist, currentSongs } = state;
  return (
    <View style={style.background}>
      <ScrollView>
        <Header title="플레이리스트" back actions={[<HeaderAction />]} />
        <SelectedInfo playlistinfo={currentPlaylist} />
        <SelectedSong songs={currentSongs} />
        <Divider />
        <SelectedComment playlistId={playlistId} comments={currentComments} />
      </ScrollView>
      <CommentBar targetId={playlistId} action={addComment} />
      <DeleteModal />
      <PlaylistModal />
    </View>
  );
}
