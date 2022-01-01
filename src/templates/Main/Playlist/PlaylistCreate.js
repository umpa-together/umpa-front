import React from 'react';
import { View, Text, Button } from 'react-native';
import { goBack, navigate } from 'lib/utils/navigation';
import CreateInput from 'components/Playlist/CreateInput';
import CreateSongList from 'components/Playlist/CreateSongList';
import SearchSongModal from 'components/Modal/SearchSongModal';
import CreateSongAdd from 'components/Playlist/CreateSongAdd';
import { usePlaylistCreate } from 'providers/playlistCreate';
import CreateHashtag from 'components/Playlist/CreateHashtag';

export default function PlaylistCreate() {
  const { information, songs, hashtags } = usePlaylistCreate();
  const { title, content } = information;
  const onPressNext = () => {
    navigate('PlaylistUpload', {
      data: { title, content, songs, hashtags },
    });
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button title="back" onPress={goBack} />
      <Button title="next" onPress={onPressNext} />
      <Text>playlistcreate</Text>
      <CreateInput />
      <CreateSongAdd />
      <CreateSongList />
      <CreateHashtag />
      <SearchSongModal />
    </View>
  );
}
