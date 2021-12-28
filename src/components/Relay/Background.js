import React, { useContext } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { Context as RelayContext } from 'context/Relay';

export default function Background() {
  const { state } = useContext(RelayContext);
  const { playlist } = state.selectedRelay;
  const { title, image, representSong } = playlist;
  const { attributes } = representSong;
  const { artistName, name } = attributes;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.backgroundImg} />
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
