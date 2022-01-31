import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RelayCardView from 'components/Relay/RelayCardView';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

export default function RelayList({ relayList }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>릴레이 플레이리스트</Text>
      {relayList.map((relay) => {
        return <RelayCardView relay={relay} key={relay._id} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 43 * SCALE_HEIGHT,
    paddingHorizontal: 17 * SCALE_WIDTH,
  },
  titleText: {
    fontSize: FS(18),
    color: COLOR_1,
    fontWeight: 'bold',
    marginBottom: 20 * SCALE_HEIGHT,
  },
});
