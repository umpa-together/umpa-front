import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { Context as DailyContext } from 'context/DailyContext';
import { navigate, push } from 'lib/utils/navigation';
import { SongImage } from 'widgets/SongImage';

const AccountDaily = ({ daily, isMyAccount }) => {
  daily.sort((a, b) => {
    if (a.time > b.time) return -1;
    if (a.time < b.time) return 1;
    return 0;
  });
  const { getDaily } = useContext(DailyContext);

  const onClickDaily = async (id, postUser) => {
    await getDaily({ id, postUserId: postUser });
    push('SelectedDaily', { id, postUser });
  };

  const onClickMakeDaily = () => {
    navigate('Create', { data: [] });
  };

  return (
    <>
      {daily.length !== 0 ? (
        <View style={styles.container}>
          {daily.map(({ image, _id: id, song, postUserId: postUser }) => {
            const img = image[0] || song.attributes.artwork.url;
            return (
              <TouchableOpacity
                onPress={() => onClickDaily(id, postUser)}
                key={id}
                style={styles.item}
              >
                {image[0] ? (
                  <Image style={styles.daily} source={{ url: img }} />
                ) : (
                  <SongImage url={img} size={117} border={4} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.makeContainer}>
          <Text style={styles.title}>아직 만들어진 데일리가 없어요.</Text>
          {isMyAccount && (
            <View style={styles.myBox}>
              <Text style={styles.subTitle}>나만의 데일리를 만들어보세요.</Text>
              <TouchableOpacity style={styles.makeBox} onPress={onClickMakeDaily}>
                <Text style={styles.boxText}>데일리 만들기</Text>
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
  item: {
    marginRight: 4 * tmpWidth,
    marginBottom: 4 * tmpWidth,
  },
  daily: {
    width: 117 * tmpWidth,
    height: 117 * tmpWidth,
    borderRadius: 4 * tmpWidth,
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

export default AccountDaily;
