import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as SearchContext } from 'context/SearchContext';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { tmpWidth } from 'components/FontNormalize';
import { SongImage } from 'widgets/SongImage';
import SvgUri from 'react-native-svg-uri';

const AddedRepresent = ({ isEdit, songs, setSong, setIsEdit, setOrderModal }) => {
  const { state } = useContext(SearchContext);

  const deleteItem = ({ data }) => {
    setSong(songs.filter((item) => item.id !== data.id));
  };

  const onSwipeLeft = (item) => {
    deleteItem({ data: item });
  };
  const renderLeftActions = () => (
    <View style={{ width: '30%', height: '90%', backgroundColor: '#fff' }} />
  );

  const onClickComplete = () => {
    if (songs.length >= 5) {
      setIsEdit(true);
      setOrderModal(true);
    } else {
      setIsEdit(false);
    }
  };

  const onClickDelete = (item) => {
    deleteItem({ data: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mysong}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>내 대표곡</Text>
          {!isEdit && state.songData.length !== 0 && (
            <Text style={styles.warning}>(최소 5곡, 최대 7곡)</Text>
          )}
        </View>
        <TouchableOpacity onPress={onClickComplete}>
          <Text style={styles.complete}>수정</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.addedSongContainer}
        data={songs}
        keyExtractor={(posts) => posts.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const imgUrl = item.attributes.artwork.url;
          const song = item.attributes.name;
          const artist = item.attributes.artistName;
          return (
            <Swipeable
              friction={2}
              renderLeftActions={renderLeftActions}
              onSwipeableLeftOpen={() => onSwipeLeft(item)}
            >
              <View style={styles.selecetedSongBox}>
                <SongImage url={imgUrl} size={44} border={44} />
                <View style={styles.infoContainer}>
                  <View style={styles.flexRow}>
                    {item.attributes.contentRating === 'explicit' && (
                      <SvgUri
                        width="17"
                        height="17"
                        source={require('assets/icons/19.svg')}
                        style={styles.explicit}
                      />
                    )}
                    <Text style={styles.song} numberOfLines={1}>
                      {song}
                    </Text>
                  </View>
                  <Text style={styles.artist} numberOfLines={1}>
                    {artist}
                  </Text>
                </View>
                <TouchableOpacity style={styles.delete} onPress={() => onClickDelete(item)}>
                  <SvgUri
                    width={11 * tmpWidth}
                    height={11 * tmpWidth}
                    source={require('assets/icons/songdelete.svg')}
                  />
                </TouchableOpacity>
              </View>
            </Swipeable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375 * tmpWidth,
    height: 250 * tmpWidth,
    backgroundColor: 'rgb(255,255,255)',
    shadowColor: 'rgb(154, 163, 201)',
    shadowOffset: {
      height: -1 * tmpWidth,
      width: 0,
    },
    shadowRadius: 8 * tmpWidth,
    shadowOpacity: 0.1,
  },
  mysong: {
    flexDirection: 'row',
    marginTop: 19 * tmpWidth,
    justifyContent: 'space-between',
    marginLeft: 37 * tmpWidth,
    marginRight: 24 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14 * tmpWidth,
    marginRight: 5 * tmpWidth,
  },
  warning: {
    fontSize: 12 * tmpWidth,
    color: 'rgb(238,98,92)',
  },
  complete: {
    fontSize: 16 * tmpWidth,
    color: 'rgb(169,193,255)',
  },
  addedSongContainer: {
    marginTop: 20 * tmpWidth,
    marginLeft: 33 * tmpWidth,
  },
  selecetedSongBox: {
    width: 308 * tmpWidth,
    height: 60 * tmpWidth,
    borderWidth: 1 * tmpWidth,
    borderRadius: 8 * tmpWidth,
    borderColor: 'rgb(169,193,255)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20.7 * tmpWidth,
    marginBottom: 8 * tmpWidth,
  },
  infoContainer: {
    marginLeft: 22.4 * tmpWidth,
    width: 180 * tmpWidth,
  },
  explicit: {
    marginRight: 5 * tmpWidth,
  },
  song: {
    fontSize: 14 * tmpWidth,
  },
  artist: {
    fontSize: 12 * tmpWidth,
    color: 'rgb(148,153,163)',
    marginTop: 6 * tmpWidth,
  },
  delete: {
    marginLeft: 8 * tmpWidth,
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddedRepresent;
