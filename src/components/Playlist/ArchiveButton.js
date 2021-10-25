import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { tmpWidth } from 'components/FontNormalize';
import { usePlaylist } from 'providers/playlist';

const ArchiveButton = () => {
  const { isArchive, setIsArchive } = usePlaylist();

  const onClickButton = () => {
    setIsArchive((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.box, isArchive && styles.active]} onPress={onClickButton}>
        <Text style={[styles.text, isArchive && styles.activeText]}>
          보관된 음악 보기 {isArchive ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 9 * tmpWidth,
    paddingBottom: 8 * tmpWidth,
  },
  box: {
    width: 158 * tmpWidth,
    height: 36 * tmpWidth,
    borderRadius: 100 * tmpWidth,
    borderWidth: 1 * tmpWidth,
    borderColor: '#8bc0ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#8bc0ff',
  },
  text: {
    fontSize: 14 * tmpWidth,
    fontWeight: '400',
    color: '#8bc0ff',
  },
  activeText: {
    color: '#ffffff',
  },
});

export default ArchiveButton;
