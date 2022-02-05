import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RelayCardView from 'components/Relay/RelayCardView';
import FS, { SCALE_WIDTH, SCALE_HEIGHT } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';
import style from 'constants/styles';
import YoutubeLink from 'components/youtubeLink';
import OpenYoutube from 'lib/utils/youtube';

export default function RelayList({ relayList }) {
  return (
    <View style={styles.container}>
      <View style={[style.flexRow, style.space_between, styles.margin]}>
        <Text style={styles.titleText}>릴레이 플레이리스트</Text>
        <YoutubeLink relay func={OpenYoutube} />
      </View>
      {relayList.map((relay) => {
        return <RelayCardView relay={relay} key={relay._id} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10 * SCALE_HEIGHT,
    paddingHorizontal: 17 * SCALE_WIDTH,
  },
  titleText: {
    fontSize: FS(18),
    color: COLOR_1,
    fontWeight: 'bold',
  },
  margin: {
    marginBottom: 20 * SCALE_HEIGHT,
  },
});
