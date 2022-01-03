import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, Button } from 'react-native';
import { usePlaylistCreate } from 'providers/playlistCreate';
import UploadText from 'components/Playlist/UploadText';
import UploadSongs from 'components/Playlist/UploadSongs';
import UploadPhoto from 'components/Playlist/UploadPhoto';
import UploadHashtag from 'components/Playlist/UploadHashtag';
import Header from 'components/Header';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import { useSongActions } from 'providers/songActions';
import { useFocusEffect } from '@react-navigation/native';

const NextActions = () => {
  const { onClickUpload } = usePlaylistCreate();
  return <Button title="upload" onPress={onClickUpload} />;
};

const BackLandings = () => {
  const { information, songs, image } = usePlaylistCreate();

  const onPressBack = () => {
    navigate('PlaylistCreate', {
      data: { information, songs, image },
    });
  };

  return <Button title="back" onPress={onPressBack} />;
};

export default function PlaylistUpload({ data }) {
  const { information, setParams, songs, setSongs } = usePlaylistCreate();
  const { setActionType, songsRef, actionsRef } = useSongActions();
  const { title, content, hashtags } = information;

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
      setActionType('playlistDeleteSong');
    }, []),
  );

  return (
    <View style={style.background}>
      <Header title="플레이리스트 생성" landings={[<BackLandings />]} actions={[<NextActions />]} />
      <ScrollView>
        <UploadPhoto />
        <UploadText title={title} content={content} />
        <UploadHashtag hashtags={hashtags} />
        <UploadSongs songs={songs} />
      </ScrollView>
    </View>
  );
}
