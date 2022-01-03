import React from 'react';
import { View, Text } from 'react-native';
import SongView from 'components/SongView';
import { useSongActions } from 'providers/songActions';

export default function UploadSongs({ songs }) {
  const { getActionComponent } = useSongActions();

  return (
    <View style={{ borderWidth: 1 }}>
      <Text>총 {songs.length}</Text>
      {songs.map((song) => {
        return <SongView key={song.id} song={song} actions={getActionComponent({ data: song })} />;
      })}
    </View>
  );
}
