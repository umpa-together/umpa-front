import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { navigate } from 'navigationRef';
import { tmpWidth } from 'components/FontNormalize';
import { SongImage } from 'components/SongImage';
import { useTrackPlayer } from 'providers/trackPlayer';
import RepresentSong from 'components/RepresentSong';
import SvgUri from 'react-native-svg-uri';

const SimilarTasteUsers = ({ users }) => {
  const { follow, unfollow } = useContext(UserContext);
  const [representModal, setRepresentModal] = useState(false);
  const [currentSong, setCurrentSong] = useState([]);
  const { addtracksong } = useTrackPlayer();
  const [isFollow, setIsFollow] = useState([]);

  const onClickAll = async () => {
    navigate('AllContents', { type: '유저' });
  };

  const onClickRepresent = (song) => {
    setCurrentSong(song);
    setRepresentModal(true);
    addtracksong({ data: song[0] });
  };

  const onClickFollow = (id) => {
    if (isFollow.includes(id)) {
      unfollow({ id });
      setIsFollow(isFollow.filter((item) => item !== id));
    } else {
      follow({ id });
      setIsFollow((prev) => [...prev, id]);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>비슷한 취향의 </Text>
          <Text style={[styles.title, styles.emphasis]}>서퍼</Text>
          <Text style={styles.title}>를 만나보세요</Text>
        </View>
        <TouchableOpacity onPress={onClickAll} style={styles.allBox}>
          <Text style={styles.subheader}>전체보기</Text>
        </TouchableOpacity>
      </View>
      {users !== null && (
        <FlatList
          data={users.slice(0, 10)}
          keyExtractor={(user) => user.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.padding}
          renderItem={({ item }) => {
            const { songs, name, id } = item;
            return (
              <View style={styles.box}>
                <TouchableOpacity onPress={() => onClickRepresent(songs)} style={styles.songImg}>
                  <SongImage url={songs[0].attributes.artwork.url} size={80} border={80} />
                  <SvgUri
                    width="30"
                    height="30"
                    source={require('assets/icons/modalPlay.svg')}
                    style={styles.play}
                  />
                </TouchableOpacity>
                <Text style={styles.name} numberOfLines={1}>
                  {name}
                </Text>
                <TouchableOpacity style={styles.followBox} onPress={() => onClickFollow(id)}>
                  {isFollow.includes(id) ? (
                    <View style={styles.flexRow}>
                      <Text style={styles.follow}>팔로우</Text>
                      <SvgUri
                        width="10"
                        height="10"
                        source={require('assets/icons/followCheck.svg')}
                        style={styles.icon}
                      />
                    </View>
                  ) : (
                    <Text style={styles.follow}>팔로우</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
      <RepresentSong
        representModal={representModal}
        setRepresentModal={setRepresentModal}
        song={currentSong}
        myAccount={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30 * tmpWidth,
    marginBottom: 10 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16 * tmpWidth,
    fontWeight: '700',
  },
  emphasis: {
    color: '#8bc0ff',
  },
  allBox: {
    width: 64 * tmpWidth,
    height: 24 * tmpWidth,
    backgroundColor: '#8bc0ff',
    borderRadius: 6 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subheader: {
    color: '#ffffff',
    fontSize: 12 * tmpWidth,
    fontWeight: '400',
  },
  padding: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    paddingTop: 10 * tmpWidth,
    paddingBottom: 10 * tmpWidth,
  },
  box: {
    width: 128 * tmpWidth,
    height: 180 * tmpWidth,
    borderRadius: 8 * tmpWidth,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 4 * tmpWidth,
    shadowOpacity: 0.04,
    alignItems: 'center',
    marginRight: 8 * tmpWidth,
  },
  songImg: {
    marginTop: 16 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    marginTop: 7 * tmpWidth,
    width: '100%',
    textAlign: 'center',
  },
  play: {
    position: 'absolute',
    left: 25 * tmpWidth,
    top: 25 * tmpWidth,
  },
  followBox: {
    width: 100 * tmpWidth,
    height: 25 * tmpWidth,
    borderRadius: 100 * tmpWidth,
    borderWidth: 1 * tmpWidth,
    borderColor: '#8bc0ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16 * tmpWidth,
  },
  follow: {
    fontSize: 12 * tmpWidth,
    color: '#8bc0ff',
  },
  icon: {
    width: 15 * tmpWidth,
    height: 15 * tmpWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SimilarTasteUsers;
