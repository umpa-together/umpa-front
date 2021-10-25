import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import { useTrackPlayer } from 'providers/trackPlayer';

const DailySong = ({ song }) => {
  const { name, artistName } = song.attributes;
  const { isPlayingId, addtracksong, stoptracksong } = useTrackPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const onClickPlay = () => {
    if (isPlayingId === song.id) {
      stoptracksong();
    } else {
      addtracksong({ data: song });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={[styles.container, styles.flexRow]}>
      <View style={styles.flexRow}>
        <SvgUri width="14" height="15" source={require('assets/icons/feedDailySong.svg')} />
        <View style={styles.textArea}>
          <Text style={styles.text} numberOfLines={1}>
            {name} - {artistName}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onClickPlay} style={styles.iconArea}>
        {!isPlaying ? (
          <Image style={styles.icon} source={require('assets/icons/feedDailyPlay.png')} />
        ) : (
          <Text>stop</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 23 * tmpWidth,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 13 * tmpWidth,
    marginLeft: 11 * tmpWidth,
  },
  textArea: {
    width: 260 * tmpWidth,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20 * tmpWidth,
    height: 20 * tmpWidth,
  },
  iconArea: {
    width: 40 * tmpWidth,
    height: 40 * tmpWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DailySong;
