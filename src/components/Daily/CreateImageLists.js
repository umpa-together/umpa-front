import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import ScrollImage from 'components/ScrollImage';
import Movable from 'components/ScrollImage/Movable';

export default function CreateImageLists() {
  const { images, onClickDeleteImage } = useDailyCreate();

  return (
    <ScrollImage images={images}>
      <View style={[style.flexRow, styles.container]}>
        {images.map((item) => {
          const { uri } = item;
          return (
            <Movable key={uri} imagesCount={images.length} id={uri}>
              <Image source={{ uri }} style={styles.imageContainer} />
              <TouchableOpacity onPress={() => onClickDeleteImage(item)}>
                <Icon
                  style={styles.deleteIcon}
                  source={require('public/icons/daily-delete-photo.png')}
                />
              </TouchableOpacity>
            </Movable>
          );
        })}
      </View>
    </ScrollImage>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 82 * SCALE_HEIGHT,
    paddingLeft: 18 * SCALE_WIDTH,
  },
  imageContainer: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    paddingRight: 12 * SCALE_WIDTH,
  },
  deleteIcon: {
    zIndex: 2,
    width: 30 * SCALE_WIDTH,
    height: 30 * SCALE_WIDTH,
    position: 'absolute',
    right: 12 * SCALE_WIDTH,
    top: -45 * SCALE_HEIGHT,
  },
});
