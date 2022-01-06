import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { useModal } from 'providers/modal';
import { usePlaylistCreate } from 'providers/playlistCreate';
import ScrollSong from 'components/ScrollSong';
import SongView from 'components/SongView';
import Movable from 'components/ScrollSong/Movable';
import { useSongActions } from 'providers/songActions';

export default function CreateSongList() {
  const { searchModal, setSearchModal } = useModal();
  const { songs } = usePlaylistCreate();
  const { setActionType, getActionComponent } = useSongActions();

  const onClickAdd = () => {
    setSearchModal(true);
  };

  useEffect(() => {
    if (!searchModal) {
      setActionType('playlistDeleteSong');
    } else {
      setActionType('playlistAddSong');
    }
  }, [searchModal]);

  return (
    <>
      <Button title="song add" onPress={onClickAdd} />
      <ScrollSong songs={songs}>
        {songs.map((song) => {
          return (
            <Movable key={song.id} id={song.id} songsCount={songs.length}>
              <SongView song={song} actions={getActionComponent({ data: song })} />
            </Movable>
          );
        })}
      </ScrollSong>
    </>
  );
}
