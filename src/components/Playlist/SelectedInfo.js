import React from 'react';
import { View, Text } from 'react-native';
import style from 'constants/styles';
import PlaylistAlbumImage from '../PlaylistAlbumImage';

export default function SelectedInfo({ playlistinfo }) {
  const { image, title, textcontent, postUserId, views, likes, songs } = playlistinfo;

  return (
    <View style={style.flexRow}>
      <PlaylistAlbumImage image={image} songs={songs} size={122} />
      <View>
        <Text>{title}</Text>
        {textcontent.length > 0 && <Text>{textcontent}</Text>}
        <Text>{postUserId.name}</Text>
        <View style={style.flexRow}>
          <Text>좋아요수{likes.length}</Text>
          <Text>조회수{views}</Text>
        </View>
      </View>
    </View>
  );
}
