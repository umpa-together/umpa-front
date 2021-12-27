import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SvgUri from 'react-native-svg-uri';
import { tmpWidth } from 'components/FontNormalize';
import RepresentSong from 'components/RepresentSong';
import { useTrackPlayer } from 'providers/trackPlayer';

const ProfileSong = ({ song, isMyAccount }) => {
  const { name, artistName } = song[0].attributes;
  const [representModal, setRepresentModal] = useState(false);
  const { addtracksong } = useTrackPlayer();

  const onClickPlay = () => {
    setRepresentModal(true);
    addtracksong({ data: song[0] });
  };

  return (
    <>
      <View style={[styles.container, styles.flexRow]}>
        <View style={styles.flexRow}>
          <SvgUri width="24" height="25" source={require('assets/icons/profileSong.svg')} />
          <View style={styles.textArea}>
            <Text style={styles.text} numberOfLines={1}>
              {name} - {artistName}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClickPlay} style={styles.iconArea}>
          <Image style={styles.icon} source={require('assets/icons/profileSongPlay.png')} />
        </TouchableOpacity>
      </View>
      <RepresentSong
        representModal={representModal}
        setRepresentModal={setRepresentModal}
        song={song}
        myAccount={isMyAccount}
      />
    </>
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
    color: '#838383',
    marginLeft: 4 * tmpWidth,
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

export default ProfileSong;
