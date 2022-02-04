import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDailyCreate } from 'providers/dailyCreate';
import { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import Icon from 'widgets/Icon';
import style from 'constants/styles';
import ScrollImage from 'components/ScrollImage';
import Movable from 'components/ScrollImage/Movable';
import FastImage from 'react-native-fast-image';

export default function CreateImageLists({ edit = false }) {
  const { images, onClickDeleteImage } = useDailyCreate();

  return (
    <ScrollImage images={images}>
      <View style={[style.flexRow, styles.container]}>
        {images.map((item) => {
          const { uri } = item;
          return (
            <>
              {edit ? (
                <FastImage source={{ uri }} style={styles.imageNotEdit} />
              ) : (
                <Movable key={uri} imagesCount={images.length} id={uri}>
                  <FastImage source={{ uri }} style={styles.imageContainer} />
                  <TouchableOpacity onPress={() => onClickDeleteImage(item)}>
                    <Icon
                      style={styles.deleteIcon}
                      source={require('public/icons/daily-delete-photo.png')}
                    />
                  </TouchableOpacity>
                </Movable>
              )}
            </>
          );
        })}
      </View>
    </ScrollImage>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    right: 2 * SCALE_WIDTH,
    top: -45 * SCALE_HEIGHT,
  },
  imageNotEdit: {
    width: 90 * SCALE_WIDTH,
    height: 90 * SCALE_WIDTH,
    marginRight: 12 * SCALE_WIDTH,
  },
});
