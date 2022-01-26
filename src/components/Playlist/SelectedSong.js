import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as AddedContext, Provider as AddedProvider } from 'context/Added';
import { Context as PlaylistContext } from 'context/Playlist';
import SongView from 'components/SongView';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3, COLOR_5 } from 'constants/colors';
import Icon from 'widgets/Icon';
import { useModal } from 'providers/modal';

export default function SelectedSong() {
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();
  const {
    state: {
      currentPlaylist: { songs },
    },
  } = useContext(PlaylistContext);
  const [isMore, setIsMore] = useState(false);
  const onClickMore = () => {
    setIsMore(!isMore);
  };
  const songCount = songs.length;

  const onClickAdd = (song) => {
    postAddedSong({ song });
    onClickAdded();
  };

  const onClickAddActions = (song) => {
    return (
      <TouchableOpacity onPress={() => onClickAdd(song)}>
        <Icon source={require('public/icons/add-song.png')} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.titleText}>총 {songs.length}곡</Text>
      <View style={[!isMore && styles.songContainer]}>
        <AddedProvider>
          {songs.map((item) => {
            return <SongView key={item.id} song={item} actions={onClickAddActions(item)} />;
          })}
        </AddedProvider>
      </View>
      {songCount >= 4 && (
        <TouchableOpacity style={styles.moreContainer} onPress={onClickMore}>
          <Text>{isMore ? '줄이기' : '더보기'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: FS(12),
    color: COLOR_3,
    marginBottom: 28 * SCALE_HEIGHT,
    marginLeft: 16 * SCALE_WIDTH,
  },
  songContainer: {
    maxHeight: 234 * SCALE_HEIGHT,
    overflow: 'hidden',
  },
  moreContainer: {
    width: '100%',
    height: 28 * SCALE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 * SCALE_WIDTH,
    borderColor: COLOR_5,
  },
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
});
