import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { onClickSingle } from 'lib/utils/imageEditor';
import { usePlaylistCreate } from 'providers/playlistCreate';
import PlaylistAlbumImage from 'components/PlaylistAlbumImage';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_5 } from 'constants/colors';
import style from 'constants/styles';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';

export default function UploadInfo({ edit }) {
  const {
    image,
    setImage,
    songs,
    information: { title, content },
  } = usePlaylistCreate();

  return (
    <View style={[style.flexRow, styles.container]}>
      {edit ? (
        <View style={styles.imageBlur}>
          {image ? (
            <FastImage source={{ uri: image.uri }} style={styles.imageContainer} />
          ) : (
            songs.length > 0 && <PlaylistAlbumImage edit round songs={songs} size={140} />
          )}
        </View>
      ) : (
        <TouchableOpacity style={styles.imageBlur} onPress={() => onClickSingle(setImage)}>
          {image ? (
            <FastImage source={{ uri: image.uri }} style={styles.imageContainer} />
          ) : (
            songs.length > 0 && <PlaylistAlbumImage edit round songs={songs} size={140} />
          )}
          <Text style={styles.imageText}>변경</Text>
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contextText}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 17 * SCALE_HEIGHT,
    paddingLeft: 26 * SCALE_WIDTH,
    paddingRight: 18 * SCALE_WIDTH,
  },
  imageContainer: {
    width: 140 * SCALE_WIDTH,
    height: 140 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
  },
  imageBlur: {
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 6 * SCALE_HEIGHT,
  },
  imageText: {
    fontSize: FS(20),
    color: '#FFF',
    position: 'absolute',
    left: 52 * SCALE_WIDTH,
    top: 58 * SCALE_HEIGHT,
  },
  textContainer: {
    marginLeft: 15 * SCALE_WIDTH,
    width: 176 * SCALE_WIDTH,
  },
  titleText: {
    fontSize: FS(16),
    marginBottom: 16 * SCALE_HEIGHT,
    color: '#000',
  },
  contextText: {
    fontSize: FS(11),
    color: COLOR_5,
  },
});
