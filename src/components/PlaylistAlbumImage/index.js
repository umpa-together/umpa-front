import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SongImage } from 'widgets/SongImage';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import FastImage from 'react-native-fast-image';

export default function PlaylistAlbumImage({ edit, image, songs, size, round }) {
  const imgStyle = {
    width: size * SCALE_WIDTH,
    height: size * SCALE_WIDTH,
    borderRadius: round && 6 * SCALE_HEIGHT,
    backgroundColor: '#eee',
  };

  const smallImgStyle = {
    width: (size / 2) * SCALE_WIDTH,
    height: (size / 2) * SCALE_WIDTH,
  };
  return (
    songs.length > 0 && (
      <View style={[styles.container, imgStyle, edit && styles.editStyle]}>
        {image !== undefined ? (
          <FastImage source={{ uri: image }} style={imgStyle} />
        ) : (
          songs.slice(0, 3).map((item) => {
            const { url } = item.attributes.artwork;
            return <SongImage key={item.id} url={url} imgStyle={smallImgStyle} />;
          })
        )}
        {songs.length < 4 ? (
          <SongImage url={songs[0].attributes.artwork.url} imgStyle={smallImgStyle} />
        ) : (
          <SongImage url={songs[3].attributes.artwork.url} imgStyle={smallImgStyle} />
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  editStyle: {
    opacity: 0.8,
  },
});
