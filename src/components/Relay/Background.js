import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as RelayContext } from 'context/Relay';
import FastImage from 'react-native-fast-image';
import Text from 'components/Text';

export default function Background() {
  const { state } = useContext(RelayContext);
  const { playlist } = state.selectedRelay;
  const { title, image, representSong } = playlist;
  const { attributes } = representSong;
  const { artistName, name } = attributes;

  return (
    <View style={styles.container}>
      <FastImage source={{ uri: image }} style={styles.backgroundImg} />
      <View style={styles.infoBox}>
        <Text>{title}</Text>
        <Text>
          첫곡 : {name} - {artistName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  backgroundImg: {
    height: 150,
    borderWidth: 1,
  },
  infoBox: {
    width: 240,
    height: 60,
    position: 'absolute',
    backgroundColor: '#fff',
    top: 120,
    left: 70,
  },
});
