import React, { useState } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import { SongImageBack } from 'widgets/SongImage';
import { tmpWidth } from 'components/FontNormalize';
import SongStory from 'components/SongStory';

const MusicArchive = ({ archive }) => {
  const [archiveModal, setArchiveModal] = useState(false);
  const [selectedArchive, setSelectedArchive] = useState(null);

  const onClickArchive = (item) => {
    setSelectedArchive(item);
    setArchiveModal(true);
  };

  return (
    <>
      <Text style={styles.title}>뮤직 아카이브</Text>
      <FlatList
        data={archive}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(community) => community._id._id}
        contentContainerStyle={styles.padding}
        bounces={false}
        renderItem={({ item }) => {
          const { songs, _id: board } = item;
          const backgroundImg = songs[0].song.attributes.artwork.url;
          return (
            <TouchableOpacity style={styles.archiveBox} onPress={() => onClickArchive(item)}>
              <SongImageBack url={backgroundImg} width={92} height={110} border={4} opac={1} />
              <Text style={styles.name} numberOfLines={1}>
                {board.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {archiveModal && <SongStory setArchiveModal={setArchiveModal} archive={selectedArchive} />}
    </>
  );
};

const styles = StyleSheet.create({
  archiveBox: {
    width: 92 * tmpWidth,
    height: 110 * tmpWidth,
    borderRadius: 4 * tmpWidth,
    marginRight: 8 * tmpWidth,
  },
  name: {
    position: 'absolute',
    bottom: 4 * tmpWidth,
    left: 6 * tmpWidth,
    fontSize: 14 * tmpWidth,
    color: '#ffffff',
    fontWeight: '500',
  },
  title: {
    fontSize: 16 * tmpWidth,
    fontWeight: '700',
    marginBottom: 9 * tmpWidth,
    marginTop: 10 * tmpWidth,
    paddingLeft: 18 * tmpWidth,
  },
  padding: {
    paddingLeft: 18 * tmpWidth,
    paddingRight: 18 * tmpWidth,
  },
});

export default MusicArchive;
