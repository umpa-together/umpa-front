import React from 'react';
import { Text } from 'react-native';
import SongView from 'components/SongView';
import TrackPlayerProvider from 'providers/trackPlayer';

export default function MusicSection({ title, songs }) {
  return (
    <>
      <Text>{title}</Text>
      <TrackPlayerProvider>
        {songs &&
          songs.map((item) => {
            const song = item.song ? item.song : item;
            return <SongView song={song} key={song.id} />;
          })}
      </TrackPlayerProvider>
    </>
  );
}
