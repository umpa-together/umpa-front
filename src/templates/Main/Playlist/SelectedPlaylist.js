import React, { useContext } from 'react';
import { View, ScrollView, Button } from 'react-native';
import Header from 'components/Header';
import style from 'constants/styles';
import SelectedInfo from 'components/Playlist/SelectedInfo';
import SelectedSong from 'components/Playlist/SelectedSong';
import Divider from 'widgets/Divider';
import { Context as PlaylistContext } from 'context/Playlist';
import { Context as UserContext } from 'context/User';
import CommentBar from 'components/CommentBar';
import DeleteModal from 'components/Modal/DeleteMoal';
import SelectedComment from 'components/SelectedComment';
import { useModal } from 'providers/modal';
import PlaylistModal from 'components/Modal/PlaylistModal';

const HeaderAction = () => {
  const { setPlaylistModal } = useModal();
  return <Button title="더보기" onPress={() => setPlaylistModal(true)} />;
};

export default function SelectedPlaylist({ playlistId, postUser }) {
  const { state, addComment } = useContext(PlaylistContext);
  const { state: user } = useContext(UserContext);
  const checkMypost = postUser === user._id;
  const { currentComments, currentPlaylist, currentSongs } = state;
  return (
    <View style={style.background}>
      <ScrollView>
        <Header title="플레이리스트" back actions={checkMypost ? [<HeaderAction />] : []} />
        <SelectedInfo playlistinfo={currentPlaylist} />
        <SelectedSong songs={currentSongs} />
        <Divider />
        <SelectedComment opt="playlist" targetId={playlistId} comments={currentComments} />
      </ScrollView>
      <CommentBar targetId={playlistId} action={addComment} />
      <DeleteModal />
      <PlaylistModal />
    </View>
  );
}
