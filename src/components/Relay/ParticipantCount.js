import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLOR_5 } from 'constants/colors';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import style from 'constants/styles';
import Icon from 'widgets/Icon';
import Text from 'components/Text';

export default function ParticipantCount({ challenge, vote, container }) {
  return (
    <View style={[style.flexRow, container]}>
      <Icon style={styles.peopleIcon} source={require('public/icons/relay-card-people.png')} />
      <Text style={styles.peopleText}>{`도전자 ${challenge}명 / 평가 ${vote}명`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  peopleIcon: {
    width: 12 * SCALE_WIDTH,
    height: 13 * SCALE_HEIGHT,
    marginRight: 4 * SCALE_WIDTH,
  },
  peopleText: {
    color: COLOR_5,
    fontSize: FS(12),
  },
});
