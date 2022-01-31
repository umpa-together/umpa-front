import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ProfileImage from 'widgets/ProfileImage';
import TouchableNoDouble from 'components/TouchableNoDouble';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import { COLOR_2, COLOR_5 } from 'constants/colors';
import { push } from 'lib/utils/navigation';

export default function UserCard({ user }) {
  const { _id: id, genre, name, profileImage } = user;
  const onClickCard = () => {
    push('OtherAccount', { id });
  };

  return (
    <TouchableNoDouble
      onPress={onClickCard}
      style={[styles.container, style.alignCenter]}
      activeOpacity={0.9}
    >
      <ProfileImage img={profileImage} imgStyle={styles.img} />
      <View style={style.flexRow}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Icon source={require('public/icons/search-right.png')} style={styles.icon} />
      </View>
      {genre.length !== 0 && <Text style={styles.genre}>{genre[0]} 선호</Text>}
    </TouchableNoDouble>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#f4f4f4',
    borderWidth: 1 * SCALE_WIDTH,
    borderRadius: 6 * SCALE_HEIGHT,
    marginHorizontal: 4.5 * SCALE_WIDTH,
    backgroundColor: '#fff',
    shadowColor: 'rgb(103, 103, 103)',
    shadowOffset: {
      height: 2 * SCALE_HEIGHT,
      width: 0,
    },
    shadowRadius: 6 * SCALE_HEIGHT,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  img: {
    width: 56 * SCALE_WIDTH,
    height: 56 * SCALE_WIDTH,
    borderRadius: 56 * SCALE_HEIGHT,
    marginTop: 13 * SCALE_HEIGHT,
    marginBottom: 11 * SCALE_HEIGHT,
    marginLeft: 20 * SCALE_WIDTH,
    marginRight: 21 * SCALE_WIDTH,
  },
  name: {
    fontSize: FS(12),
    color: COLOR_2,
    marginRight: 7 * SCALE_WIDTH,
    maxWidth: 60 * SCALE_WIDTH,
    textAlign: 'center',
  },
  icon: {
    width: 4 * SCALE_WIDTH,
    height: 10 * SCALE_HEIGHT,
  },
  genre: {
    color: COLOR_5,
    fontSize: FS(10),
    fontWeight: '300',
    marginTop: 7 * SCALE_HEIGHT,
    paddingBottom: 17 * SCALE_HEIGHT,
  },
});
