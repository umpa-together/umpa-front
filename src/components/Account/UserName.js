import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import style from 'constants/styles';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { navigate } from 'lib/utils/navigation';
import FollowButton from 'components/FollowButton';

export default function UserName({ id, myaccount, name, realName }) {
  const onPressProfileEdit = () => {
    navigate('ProfileEdit');
  };

  return (
    <View style={style.flexRow}>
      <Text style={styles.name}>{name}</Text>
      {realName !== '' && <Text style={styles.realName}>({realName})</Text>}
      {myaccount ? (
        <TouchableOpacity style={styles.editBox} onPress={onPressProfileEdit}>
          <Text style={styles.editText}>편집</Text>
        </TouchableOpacity>
      ) : (
        <FollowButton id={id} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  editBox: {
    borderWidth: 1 * SCALE_WIDTH,
    borderColor: COLOR_3,
    paddingHorizontal: 13 * SCALE_WIDTH,
    paddingVertical: 4 * SCALE_HEIGHT,
    borderRadius: 100 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 7 * SCALE_WIDTH,
  },
  editText: {
    fontSize: FS(12),
    color: COLOR_3,
  },
  name: {
    fontSize: FS(14),
    fontWeight: 'bold',
  },
  realName: {
    fontSize: FS(12),
    color: COLOR_5,
    marginHorizontal: 4 * SCALE_WIDTH,
  },
});
