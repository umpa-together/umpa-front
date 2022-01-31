import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as AddedContext, Provider as AddedProvider } from 'context/Added';
import SongView from 'components/SongView';
import FS, { SCALE_HEIGHT, SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_3 } from 'constants/colors';
import Icon from 'widgets/Icon';
import { useModal } from 'providers/modal';

export default function SelectedSong({ songs }) {
  const { postAddedSong } = useContext(AddedContext);
  const { onClickAdded } = useModal();

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
      <View>
        <AddedProvider>
          {songs.map((item) => {
            return <SongView key={item.id} song={item} actions={onClickAddActions(item)} />;
          })}
        </AddedProvider>
      </View>
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
  icon: {
    width: 32 * SCALE_WIDTH,
    height: 32 * SCALE_WIDTH,
    marginRight: 4 * SCALE_WIDTH,
  },
});
