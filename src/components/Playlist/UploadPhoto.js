import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { onClickSingle } from 'lib/utils/imageEditor';
import { usePlaylistCreate } from 'providers/playlistCreate';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';

export default function UploadPhoto({ songs }) {
  const { image, setImage } = usePlaylistCreate();
  console.log(songs)
  return (
    <View>
      <TouchableOpacity
        onPress={() => onClickSingle(setImage)}
        style={{ width: 100, height: 100, borderWidth: 1 }}
      >
        {image ? (
          <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
        ) : (
          <PlaylistAlbumImage songs={songs} size={122} />
        )}
      </TouchableOpacity>
    </View>
  );
}
