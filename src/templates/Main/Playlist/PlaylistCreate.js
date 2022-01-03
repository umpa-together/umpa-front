import React, { useCallback, useEffect } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { navigate } from 'lib/utils/navigation';
import CreateInput from 'components/Playlist/CreateInput';
import CreateSongList from 'components/Playlist/CreateSongList';
import { usePlaylistCreate } from 'providers/playlistCreate';
import CreateHashtag from 'components/Playlist/CreateHashtag';
import Header from 'components/Header';
import style from 'constants/styles';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';

const NextActions = () => {
  const { information, songs, image } = usePlaylistCreate();

  const onPressNext = () => {
    navigate('PlaylistUpload', {
      data: { information, songs, image },
    });
  };

  return <Button title="next" onPress={onPressNext} />;
};

export default function PlaylistCreate({ data }) {
  const { setParams, songs, setSongs } = usePlaylistCreate();
  const { setActionType, songsRef, actionsRef } = useSongActions();

  useEffect(() => {
    if (data) {
      setParams(data);
    }
  }, [data]);

  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);

  useFocusEffect(
    useCallback(() => {
      actionsRef.current = setSongs;
      setActionType('playlistAddSong');
    }, []),
  );

  return (
    <View style={style.background}>
      <Header title="새 플레이리스트 추가" back actions={[<NextActions />]} />
      <ScrollView>
        <CreateInput />
        <CreateSongList />
        <CreateHashtag />
      </ScrollView>
    </View>
  );
}
