import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Context as DailyContext } from 'context/DailyContext';
import { tmpWidth } from 'components/FontNormalize';
import { navigate, push } from 'navigationRef';
import { SongImage } from 'components/SongImage';
import ProfileImage from 'components/ProfileImage';

const WeeklyDailies = ({ dailies }) => {
  const { getDaily } = useContext(DailyContext);

  const onClickAll = async () => {
    navigate('AllContents', { type: '데일리' });
  };

  const onClickDaily = async (id, postUserId) => {
    await getDaily({ id, postUserId });
    push('SelectedDaily', { id, postUser: postUserId });
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>새로운 데일리를 구경해보세요</Text>
        <TouchableOpacity onPress={onClickAll} style={styles.allBox}>
          <Text style={styles.subheader}>전체보기</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dailies}
        keyExtractor={(daily) => daily._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {
          const { image, _id, song, postUserId: postUser } = item;
          const { name, artistName } = song.attributes;
          return (
            <TouchableOpacity
              style={styles.item}
              activeOpacity={1}
              onPress={() => onClickDaily(_id, postUser._id)}
            >
              {image[0] ? (
                <Image style={styles.dailyImg} source={{ uri: image[0] }} />
              ) : (
                <SongImage url={song.attributes.artwork.url} size={130} border={4} />
              )}
              <Text style={styles.name} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.artist}>{artistName}</Text>
              <View style={styles.flexRow}>
                <ProfileImage img={postUser.profileImage} imgStyle={styles.profileImg} />
                <Text style={styles.user} numberOfLines={1}>
                  {postUser.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30 * tmpWidth,
    marginBottom: 20 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
  },
  header: {
    fontSize: 16 * tmpWidth,
    fontWeight: '700',
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
  container: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
    paddingBottom: 18 * tmpWidth,
  },
  item: {
    marginRight: 6 * tmpWidth,
  },
  dailyImg: {
    width: 130 * tmpWidth,
    height: 130 * tmpWidth,
    borderRadius: 4 * tmpWidth,
  },
  name: {
    fontSize: 14 * tmpWidth,
    marginTop: 8 * tmpWidth,
    width: 130 * tmpWidth,
    fontWeight: '500',
  },
  artist: {
    fontSize: 12 * tmpWidth,
    marginTop: 4 * tmpWidth,
    width: 130 * tmpWidth,
    fontWeight: '300',
    marginBottom: 3 * tmpWidth,
  },
  profileImg: {
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
    marginRight: 4 * tmpWidth,
    borderRadius: 20 * tmpWidth,
  },
  user: {
    fontSize: 12 * tmpWidth,
    fontWeight: '400',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5 * tmpWidth,
  },
});

export default WeeklyDailies;
