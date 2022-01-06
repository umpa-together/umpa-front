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
import { useScroll } from 'providers/scroll';

const NextActions = () => {
  const { information, setSongs, songs, image } = usePlaylistCreate();
  const { arraySort } = useScroll();

  const onPressNext = async () => {
    const songsChange = arraySort(songs, setSongs);
    navigate('PlaylistUpload', {
      data: { information, songs: songsChange, image },
    });
  };

  return <Button title="next" onPress={onPressNext} />;
};

export default function PlaylistCreate({ data }) {
  const { setParams, songs, setSongs } = usePlaylistCreate();
  const { songsRef, actionsRef } = useSongActions();

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
