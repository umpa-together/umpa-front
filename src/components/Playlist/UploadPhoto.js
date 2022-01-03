import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { onClickSingle } from 'lib/utils/imageEditor';
import { usePlaylistCreate } from 'providers/playlistCreate';

export default function UploadPhoto() {
  const { image, setImage } = usePlaylistCreate();

  return (
    <View>
      <TouchableOpacity
        onPress={() => onClickSingle(setImage)}
        style={{ width: 100, height: 100, borderWidth: 1 }}
      >
        {image ? (
          <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
        ) : (
          <Text>사진없음</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
