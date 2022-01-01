import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { goBack } from 'lib/utils/navigation';
import UploadText from 'components/Playlist/UploadText';
import UploadSongs from 'components/Playlist/UploadSongs';
import UploadPhoto from 'components/Playlist/UploadPhoto';
import { usePlaylistCreate } from 'providers/playlistCreate';
import UploadHashtag from '../../../components/Playlist/UploadHashtag';

export default function PlaylistUpload({ data }) {
  const { information, setParams, songs, onClickUpload, hashtags } = usePlaylistCreate();
  const { title, content } = information;

  useEffect(() => {
    setParams(data);
  }, []);
  return (
    <View style={{ marginTop: 30 }}>
      <Button title="back" onPress={goBack} />
      <Button title="upload" onPress={onClickUpload} />
      <UploadPhoto />
      <UploadText title={title} content={content} />
      <UploadHashtag hashtags={hashtags} />
      <UploadSongs songs={songs} />
    </View>
  );
}
