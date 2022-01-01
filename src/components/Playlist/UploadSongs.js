import React from 'react';
import { View, Text } from 'react-native';
import SongViewPlaylist from './SongViewPlaylist';

export default function UploadSongs({ songs }) {
  return (
    <View>
      <Text>{songs.length}</Text>
      {songs.map((item) => {
        return <SongViewPlaylist key={item._id} song={item} />;
      })}
    </View>
  );
}
