import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { Context as DailyContext } from 'context/DailyContext';
import Header from 'components/Header';
import { tmpWidth } from 'components/FontNormalize';
import { push } from 'lib/utils/navigation';
import { SongImage } from 'widgets/SongImage';

const ContentsMoreScreen = ({ route }) => {
  const { getPlaylist } = useContext(PlaylistContext);
  const { getDaily } = useContext(DailyContext);
  const { getOtheruser } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);
  const [elements, setElements] = useState([]);
  const [isSongImg, setSongImg] = useState(false);
  const { option, playlist, daily, dj } = route.params;

  const onClickImg = async (item) => {
    if (option === '플레이리스트') {
      const postUserId = item.postUserId._id || item.postUserId;
      await getPlaylist({ id: item._id, postUserId });
      push('SelectedPlaylist', { id: item._id, postUser: postUserId });
    } else if (option === '서퍼') {
      await Promise.all([getOtheruser({ id: item._id }), getSongs({ id: item._id })]);
      push('OtherAccount', { otherUserId: item._id });
    } else {
      const postUserId = item.postUserId._id || item.postUserId;
      await getDaily({ id: item._id, postUserId });
      push('SelectedDaily', { id: item._id, postUser: postUserId });
    }
  };

  useEffect(() => {
    if (option === '플레이리스트') {
      setElements(playlist);
    } else if (option === '서퍼') {
      setElements(dj);
    } else {
      setElements(daily);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header title={option} />
      <FlatList
        numColumns={3}
        data={elements}
        keyExtractor={(element) => element._id}
        contentContainerStyle={styles.padding}
        renderItem={({ item }) => {
          let img;
          if (option !== '데일리') {
            img = item.image || item.profileImage;
          } else {
            if (!item.image[0]) {
              setSongImg(true);
            }
            img = item.image[0] || item.song.attributes.artwork.url;
          }
          return (
            <TouchableOpacity onPress={() => onClickImg(item)} style={styles.item}>
              {!isSongImg ? (
                <Image source={{ uri: img }} style={styles.img} />
              ) : (
                <SongImage url={img} size={117} border={4} />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  item: {
    marginRight: 4 * tmpWidth,
    marginBottom: 4 * tmpWidth,
  },
  img: {
    width: 117 * tmpWidth,
    height: 117 * tmpWidth,
    borderRadius: 4 * tmpWidth,
  },
  padding: {
    paddingLeft: 8 * tmpWidth,
    paddingRight: 8 * tmpWidth,
  },
});

export default ContentsMoreScreen;
