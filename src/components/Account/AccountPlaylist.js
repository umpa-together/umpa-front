import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as PlaylistContext } from 'context/PlaylistContext';
import { navigate, push } from 'lib/utils/navigation';

const AccountPlaylist = ({ playList, isMyAccount }) => {
  playList.sort((a, b) => {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    return 0;
  });
  const { getPlaylist } = useContext(PlaylistContext);

  const onClickPlaylist = async (id, postUser) => {
    await getPlaylist({ id, postUserId: postUser });
    push('SelectedPlaylist', { id, postUser });
  };

  const onClickMakePlaylist = () => {
    navigate('Create', { data: [] });
  };

  return (
    <>
      {playList.length !== 0 ? (
        <View style={styles.container}>
          {playList.map(({ image, _id: id, postUserId: postUser }) => (
            <TouchableOpacity onPress={() => onClickPlaylist(id, postUser)} key={id}>
              <Image style={styles.playlist} source={{ url: image }} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.makeContainer}>
          <Text style={styles.title}>아직 만들어진 플레이리스트가 없어요.</Text>
          {isMyAccount && (
            <View style={styles.myBox}>
              <Text style={styles.subTitle}>나만의 플레이리스트를 만들어보세요.</Text>
              <TouchableOpacity style={styles.makeBox} onPress={onClickMakePlaylist}>
                <Text style={styles.boxText}>플레이리스트 만들기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 8 * tmpWidth,
    paddingTop: 8 * tmpWidth,
  },
  makeContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 78 * tmpWidth,
  },
  playlist: {
    width: 117 * tmpWidth,
    height: 117 * tmpWidth,
    borderRadius: 4 * tmpWidth,
    marginRight: 4 * tmpWidth,
    marginBottom: 4 * tmpWidth,
  },
  title: {
    fontSize: 16 * tmpWidth,
    fontWeight: '400',
    marginBottom: 4 * tmpWidth,
  },
  subTitle: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    color: '#8c8c8c',
    marginBottom: 16 * tmpWidth,
  },
  myBox: {
    alignItems: 'center',
  },
  makeBox: {
    width: 156 * tmpWidth,
    height: 33 * tmpWidth,
    borderRadius: 100 * tmpWidth,
    borderColor: '#8bc0ff',
    borderWidth: 1 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 14 * tmpWidth,
    color: '#8bc0ff',
  },
});

export default AccountPlaylist;
