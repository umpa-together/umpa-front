import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getQuickPhoto, onClickSingle } from 'components/ImageEditor';
import { tmpWidth } from 'components/FontNormalize';
import SvgUri from 'react-native-svg-uri';
import { usePlaylist } from 'providers/playlist';

const CreateFooter = ({ songs, setIsSearch }) => {
  const [images, setImages] = useState([]);
  const { informationRef, image, setImage, validity, setValidity } = usePlaylist();

  const onClickAddSongs = () => {
    setIsSearch(true);
  };

  const onClickAlbum = () => {
    if (!informationRef.current.isEdit) {
      onClickSingle(setImage);
    }
  };
  const onClickPhoto = (img) => {
    if (!informationRef.current.isEdit) {
      setImage({ name: img.filename, type: 'image/jpeg', uri: img.uri });
    }
  };

  useEffect(() => {
    getQuickPhoto(setImages);
  }, []);

  useEffect(() => {
    if (image) {
      informationRef.current.imgUrl = image.uri;
      informationRef.current.imgName = image.name;
      informationRef.current.imgType = image.type;
    }
    setValidity((prev) => ({
      ...prev,
      thumbnail: true,
    }));
  }, [image]);

  useEffect(() => {
    if (songs.length >= 3) {
      setValidity((prev) => ({
        ...prev,
        song: true,
      }));
    }
  }, [songs]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        onPress={onClickAlbum}
        style={[
          styles.box,
          styles.add,
          styles.column,
          image && styles.active,
          !validity.thumbnail && styles.warningBorder,
        ]}
      >
        <SvgUri
          width="40"
          height="40"
          source={
            image ? require('assets/icons/editPhoto.svg') : require('assets/icons/addPhoto.svg')
          }
          style={styles.icon}
        />
        <Text
          style={[image ? styles.activeText : styles.text, !validity.thumbnail && styles.warning]}
        >
          {image ? '사진 수정' : '사진 추가'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onClickAddSongs}
        style={[
          styles.box,
          styles.add,
          styles.column,
          songs.length !== 0 && styles.active,
          !validity.song && styles.warningBorder,
        ]}
      >
        <SvgUri
          width="40"
          height="40"
          source={
            songs.length === 0
              ? require('assets/icons/addSong.svg')
              : require('assets/icons/editSong.svg')
          }
          style={styles.icon}
        />
        <Text
          style={[
            songs.length === 0 ? styles.text : styles.activeText,
            !validity.song && styles.warning,
          ]}
        >
          {songs.length === 0 ? '음악 추가' : '음악 수정'}
        </Text>
      </TouchableOpacity>
      {images.map((item) => {
        const img = item.node.image.uri;
        return (
          <TouchableOpacity onPress={() => onClickPhoto(item.node.image)} key={img}>
            <Image source={{ uri: img }} style={[styles.img, styles.box]} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16 * tmpWidth,
    paddingBottom: 16 * tmpWidth,
  },
  box: {
    width: 80 * tmpWidth,
    height: 80 * tmpWidth,
    borderRadius: 4 * tmpWidth,
    borderWidth: 1 * tmpWidth,
    marginRight: 6 * tmpWidth,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    borderColor: '#8bc0ff',
  },
  img: {
    borderColor: '#c4c4c4',
  },
  icon: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
  },
  text: {
    fontSize: 14 * tmpWidth,
    fontWeight: '500',
    color: '#8bc0ff',
  },
  active: {
    backgroundColor: '#8bc0ff',
  },
  activeText: {
    fontSize: 14 * tmpWidth,
    fontWeight: '500',
    color: '#ffffff',
  },
  warningBorder: {
    borderColor: 'rgb(238, 98, 92)',
  },
  warning: {
    color: 'rgb(238, 98, 92)',
  },
});

export default CreateFooter;
