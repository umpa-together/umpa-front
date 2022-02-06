import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import UserCard from 'components/Search/UserCard';
import style from 'constants/styles';
import { navigate } from 'lib/utils/navigation';
import Text from 'components/Text';

export default function Participant() {
  const {
    state: {
      selectedRelay: { songs },
    },
  } = useContext(RelayContext);

  const onClickMore = () => {
    navigate('Participant', {
      users: songs.map(({ postUser, song }) => {
        return {
          name: postUser.name,
          profileImage: postUser.profileImage,
          _id: postUser._id,
          songs: [song],
        };
      }),
    });
  };

  return (
    <View style={styles.container}>
      <View style={[style.space_between, style.flexRow]}>
        <Text style={styles.title}>이 플리에 참여한 사람들</Text>
        <TouchableOpacity onPress={onClickMore}>
          <Text style={styles.more}>자세히</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={[style.flexRow, styles.contentContainer]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {songs.map(({ postUser }) => {
          return <UserCard user={postUser} key={postUser._id} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25 * SCALE_HEIGHT,
  },
  title: {
    marginLeft: 15 * SCALE_WIDTH,
    fontSize: FS(13),
    color: COLOR_1,
  },
  contentContainer: {
    paddingVertical: 16 * SCALE_HEIGHT,
    paddingHorizontal: 10 * SCALE_WIDTH,
  },
  more: {
    fontSize: FS(12),
    color: '#85A0FF',
    marginRight: 14 * SCALE_WIDTH,
  },
});
