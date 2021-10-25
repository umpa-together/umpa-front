import React, { useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import SvgUri from 'react-native-svg-uri';
import Modal from 'react-native-modal';
import { tmpWidth } from 'components/FontNormalize';
import { SongImage } from 'components/SongImage';
import { goBack } from 'navigationRef';

const SongOrder = ({ setOrderModal, songs }) => {
  const { getMyInfo } = useContext(UserContext);
  const { editSongs } = useContext(DJContext);
  const [orderLists, setOrderLists] = useState([]);
  const uploadSongs = [];

  const onClose = () => {
    setOrderModal(false);
    setOrderLists([]);
  };

  const onClickComplete = async () => {
    Object.values(orderLists).forEach((song) => {
      uploadSongs.push(songs[song]);
    });
    setOrderModal(false);
    await editSongs({ songs: uploadSongs });
    getMyInfo();
    goBack();
  };

  const onClickSong = (index) => {
    if (orderLists.includes(index)) {
      setOrderLists(orderLists.filter((order) => order !== index));
    } else {
      setOrderLists([...orderLists, index]);
    }
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible
      onBackdropPress={onClose}
      backdropOpacity={0.5}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.first}>대표곡을 첫번째로 선택하시고</Text>
          <Text style={styles.second}>노출 순서를 정해주세요</Text>
        </View>
        {orderLists.length === songs.length && (
          <TouchableOpacity style={styles.complete} onPress={onClickComplete}>
            <Text style={styles.completeText}>확인</Text>
          </TouchableOpacity>
        )}
        <FlatList
          style={styles.orderContainer}
          data={songs}
          keyExtractor={(posts) => posts.id}
          renderItem={({ item, index }) => {
            const imgUrl = item.attributes.artwork.url;
            const song = item.attributes.name;
            const artist = item.attributes.artistName;
            return (
              <View style={styles.eachSong}>
                <TouchableOpacity onPress={() => onClickSong(index)}>
                  {orderLists.includes(index) ? (
                    <SongImage url={imgUrl} opac={1.0} size={44} border={44} />
                  ) : (
                    <SongImage url={imgUrl} opac={0.5} size={44} border={44} />
                  )}
                </TouchableOpacity>
                <View style={styles.infoBox}>
                  <View style={styles.rowContainer}>
                    {item.attributes.contentRating === 'explicit' && (
                      <SvgUri
                        width="17"
                        height="17"
                        source={require('assets/icons/19.svg')}
                        style={{ marginRight: 5 * tmpWidth }}
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
                {orderLists.includes(index) ? (
                  <Text style={styles.index}>{orderLists.indexOf(index) + 1}</Text>
                ) : null}
              </View>
            );
          }}
        />
        <Text style={styles.guide}>(커버를 선택하시면 순서를 정할 수 있어요)</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 8 * tmpWidth,
  },
  first: {
    textAlign: 'center',
    marginTop: 15 * tmpWidth,
  },
  second: {
    textAlign: 'center',
    marginTop: 2 * tmpWidth,
  },
  complete: {
    position: 'absolute',
    top: 18 * tmpWidth,
    right: 24 * tmpWidth,
  },
  completeText: {
    fontSize: 16 * tmpWidth,
    color: 'rgb(169,193,255)',
  },
  orderContainer: {
    paddingLeft: 36 * tmpWidth,
    marginTop: 8 * tmpWidth,
  },
  eachSong: {
    flexDirection: 'row',
    marginTop: 12 * tmpWidth,
  },
  infoBox: {
    marginLeft: 22.4 * tmpWidth,
    width: 180 * tmpWidth,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  song: {
    fontSize: 14 * tmpWidth,
  },
  artist: {
    fontSize: 12 * tmpWidth,
    color: 'rgb(148,153,163)',
    marginTop: 6 * tmpWidth,
  },
  index: {
    fontSize: 16 * tmpWidth,
    color: 'rgb(169,193,255)',
    position: 'absolute',
    right: 36 * tmpWidth,
  },
  guide: {
    color: 'rgb(153,153,153)',
    textAlign: 'center',
    paddingTop: 5 * tmpWidth,
    paddingBottom: 5 * tmpWidth,
  },
});

export default SongOrder;
