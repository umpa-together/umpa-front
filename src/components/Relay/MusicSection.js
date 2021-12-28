import React from 'react';
import { Text } from 'react-native';
import SongView from 'components/SongView';

export default function MusicSection({ title, songs }) {
  return (
    <>
      <Text>{title}</Text>
      {songs &&
        songs.map((item) => {
          const song = item.song ? item.song : item;
          return <SongView song={song} key={song.id} />;
        })}
    </>
  );
}
