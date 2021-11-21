import React, { useContext } from 'react';
import { Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Context as UserContext } from 'context/UserContext';
import { Context as DJContext } from 'context/DJContext';
import { tmpWidth } from 'components/FontNormalize';
import { navigate, push } from 'lib/utils/navigation';

const DJ = ({ dj }) => {
  const { state, getOtheruser } = useContext(UserContext);
  const { getSongs } = useContext(DJContext);

  const onClickProfile = async (id) => {
    if (id === state.myInfo._id) {
      navigate('Account');
    } else {
      await Promise.all([getOtheruser({ id }), getSongs({ id })]);
      push('OtherAccount', { otherUserId: id });
    }
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={dj.slice(0, 10)}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const { profileImage, name, songs, _id: id } = item;
        return (
          <TouchableOpacity onPress={() => onClickProfile(id)} style={styles.dj}>
            <Image source={{ uri: profileImage }} style={styles.DJImg} />
            <Text style={styles.name}>{name}</Text>
            <Text numberOfLines={1} style={styles.song}>
              {songs[0].attributes.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * tmpWidth,
  },
  dj: {
    marginRight: 6 * tmpWidth,
    width: 120 * tmpWidth,
  },
  DJImg: {
    width: 120 * tmpWidth,
    height: 120 * tmpWidth,
    borderRadius: 4 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    marginTop: 8 * tmpWidth,
    marginBottom: 2 * tmpWidth,
  },
  song: {
    fontWeight: '300',
    fontSize: 12 * tmpWidth,
    color: '#505050',
  },
});

export default DJ;
