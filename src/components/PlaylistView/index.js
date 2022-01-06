import React from 'react';
import { View, Text } from 'react-native';
import style from 'constants/styles';
import timeConverter from 'lib/utils/time';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';

export default function PlaylistCard({ playlist, actions }) {
  const { image, songs, title, time } = playlist;
  const { name } = songs[0].attributes;

  return (
    <View style={[style.flexRow, style.space_between]}>
      <View style={style.flexRow}>
        <PlaylistAlbumImage image={image} songs={songs} size={80} />
        <View>
          <Text>{title}</Text>
          <Text>
            대표곡 {name} 외 {songs.length}곡
          </Text>
          <Text>{timeConverter(time)}</Text>
        </View>
      </View>
      {actions}
    </View>
  );
}
